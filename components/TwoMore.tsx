import { HStack, useBreakpointValue } from "native-base";
import React from "react";
import FerryStack from "./FerryStack";

export default function TwoMore({
  fergetider,
  timeLeft,
}: {
  fergetider: Array<string>;
  timeLeft: Array<Array<number>>;
}) {
  const bigFontsize = useBreakpointValue({
    base: 20,
    sm: 30,
    md: 60,
  });

  const smallFontsize = useBreakpointValue({
    base: 10,
    sm: 15,
    md: 20,
  });

  return (
    <HStack
      justifyContent="space-evenly"
      height="25%"
      borderRadius="lg"
      width="100%"
      space={1}
    >
      <FerryStack
        message={"Her er en til"}
        timeLeft={timeLeft[1]}
        sortedFergetider={fergetider[1]}
        width={"45%"}
        height={"100%"}
        bigFontsize={bigFontsize}
        smallFontsize={smallFontsize}
      />
      <FerryStack
        message={"Og enda en"}
        timeLeft={timeLeft[2]}
        sortedFergetider={fergetider[2]}
        width={"45%"}
        height={"100%"}
        bigFontsize={bigFontsize}
        smallFontsize={smallFontsize}
      />
    </HStack>
  );
}
