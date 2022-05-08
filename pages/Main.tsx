import { Badge, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import BottomTable from "../components/BottomTable";
import Tabnavigation from "../components/Tabnavigation";
import { db } from "../firebase";
import { onSnapshot, doc } from "firebase/firestore";
import CountdownContent from "../components/CountdownContent";
import Loading from "../components/Loading";
import Disabled from "../components/Disabled";

export default function Main({ navigation }: { navigation: any }) {
  const [horn, setHorn] = useState(true);
  const [fergetiderHorn, setFergetiderHorn] = useState();
  const [fergetiderTangen, setFergetiderTangen] = useState();

  const [uteAvDrift, setUteAvDrift] = useState(false);
  const [driftsMelding, setDriftsMelding] = useState("Ute av drift");
  const [loading, setLoading] = useState(true);

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
      justifyContent="center"
    >
      {Content()}
    </VStack>
  );
}
