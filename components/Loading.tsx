import { Heading, HStack, Spinner, VStack } from "native-base";
import React, { useEffect, useState } from "react";

export default function Loading() {
  const [text, setText] = useState("");

  useEffect(() => {
    let timer = setTimeout(() => {
      setText("Dette tok jo tid. Har du koblet til internett?");
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <VStack space={2} justifyContent="center">
      <HStack space={2} justifyContent="center">
        <Spinner accessibilityLabel="Loading posts" />
        <Heading color="primary.500" fontSize="md">
          Henter de nyeste fergetidene
        </Heading>
      </HStack>
      <Heading color="primary.500" fontSize="md">
        {text}
      </Heading>
    </VStack>
  );
}
