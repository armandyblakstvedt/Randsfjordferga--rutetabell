import {
  Badge,
  VStack,
  useBreakpointValue,
  Heading,
  HStack,
  Text,
  Divider,
} from "native-base";
import { ScrollView, TouchableWithoutFeedback } from "react-native";
import React, { useEffect, useState } from "react";
import Icon1 from "react-native-vector-icons/Entypo";
import { db } from "../firebase";
import { onSnapshot, doc } from "firebase/firestore";
import Loading from "../components/Loading";

export default function Rutetabell() {
  const [date, setDate] = useState(new Date());
  const [day, setDay] = useState(date.getDay());
  const [gyldighet, setGyldighet] = useState("");
  const [fergetiderHorn, setFergetiderHorn] = useState();
  const [fergetiderTangen, setFergetiderTangen] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "fergetider", "hverdager"), (doc) => {
      let data: any = doc.data();
      if (data.helligdag) {
        setFergetiderHorn(Object.values(data.helligdagerHorn));
        setFergetiderTangen(Object.values(data.helligdagerTangen));
      } else {
        setFergetiderHorn(Object.values(data.Horn));
        setFergetiderTangen(Object.values(data.Tangen));
      }
      setGyldighet(data.gyldighet);
      setLoading(false);
      return () => unsub();
    });
  }, []);

  const daytoday: Map<number, string> = {
    0: "Søndag",
    1: "Mandag",
    2: "Tirsdag",
    3: "Onsdag",
    4: "Torsdag",
    5: "Fredag",
    6: "Lørdag",
  };

  const BadgeFontsize = useBreakpointValue({
    base: 20,
    sm: 30,
    md: 35,
  });

  const TextFontsize = useBreakpointValue({
    base: 15,
    sm: 20,
    md: 35,
  });

  const HeadingFontsize = useBreakpointValue({
    base: 20,
    sm: 35,
    md: 50,
  });

  const FerjeBadgesHorn = () =>
    fergetiderHorn[day == 0 ? 6 : day - 1].map((value: any, key: any) => (
      <Badge
        _text={{ fontSize: BadgeFontsize }}
        alignSelf="center"
        key={key}
        colorScheme="info"
        rounded={10}
      >
        {value}
      </Badge>
    ));

  const FerjeBadgesTangen = () =>
    fergetiderTangen[day == 0 ? 6 : day - 1].map(
      (value: string, key: number) => (
        <Badge
          _text={{ fontSize: BadgeFontsize }}
          alignSelf="center"
          key={key}
          colorScheme="info"
          rounded={10}
        >
          {value}
        </Badge>
      )
    );

  const Content = () => {
    if (!loading) {
      return (
        <>
          <HStack marginTop="5%" justifyContent="space-evenly" width="100%">
            <VStack space={2}>
              <Text textAlign="center" fontSize={TextFontsize}>
                Tangen
              </Text>
              <Divider my="2" />
              {FerjeBadgesTangen()}
            </VStack>
            <VStack space={2}>
              <Text textAlign="center" fontSize={TextFontsize}>
                Horn
              </Text>
              <Divider my="2" />
              {FerjeBadgesHorn()}
            </VStack>
          </HStack>
        </>
      );
    } else return <Loading />;
  };

  return (
    <>
      <VStack height="100%" width="100%" paddingTop="15%" bg="white">
        <Heading
          fontSize={HeadingFontsize}
          textAlign="center"
          color="muted.700"
        >
          Rutetabell
        </Heading>
        <Badge rounded={10} colorScheme="success" alignSelf="center">
          {gyldighet}
        </Badge>
        <ScrollView style={{ width: "100%" }}>{Content()}</ScrollView>
        <HStack
          shadow={4}
          bg="white"
          height="15%"
          width="100%"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <TouchableWithoutFeedback
            onPress={() => setDay(day == 0 ? 6 : day - 1)}
          >
            <Icon1 name="chevron-thin-left" size={50} color="#999" />
          </TouchableWithoutFeedback>
          <Heading fontSize={HeadingFontsize} textAlign="center">
            {daytoday[day]}
          </Heading>
          <TouchableWithoutFeedback
            onPress={() => setDay(day == 6 ? 0 : day + 1)}
          >
            <Icon1 name="chevron-thin-right" size={50} color="#999" />
          </TouchableWithoutFeedback>
        </HStack>
      </VStack>
    </>
  );
}
