import { Text, VStack } from "native-base";
import React, { useState, useEffect } from "react";
import NextFerry from "./NextFerry";
import TwoMore from "./TwoMore";

export default function CountdownContent({
  horn,
  fergetiderHorn,
  fergetiderTangen,
}: {
  horn: boolean;
  fergetiderHorn: Array<Array<string>>;
  fergetiderTangen: Array<Array<string>>;
}) {
  const [date, setDate] = useState(new Date());

  const filteredFergetider = (): Array<string> => {
    let relevantTimes = [];
    if (horn) {
      relevantTimes.push(
        ...fergetiderHorn[date.getDay() == 0 ? 6 : date.getDay() - 1].filter(
          SortDB
        )
      );
      relevantTimes.push(...fergetiderHorn[date.getDay()]);
    } else {
      relevantTimes.push(
        ...fergetiderTangen[date.getDay() == 0 ? 6 : date.getDay() - 1].filter(
          SortDB
        )
      );
      relevantTimes.push(...fergetiderTangen[date.getDay()]);
    }
    return relevantTimes;
  };

  const TimeLeft = (time: string): Array<number> => {
    const currTime: number = date.getHours() * 60 + date.getMinutes();
    const targetTime: number = ConvertStringToInt(time) * 60;
    const HoursLeft = (): number => {
      if (targetTime >= currTime) {
        return Math.floor((targetTime - currTime) / 60);
      } else {
        return Math.floor((24 * 60 - currTime + targetTime) / 60);
      }
    };
    const MinutesLeft = (): number => {
      if (targetTime >= currTime) {
        return (targetTime - currTime) % 60;
      } else {
        return (24 * 60 - currTime + targetTime) % 60;
      }
    };
    return [HoursLeft(), MinutesLeft()];
  };

  const timeLeftArray = (): Array<Array<number>> => {
    let tmpLeftTimes = [];
    for (let i = 0; i < 3; i++) {
      tmpLeftTimes.push(TimeLeft(filteredFergetider()[i]));
    }
    return tmpLeftTimes;
  };

  function ConvertStringToInt(time: string): number {
    return parseInt(time.split(":")[0]) + parseInt(time.split(":")[1]) / 60;
  }

  function SortDB(time: string): boolean {
    let CurrentTime = date.getHours() + date.getMinutes() / 60;
    return ConvertStringToInt(time) >= CurrentTime;
  }

  useEffect(() => {
    const interval = setInterval(() => setDate(new Date()), 30000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <VStack
      height="50%"
      width="100%"
      justifyContent="space-evenly"
      alignItems="center"
      space="20%"
    >
      <NextFerry fergetider={filteredFergetider()} timeLeft={timeLeftArray()} />
      <TwoMore fergetider={filteredFergetider()} timeLeft={timeLeftArray()} />
    </VStack>
  );
}
