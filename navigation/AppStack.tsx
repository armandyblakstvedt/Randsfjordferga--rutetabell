import React from "react";
import Main from "../pages/Main";
import Info from "../pages/Info";
import FerryIcon from "react-native-vector-icons/MaterialIcons";
import NoteIcon from "react-native-vector-icons/FontAwesome";
import InfoIcon from "react-native-vector-icons/Feather";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Rutetabell from "../pages/Rutetabell";

const Tab = createBottomTabNavigator();

export default function AppStack() {
  return (
    <Tab.Navigator
      initialRouteName="Rutetider"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#67e8f9",
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <NoteIcon name="sticky-note" color={color} size={30} />
          ),
        }}
        name="Rutetabell"
        component={Rutetabell}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <FerryIcon name="directions-ferry" color={color} size={30} />
          ),
        }}
        name="Rutetider"
        component={Main}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <InfoIcon name="info" color={color} size={30} />
          ),
        }}
        name="Info"
        component={Info}
      />
    </Tab.Navigator>
  );
}
