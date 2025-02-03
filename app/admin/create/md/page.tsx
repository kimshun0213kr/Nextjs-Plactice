import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import ReactMarkdown, { Components } from "react-markdown";

const ChakraUIRenderer: Partial<Components> = {
  h1: ({ node, ...props }) => <Heading as="h1" size="2xl" my={4} {...props} />,
  h2: ({ node, ...props }) => <Heading as="h2" size="xl" my={4} {...props} />,
  h3: ({ node, ...props }) => <Heading as="h3" size="lg" my={4} {...props} />,
  p: ({ node, ...props }) => <Text my={2} {...props} />,
};

export default function Home() {
  const markdownContent = `
  # 見出し1
  ABC  
  DEF  
  GHI  
  `;

  return (
    <Box p={4} borderWidth={1} borderRadius="lg">
      <ReactMarkdown components={ChakraUIRenderer}>
        {markdownContent}
      </ReactMarkdown>
    </Box>
  );
}
