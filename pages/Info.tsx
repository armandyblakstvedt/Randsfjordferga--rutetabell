import { Center, Heading, VStack } from "native-base";
import React from "react";

export default function Info() {
  return (
    <Center bg="white" height="100%" width="100%">
      <VStack width="90%" height="100%" justifyContent="space-evenly">
        <Heading textAlign="center">
          Laget av: Armand Youssefian Blakstvedt
        </Heading>
        <Heading position="absolute" bottom="5" textAlign="center">
          Applikasjonen tar forbehold om at tider og informasjon kan avvike fra
          Innlandstrafikk.
        </Heading>
      </VStack>
    </Center>
  );
}
