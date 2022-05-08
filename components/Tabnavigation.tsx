import { Circle, HStack, Text, useBreakpointValue, VStack } from "native-base";
import React, { useRef } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import FerryIcon from "react-native-vector-icons/MaterialIcons";
import { Animated, Easing } from "react-native";

export default function Tabnavigation({
  horn,
  setHorn,
  navigation,
}: {
  horn: boolean;
  setHorn(boolean: boolean): void;
  navigation: any;
}) {
  //Varable to spin the change Icon
  const spinVariable = useRef(new Animated.Value(0)).current;
  const moveVariable = useRef(new Animated.Value(0)).current;

  const spin = spinVariable.interpolate({
    inputRange: [0, 1],
    outputRange: ["30deg", "210deg"],
  });
  const move = moveVariable.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "50%"],
  });

  //Method to spin the change Icon
  const SpinChangeHarbour = () => {
    Animated.timing(spinVariable, {
      toValue: horn ? 1 : 0,
      easing: Easing.elastic(1.2),
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(moveVariable, {
      toValue: horn ? 1 : 0,
      easing: Easing.elastic(1),
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const fontsize = useBreakpointValue({
    sm: "lg",
    md: "xl",
  });

  return (
    <VStack
      width="70%"
      borderRadius={20}
      shadow={1}
      position="absolute"
      top={12}
    >
      <Circle marginBottom={2}>
        <FerryIcon color="#67e8f9" size={40} name="directions-ferry" />
      </Circle>
      <Text textAlign="center">Reiser fra:</Text>
      <HStack
        bg="white"
        overflow="hidden"
        borderRadius={20}
        justifyContent="space-evenly"
      >
        <Animated.View
          style={{
            height: "100%",
            width: "50%",
            position: "absolute",
            backgroundColor: "#67e8f9",
            left: move,
          }}
        />
        <Text
          padding="2%"
          flex={1}
          onPress={() => {
            if (!horn) {
              setHorn(true);
              SpinChangeHarbour();
            }
          }}
          borderRadius={20}
          textAlign="center"
          bgColor="rgba(52, 52, 52, 0)"
          fontSize={fontsize}
        >
          Horn
        </Text>
        <Text
          padding="2%"
          flex={1}
          onPress={() => {
            if (horn) {
              setHorn(false);
              SpinChangeHarbour();
            }
          }}
          borderRadius={20}
          textAlign="center"
          fontSize={fontsize}
          bgColor="rgba(52, 52, 52, 0)"
        >
          Tangen
        </Text>
      </HStack>
      <Circle margin="auto" top="-15" shadow={5} size="50px" bg="white">
        <Animated.View
          style={{
            transform: [
              {
                rotate: spin,
              },
            ],
          }}
        >
          <Icon
            onPress={() => {
              setHorn(!horn);
              SpinChangeHarbour();
            }}
            name="exchange-alt"
            size={25}
          />
        </Animated.View>
      </Circle>
    </VStack>
  );
}
