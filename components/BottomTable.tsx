import {
  Center,
  IconButton,
  Circle,
  Badge,
  VStack,
  useBreakpointValue,
  Heading,
  Slider,
  HStack,
  Text,
} from "native-base";
import {
  ScrollView,
  Animated,
  PanResponder,
  Easing,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useRef, useState } from "react";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import Icon1 from "react-native-vector-icons/Entypo";

export default function BottomTable({
  horn,
  fergetiderHorn,
  fergetiderTangen,
}: {
  horn: boolean;
  fergetiderHorn: Array<string>;
  fergetiderTangen: Array<string>;
}) {
  const [pressed, setPressed] = useState(false);
  const [date, setDate] = useState(new Date());
  const [day, setDay] = useState(date.getDay());
  const bottomAnimationVariable = useRef(new Animated.Value(0)).current;
  const heightAnimationVariable = useRef(new Animated.Value(0)).current;

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

  const fadeIn = () => {
    Animated.timing(bottomAnimationVariable, {
      toValue: pressed ? 0 : 1,
      easing: Easing.back(0.5),
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(heightAnimationVariable, {
      toValue: pressed ? 0 : 1,
      easing: Easing.back(0.5),
      duration: 500,
      useNativeDriver: false,
    }).start();
    setPressed(!pressed);
  };

  const FerjeBadgesHorn = fergetiderHorn[day == 0 ? 6 : day - 1].map(
    (value: any, key: any) => (
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

  const FerjeBadgesTangen = fergetiderTangen[day == 0 ? 6 : day - 1].map(
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

  const content = () => {
    if (pressed) {
      return (
        <ScrollView style={{ width: "100%", marginTop: "7%" }}>
          <HStack
            margin="auto"
            width="90%"
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
          <Badge alignSelf="center" colorScheme="success">
            Gyldig fra dd.mm.åå til dd.mm.åå
          </Badge>
          <HStack marginTop="5%" justifyContent="space-evenly" width="100%">
            <VStack space={2}>
              <Text textAlign="center" fontSize={TextFontsize}>
                Tangen
              </Text>
              {FerjeBadgesTangen}
            </VStack>
            <VStack space={2}>
              <Text textAlign="center" fontSize={TextFontsize}>
                Horn
              </Text>
              {FerjeBadgesHorn}
            </VStack>
          </HStack>
        </ScrollView>
      );
    } else {
      return <Text fontSize={TextFontsize}>Rutetider</Text>;
    }
  };

  return (
    <Animated.View
      style={{
        bottom: bottomAnimationVariable,
        height: heightAnimationVariable.interpolate({
          inputRange: [0, 1],
          outputRange: ["10%", "80%"],
        }),
        position: "absolute",
        width: "100%",
      }}
    >
      <Center
        bottom="0"
        height="100%"
        borderTopRadius={25}
        width="100%"
        bg="primary.100"
        padding="5%"
      >
        {content()}
        <Circle
          shadow={5}
          position="absolute"
          top="-15"
          size="40px"
          bg="primary.50"
        >
          <IconButton
            size={10}
            bg="primary.50"
            borderRadius="full"
            onPress={fadeIn}
            icon={<Icon size={20} name={pressed ? "arrow-down" : "arrow-up"} />}
          />
        </Circle>
      </Center>
    </Animated.View>
  );
}
