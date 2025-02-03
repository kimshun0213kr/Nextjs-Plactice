"use client";

import {
  Text,
  Link,
  Heading,
  VStack,
  Center,
  Box,
  HStack,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

export type Article = {
  id: Number;
  title: string;
  author: string;
  content: string;
  date: string;
};

export default function Home() {
  const [contents, setContents] = useState<Article[]>();
  const [tab, setTab] = useState(1);
  useEffect(() => {
    axios.get(`/api/blog/list/${tab}`).then((res) => {
      setContents(res.data);
    });
  }, [tab]);
  return (
    <>
      <Center w="100%">
        <VStack w="100%">
          <Heading>投稿一覧</Heading>
          {contents ? (
            <>
              {contents.map((content) => (
                <>
                  <Box w="80%" borderBottom={"2px dotted gray"}>
                    <HStack>
                      <Box w={"70%"} marginLeft={"5%"}>
                        <Link
                          href={`/blog/${content.id}`}
                          color={"blue.500"}
                          fontSize={"2xl"}
                        >
                          {content.title}
                        </Link>
                      </Box>
                      <Box w="15%">
                        <Text>by : {content.author}</Text>
                      </Box>
                      <Box w="15%">
                        <Text>
                          {new Date(content.date).getFullYear()}年
                          {new Date(content.date).getMonth() + 1}月
                          {new Date(content.date).getDate()}日
                        </Text>
                      </Box>
                    </HStack>
                  </Box>
                </>
              ))}
              <HStack>
                {tab != 1 ? (
                  <Button onClick={() => setTab(tab - 1)}>
                    ページ{tab - 1}へ
                  </Button>
                ) : null}
                {contents[contents.length - 1].id != 1 ? (
                  <Button onClick={() => setTab(tab + 1)}>
                    ページ{tab + 1}へ
                  </Button>
                ) : null}
              </HStack>
            </>
          ) : (
            <Text>データ取得中です。</Text>
          )}
        </VStack>
      </Center>
    </>
  );
}
