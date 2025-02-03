import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
const crypto = require("crypto");

const secretkey = process.env.SECRET_KEY;
const iv = process.env.INITIALIZED_VECTOR;
const pepper = process.env.PEPPER;

const decrypto = async (encrypted: string): Promise<string> => {
  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    Buffer.from(secretkey!, "hex"),
    Buffer.from(iv!, "hex")
  );

  decipher.setAuthTag(Buffer.from(encrypted.slice(-32), "hex"));

  const encryptedBuffer = Buffer.from(encrypted.slice(0, -32), "hex");
  const decrypted = Buffer.concat([
    decipher.update(encryptedBuffer),
    decipher.final(),
  ]);

  return decrypted.toString("utf8");
};

const createHash = (data: string) => {
  const hash = crypto.createHash("sha256").update(data).digest("base64");
  return hash;
};

export async function GET(
  req: NextRequest,
  { params }: { params: { name: string } }
) {
  const { name } = await params;
  const decryptoData = await decrypto(name);
  const authData: { name: string; pass: string } = JSON.parse(decryptoData);
  let pass = authData.pass;
  for (let i = 0; i < 7; i++) {
    pass = createHash(pass + pepper);
  }
  console.log("pepper", pepper, "pass", pass);
  const result = await prisma.user.findFirst({
    where: {
      name: authData.name,
      password: pass,
    },
  });
  return NextResponse.json({ result: result != null });
}
