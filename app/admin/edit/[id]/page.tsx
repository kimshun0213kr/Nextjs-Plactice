"use client";

import {
  Button,
  Center,
  Heading,
  Input,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
// import { Article } from "../page";
import { Article } from "@/app/blog/page";
import axios from "axios";

export default function Home({ params }: { params: { id: string } }) {
  const toast = useToast();
  const [contents, setContents] = useState<Article>();
  const [isNull, setIsNull] = useState(true);
  const [onLoad, setOnLoad] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [changed, setChanged] = useState(false);
  const { id } = params;
  const isNumeric = !isNaN(parseInt(id));
  useEffect(() => {
    if (isNumeric) {
      axios.get(`/api/blog/${id}`).then((res) => {
        if (res.data != null) {
          setContents(res.data);
          setTitle(res.data.title);
          setContent(res.data.content);
          setIsNull(false);
        }
      });
    }
    setOnLoad(true);
  }, []);
  function updateContent() {
    toast({
      title: "更新しています",
      duration: 5000,
      isClosable: true,
      status: "loading",
    });
    axios
      .post(`/api/blog/${id}`, {
        title,
        content,
      })
      .then(() => {
        toast.closeAll();
        toast({
          title: "更新が完了しました",
          duration: 3000,
          isClosable: true,
          status: "success",
        });
      });
  }
  if (onLoad) {
    if (!isNull) {
      return (
        <>
          <Center>
            <VStack w="100%">
              <Input
                w="90%"
                defaultValue={contents?.title}
                border={"1px solid black"}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setChanged(true);
                }}
              />
              <Textarea
                w="90%"
                h="80vh"
                resize={"none"}
                defaultValue={contents?.content}
                border={"1px solid black"}
                onChange={(e) => {
                  setContent(e.target.value);
                  setChanged(true);
                  console.log(changed);
                }}
              />
              {changed ? (
                <Button onClick={updateContent}>更新する</Button>
              ) : null}
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
    } else {
      if (isNumeric) {
        return (
          <>
            <Center>
              <Text w="90%">アクセスされたIDの記事は投稿されていません。</Text>
            </Center>
          </>
        );
      } else {
        return (
          <>
            <Center>
              <Text w="90%">アクセスされたIDの形式が不正です。</Text>
            </Center>
          </>
        );
      }
    }
  } else {
    return (
      <>
        <Center>
          <Text w="90%">データ取得中です。</Text>
        </Center>
      </>
    );
  }
}
