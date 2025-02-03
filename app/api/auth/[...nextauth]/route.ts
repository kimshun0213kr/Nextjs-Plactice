import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
const crypto = require("crypto");

const HOST = process.env.HOST_URL;

const createHash = (str: string) => {
  const hash = crypto.createHash("sha256").update(str).digest("base64");
  return hash;
};

const secretkey = process.env.SECRET_KEY;
const iv = process.env.INITIALIZED_VECTOR;

const encrypt = async (original: string): Promise<string> => {
  const cipher = crypto.createCipheriv(
    "aes-256-gcm",
    Buffer.from(secretkey!, "hex"),
    Buffer.from(iv!, "hex")
  );
  const encrypted = Buffer.concat([
    cipher.update(original, "utf8"),
    cipher.final(),
  ]);
  return encrypted.toString("hex") + cipher.getAuthTag().toString("hex");
};

const handler = NextAuth({
  providers: [
    Credentials({
      name: "username login",
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const authData = await encrypt(
            JSON.stringify({
              name: credentials?.username,
              pass: credentials?.password,
            })
          );
          console.log(
            await encrypt(
              JSON.stringify({
                name: credentials?.username,
                pass: credentials?.password,
              })
            )
          );
          const response = await fetch(`${HOST}/api/user/auth/${authData}`, {
            method: "GET",
          });
          const data = await response.json();
          if (data.result) {
            const userData = {
              id: data.id,
              name: data.name,
            };
            return userData ?? null;
          } else {
            return null;
          }
        } catch (err) {
          console.error(err);
          return null;
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
