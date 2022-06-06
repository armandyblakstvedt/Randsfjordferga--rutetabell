import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { VStack } from "native-base";
import React, { useEffect, useState } from "react";
import Tabnavigation from "../components/Tabnavigation";
import { db } from "../firebase";
import { onSnapshot, doc, updateDoc, arrayUnion } from "firebase/firestore";
import CountdownContent from "../components/CountdownContent";
import Loading from "../components/Loading";
import Disabled from "../components/Disabled";
import { Platform } from "react-native";

export default function Main({ navigation }: { navigation: any }) {
  const [horn, setHorn] = useState(true);
  const [fergetiderHorn, setFergetiderHorn] = useState();
  const [fergetiderTangen, setFergetiderTangen] = useState();
  const [uteAvDrift, setUteAvDrift] = useState(false);
  const [driftsMelding, setDriftsMelding] = useState("Ute av drift");
  const [loading, setLoading] = useState(true);
  const PushRef = doc(db, "fergetider", "pushtokens");

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const registerToken = async (token) => {
    await updateDoc(PushRef, {
      tokens: arrayUnion(token),
    });
  };

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      registerToken(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  }

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "fergetider", "hverdager"), (doc) => {
      let data: any = doc.data();
      if (data.uteAvDrift) {
        setUteAvDrift(true);
        setDriftsMelding(data.melding);
      } else if (data.helligdag) {
        setFergetiderHorn(Object.values(data.helligdagerHorn));
        setFergetiderTangen(Object.values(data.helligdagerTangen));
      } else {
        setFergetiderHorn(Object.values(data.Horn));
        setFergetiderTangen(Object.values(data.Tangen));
      }
      setLoading(false);
      return () => unsub();
    });
  }, []);

  const Content = () => {
    if (loading) {
      return <Loading />;
    } else if (uteAvDrift) {
      return <Disabled driftsMelding={driftsMelding} />;
    } else {
      return (
        <>
          <Tabnavigation
            navigation={navigation}
            horn={horn}
            setHorn={setHorn}
          />
          <CountdownContent
            horn={horn}
            fergetiderHorn={fergetiderHorn}
            fergetiderTangen={fergetiderTangen}
          />
        </>
      );
    }
  };
  return (
    <VStack
      bg="white"
      width="100%"
      height="100%"
      margin="auto"
      alignItems="center"
      justifyContent="space-evenly"
    >
      {Content()}
    </VStack>
  );
}
