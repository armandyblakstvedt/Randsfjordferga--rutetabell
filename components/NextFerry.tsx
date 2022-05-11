import { useBreakpointValue } from "native-base";
import React from "react";
import FerryStack from "./FerryStack";

export default function NextFerry({
  fergetider,
  timeLeft,
}: {
  fergetider: Array<string>;
  timeLeft: Array<Array<number>>;
}) {
  const bigFontsize = useBreakpointValue({
    base: 40,
    sm: 80,
    md: 100,
  });

  const smallFontsize = useBreakpointValue({
    base: 10,
    sm: 20,
    md: 30,
  });

  return (
    <FerryStack
      message={"Neste ferge kl."}
      timeLeft={timeLeft[0]}
      sortedFergetider={fergetider[0]}
      width={"95%"}
      height={"35%"}
      bigFontsize={bigFontsize}
      smallFontsize={smallFontsize}
    />
  );
}
