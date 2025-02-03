"use client";

import {
  Button,
  Center,
  Heading,
  Input,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import axios from "axios";

export default function Home() {
  const toast = useToast();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  function createContent() {
    toast({
      title: "投稿しています",
      status: "loading",
      isClosable: true,
      duration: 5000,
    });
    axios
      .put("/api/blog", {
        author: "default user",
        title: title,
        content: content,
      })
      .then(() => {
        toast.closeAll();
        toast({
          title: "投稿しました",
          status: "success",
          isClosable: true,
          duration: 3000,
        });
      });
  }
  return (
    <>
      <Center w="100%">
        <VStack w="90%">
          <Input
            placeholder="タイトルを入力"
            onChange={(e) => setTitle(e.target.value)}
            border={"1px solid black"}
            w={"100%"}
          />
          <Textarea
            placeholder="コンテンツを入力"
            onChange={(e) => setContent(e.target.value)}
            resize={"none"}
            border={"1px solid black"}
            w={"100%"}
            h={"75vh"}
          />
          <Button onClick={createContent}>投稿する</Button>
          <Heading borderBottom={"1px solid gray"} w={"100%"}>
            {title}
          </Heading>
          <Text whiteSpace={"pre-line"} w={"100%"}>
            {content}
          </Text>
        </VStack>
      </Center>
    </>
  );
}
