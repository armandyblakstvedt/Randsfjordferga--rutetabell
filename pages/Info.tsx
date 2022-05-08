import { Center, Heading, VStack } from "native-base";
import React from "react";

export default function Info() {
  return (
    <Center bg="white" height="100%" width="100%">
      <Heading textAlign="center">
        Laget av Armand Youssefian Blakstvedt
      </Heading>
      <Heading textAlign="center">
        Applikasjonen tar forbehold om at tider og informasjon kan avvike fra
        Innlandstrafikk.
      </Heading>
    </Center>
  );
}
