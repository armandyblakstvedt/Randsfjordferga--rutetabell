import {
  AlertDialog,
  Badge,
  Box,
  Button,
  Center,
  Divider,
  FormControl,
  Heading,
  Input,
  Switch,
  Text,
  TextArea,
  useBreakpointValue,
  useToast,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Keyboard } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default function Info() {
  const bigFontsize = useBreakpointValue({
    base: 30,
    sm: 40,
    md: 50,
  });

  const smallFontsize = useBreakpointValue({
    base: 10,
    sm: 20,
    md: 30,
  });

  const [password, setPassword] = useState<number>();
  const [username, setUsername] = useState<string>();
  const [driftsmelding, setDriftsmelding] = useState();
  const [Drift, setDrift] = useState();
  const [user, setUser] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [Alltokens, setAlltokens] = useState();
  const [NotificationTitle, setNotificationTitle] = useState("");
  const [NotificationBody, setNotificationBody] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const toast = useToast();

  const onClose = () => setIsOpen(false);
  const databaseRef = doc(db, "fergetider", "hverdager");
  const cancelRef = React.useRef(null);
  const auth = getAuth();

  useEffect(() => {
    if (user) {
      const docRef = doc(db, "fergetider", "pushtokens");
      getDoc(docRef).then((docSnap) => setAlltokens(docSnap.data().tokens));
    }
  }, [user]);

  async function sendPushNotification(element) {
    const message = {
      to: element,
      sound: "default",
      title: Drift ? "Ferja er i drift" : "Ferja er ute av drift",
      body: NotificationBody,
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      mode: "no-cors",
      headers: {
        host: "exp.host",
        accept: "application/json",
        "accept-encoding": "gzip, deflate",
        "content-type": "application/json",
      },
      body: JSON.stringify(message),
    });
  }

  const SendAllNotifications = () => {
    if (user) {
      Alltokens.forEach((element) => {
        sendPushNotification(element);
      });
    }
  };

  const updateData = async () => {
    if (user) {
      Keyboard.dismiss();
      await updateDoc(databaseRef, {
        melding: driftsmelding,
      })
        .then(() => {
          SendAllNotifications();
          signOutUser();
          toast.show({
            description: "Endringer utført!",
          });
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      signOutUser();
    }
  };

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        setIsOpen(false);
        setUser(false);
      })
      .catch((error) => {
        toast.show({
          description: error,
        });
      });
  };

  const logIn = () => {
    setErrorMessage("");
    Keyboard.dismiss();
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        // Signed in
        setUser(userCredential.user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorMessage);
      });
  };

  const content = () => {
    if (user) {
      return (
        <VStack
          bg="white"
          height="100%"
          width="100%"
          alignItems="center"
          justifyContent="flex-start"
        >
          <Center width="95%">
            <Box safeArea p="2" py="8" width="95%">
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Heading
                  mt="1"
                  _dark={{
                    color: "warmGray.200",
                  }}
                  color="coolGray.600"
                  fontWeight="medium"
                  fontSize={bigFontsize}
                >
                  Velkommen!
                </Heading>
                <Heading
                  mt="1"
                  _dark={{
                    color: "warmGray.200",
                  }}
                  color="coolGray.600"
                  fontWeight="medium"
                  fontSize={smallFontsize}
                >
                  Du kan nå endre på statusen til ferja!
                </Heading>
              </TouchableWithoutFeedback>
              <VStack space={3} mt="5">
                <FormControl>
                  <FormControl.Label>Status på ferja</FormControl.Label>
                  <Switch
                    offTrackColor="danger.600"
                    colorScheme="emerald"
                    value={Drift}
                    size="lg"
                    onValueChange={(text) => setDrift(text)}
                  />
                  <Text fontWeight="light">
                    {Drift ? (
                      <Badge colorScheme="success">i drift</Badge>
                    ) : (
                      <Badge colorScheme="danger">ute av drift</Badge>
                    )}
                  </Text>
                </FormControl>
                <FormControl>
                  <FormControl.Label>Kort beskrivelse</FormControl.Label>
                  <Input
                    placeholder="Kort beskjed for telefon-varsel"
                    onChangeText={(text) => setNotificationBody(text)}
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Driftsmelding</FormControl.Label>
                  <TextArea
                    onChangeText={(melding) => setDriftsmelding(melding)}
                    placeholder="Skriv inn driftsmeldingen for ferja"
                  />
                </FormControl>
                <Button
                  mt="2"
                  color="primary.300"
                  onPress={() => setIsOpen(!isOpen)}
                >
                  Utfør endringer
                </Button>
                <Button mt="2" color="error.700" onPress={signOutUser}>
                  Avbryt
                </Button>
              </VStack>
            </Box>
          </Center>
          <AlertDialog
            leastDestructiveRef={cancelRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <AlertDialog.Content>
              <AlertDialog.CloseButton />
              <AlertDialog.Header>Gjøre endringer</AlertDialog.Header>
              <AlertDialog.Body>
                Appen vil nå vise at ferja er
                {Drift ? (
                  <Badge colorScheme="success">i drift</Badge>
                ) : (
                  <Badge colorScheme="danger">ute av drift</Badge>
                )}
                med den oppgitte driftsmeldingen.
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button.Group space={2}>
                  <Button
                    variant="unstyled"
                    colorScheme="danger"
                    onPress={onClose}
                    ref={cancelRef}
                  >
                    Cancel
                  </Button>
                  <Button colorScheme="emerald" onPress={updateData}>
                    Utfør
                  </Button>
                </Button.Group>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog>
        </VStack>
      );
    } else {
      return (
        <VStack
          bg="white"
          height="100%"
          width="100%"
          alignItems="center"
          justifyContent="space-around"
        >
          <Center width="95%">
            <Box safeArea p="2" py="8" width="95%">
              <Text
                fontSize={bigFontsize}
                fontWeight="600"
                color="coolGray.800"
                _dark={{
                  color: "warmGray.50",
                }}
              >
                Er du admin?
              </Text>
              <Heading
                mt="1"
                _dark={{
                  color: "warmGray.200",
                }}
                color="coolGray.600"
                fontWeight="medium"
                fontSize={smallFontsize}
              >
                Logg inn for å gjøre endringer
              </Heading>

              <VStack space={3} mt="5">
                <FormControl>
                  <FormControl.Label>Brukernavn</FormControl.Label>
                  <Input onChangeText={(text) => setUsername(text)} />
                </FormControl>
                <FormControl isInvalid={errorMessage.length > 0 ? true : false}>
                  <FormControl.Label>Passord</FormControl.Label>
                  <Input
                    onChangeText={(password) => setPassword(password)}
                    type="password"
                  />
                  <FormControl.ErrorMessage>
                    <Text>{errorMessage}</Text>
                  </FormControl.ErrorMessage>
                </FormControl>
                <Button
                  mt="2"
                  color="primary.300"
                  onPress={logIn}
                  fontSize={smallFontsize}
                >
                  Logg inn
                </Button>
              </VStack>
            </Box>
          </Center>
          <VStack width="95%" justifyContent="space-evenly">
            <Text fontSize={smallFontsize} textAlign="center">
              Laget av: Armand Youssefian Blakstvedt
            </Text>
            <Divider my={2} />
            <Text fontSize={smallFontsize} textAlign="center">
              Applikasjonen tar forbehold om at tider og informasjon kan avvike
              fra Innlandstrafikk.
            </Text>
            <Divider my={2} />
          </VStack>
        </VStack>
      );
    }
  };

  return content();
}
