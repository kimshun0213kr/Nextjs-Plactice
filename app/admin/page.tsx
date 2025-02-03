"use client";
import { Center, VStack, Box, Button, Link } from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home(props: any) {
  const { data } = useSession();
  if (data) {
    return (
      <>
        ログインしています。
        <Button onClick={() => signOut()}>サインアウト</Button>
      </>
    );
  }

  return (
    <>
      ログインしていません。 <br />
      <Button onClick={() => signIn()}>ログイン</Button>
    </>
  );
}
