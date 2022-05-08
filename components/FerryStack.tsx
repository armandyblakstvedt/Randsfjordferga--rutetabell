import { Heading, HStack, Text, VStack, ZStack } from "native-base";
import React, { useState } from "react";

export default function FerryStack({
  width,
  height,
  sortedFergetider,
  bigFontsize,
  smallFontsize,
  timeLeft,
  message,
}: {
  width: string;
  height: string;
  sortedFergetider: string;
  bigFontsize: number;
  smallFontsize: number;
  timeLeft: Array<number>;
  message: string;
}) {
  const Hour = String(sortedFergetider).split(":")[0];
  const Minute = String(sortedFergetider).split(":")[1];
  const HourLeft = String(timeLeft[0]);
  const MinuteLeft = String(timeLeft[1]);

  return (
    <VStack height={height} width={width} alignItems="center">
      <Text fontSize={smallFontsize}>{message}</Text>
      <ZStack height="100%" width="100%" alignItems="center">
        <HStack
          alignItems="center"
          justifyContent="space-evenly"
          bg="primary.100"
          height="100%"
          width="100%"
          borderRadius={40}
        >
          <Text color="muted.600" textAlign="center" fontSize={bigFontsize}>
            {Hour}
          </Text>
          <Text color="muted.600" textAlign="center" fontSize={bigFontsize}>
            :
          </Text>
          <Text color="muted.600" textAlign="center" fontSize={bigFontsize}>
            {Minute}
          </Text>
        </HStack>
        <VStack
          bottom="-40%"
          height="50%"
          space={0}
          width="60%"
          alignItems="center"
        >
          <HStack
            alignItems="center"
            justifyContent="space-evenly"
            bg="primary.300"
            height="60%"
            width="95%"
            borderRadius={40}
          >
            <Text color="muted.600" textAlign="center" fontSize={smallFontsize}>
              {HourLeft} t
            </Text>
            <Text color="muted.600" textAlign="center" fontSize={smallFontsize}>
              :
            </Text>
            <Text color="muted.600" textAlign="center" fontSize={smallFontsize}>
              {MinuteLeft} min
            </Text>
          </HStack>
        </VStack>
      </ZStack>
    </VStack>
  );
}
