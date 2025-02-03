import { Article } from "../blog/page";
import {
  Box,
  HStack,
  Link,
  Text,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useRef } from "react";

export function ArticleComponent({ content }: { content: Article }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const toast = useToast();
  function deleteArticle(id: string) {
    toast({
      title: `ID:${id}の記事を削除します。`,
      status: "loading",
      isClosable: true,
      duration: 5000,
    });
    axios.delete(`/api/blog/${id}`).then(() => {
      toast.closeAll();
      toast({
        title: `ID:${id}の記事を削除しました。`,
        status: "success",
        isClosable: true,
        duration: 3000,
      });
    });
  }
  return (
    <Box w="80%" borderBottom={"2px dotted gray"}>
      <HStack>
        <Box w={"50%"} marginLeft={"5%"}>
          <Link href={`edit/${content.id}`} color={"blue.500"} fontSize={"2xl"}>
            {content.title}
          </Link>
        </Box>
        <Box w="20%">
          <Text>by : {content.author}</Text>
        </Box>
        <Box w="15%">
          <Text>
            {new Date(content.date).getFullYear()}年
            {new Date(content.date).getMonth() + 1}月
            {new Date(content.date).getDate()}日
          </Text>
        </Box>
        <Box w="15%">
          <Text>
            <Button colorScheme="red" onClick={onOpen}>
              削除する
            </Button>
            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    {content.title}を削除しますか？
                  </AlertDialogHeader>
                  <AlertDialogBody>削除してもよろしいですか？</AlertDialogBody>
                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      キャンセル
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() => {
                        onClose();
                        deleteArticle(String(content.id));
                      }}
                      ml={3}
                    >
                      削除する
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </Text>
        </Box>
      </HStack>
    </Box>
  );
}
