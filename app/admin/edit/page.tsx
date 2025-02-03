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
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { ArticleComponent } from "../../component/ArticleComponent";
import { Article } from "../../blog/page";

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
                  <ArticleComponent content={content} />
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
