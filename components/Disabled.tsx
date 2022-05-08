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

export default function Disabled({ melding }: { melding: string }) {
  return (
    <Center>
      <Alert w="90%" maxW="400" status="info" colorScheme="info">
        <VStack space={2} flexShrink={1} w="100%">
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
            <IconButton
              variant="unstyled"
              _focus={{
                borderWidth: 0,
              }}
            />
          </HStack>
          <Box
            pl="6"
            _text={{
              color: "coolGray.600",
            }}
          >
            {melding}
          </Box>
        </VStack>
      </Alert>
    </Center>
  );
}
