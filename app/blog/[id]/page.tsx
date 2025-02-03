"use client";

import { Center, Heading, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Article } from "../page";
import axios from "axios";

export default function Home({ params }: { params: { id: string } }) {
  const [content, setContent] = useState<Article>();
  const [isNull, setIsNull] = useState(true);
  const [onLoad, setOnLoad] = useState(false);
  const { id } = params;
  const [contentDate, setContentDate] = useState("");
  const isNumeric = !isNaN(parseInt(id));
  useEffect(() => {
    if (isNumeric) {
      axios.get(`/api/blog/${id}`).then((res) => {
        if (res.data != null) {
          setContent(res.data);
          console.log(new Date(res.data.date));
          const createContetDate = new Date(res.data.date);
          setContentDate(
            createContetDate.getFullYear() +
              "年" +
              createContetDate.getMonth() +
              1 +
              "月" +
              createContetDate.getDate() +
              "日"
          );
          setIsNull(false);
        }
      });
    }
    setOnLoad(true);
  }, []);
  if (onLoad) {
    if (!isNull) {
      return (
        <>
          <Center>
            <VStack w="100%">
              <Heading
                w="90%"
                borderBottom={"1px solid gray"}
                whiteSpace={"pre-line"}
              >
                {content?.title}
              </Heading>
              <Text w="90%" fontSize={"sm"} whiteSpace={"pre-line"}>
                {content?.author}
              </Text>
              <Text w="90%" fontSize={"sm"}>
                {contentDate}
              </Text>
              <Text w="90%" whiteSpace={"pre-line"}>
                {content?.content}
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
