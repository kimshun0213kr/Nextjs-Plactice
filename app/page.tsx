"use client";

import { Box, Center, Heading, Link, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { prisma } from "./lib/prisma";
import { Article } from "./blog/page";
import axios from "axios";

export default function Home() {
  const [blog, setBlog] = useState<Article>();
  useEffect(() => {
    axios.get("/api/blog").then((res) => {
      const result = res.data;
      setBlog(result);
    });
  }, []);
  return (
    <>
      <Center>
        <VStack w={"100%"}>
          <Heading>Nextjs練習ブログ</Heading>
          <Box>
            <Text>ここにプロフィールとかを書いてみると良いかもね。</Text>
          </Box>
          {blog ? (
            <Box bgColor={"cyan"} w={"80%"} marginTop={5}>
              <Center>
                <VStack>
                  <Text>最新の記事はこちら！</Text>
                  <Heading>
                    <Link
                      href={`/blog/${blog.id}`}
                      borderBottom={"1px solid darkblue"}
                    >
                      {blog.title}
                    </Link>
                  </Heading>
                  <Text>
                    {blog.content.length <= 20
                      ? blog.content
                      : blog.content.slice(0, 19) + "..."}
                  </Text>
                </VStack>
              </Center>
            </Box>
          ) : null}
        </VStack>
      </Center>
    </>
  );
}
