import * as React from "react";
import Main from "../pages/Main";
import Info from "../pages/Info";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

export default function AppStack() {
  return (
    <Drawer.Navigator
      initialRouteName="Rutetider"
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="Rutetider" component={Main} />
      <Drawer.Screen name="Info" component={Info} />
    </Drawer.Navigator>
  );
}
