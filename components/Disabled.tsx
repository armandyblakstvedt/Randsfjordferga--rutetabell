import {
  Center,
  Alert,
  VStack,
  HStack,
  Text,
  IconButton,
  Box,
} from "native-base";
import React from "react";

export default function Disabled({ driftsMelding }: { driftsMelding: string }) {
  return (
    <Center width="90%">
      <Alert width="100%" status="info" colorScheme="info">
        <VStack space={2} flexShrink={1} width="100%">
          <HStack
            flexShrink={1}
            space={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <HStack flexShrink={1} space={2} alignItems="center">
              <Alert.Icon />
              <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                Ferga er ute av drift!
              </Text>
            </HStack>
          </HStack>
          <Box
            pl="6"
            _text={{
              color: "coolGray.600",
            }}
          >
            {driftsMelding}
          </Box>
        </VStack>
      </Alert>
    </Center>
  );
}
