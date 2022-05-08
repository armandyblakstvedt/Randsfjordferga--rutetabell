import { extendTheme, NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import AppStack from "./navigation/AppStack";
import Main from "./pages/Main";
import "react-native-gesture-handler";
export default function App() {
  const theme = extendTheme({
    breakpoints: {
      base: 0,
      sm: 300,
      md: 400,
      lg: 700,
    },

    colors: {
      primary: {
        100: "#D1E8FF",
      },
    },
  });

  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>
        <StatusBar barStyle="dark-content" />
        <AppStack />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
