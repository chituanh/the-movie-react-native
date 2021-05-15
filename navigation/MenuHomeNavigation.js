import "react-native-gesture-handler";
import * as React from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import HomeNavigation from "../navigation/HomeNavigation";
import ProfileNavigation from "../navigation/ProfileNavigation";
import Recents from "../screens/recents";
import FavoriteNavigation from "../navigation/FavoriteNavigation";
import MyListFilm from "../screens/MyListFilm";
import MyListNagigation from "./MyListNagigation";

const Tab = createMaterialBottomTabNavigator();

const MenuHomeNavigation = ({ navigation }) => (
  <Tab.Navigator
    swipeEnabled
    initialRoute="Home"
    activeColor="#02ad94"
    inactiveColor="#dedede"
    style={{ backgroundColor: "#000" }}
    barStyle={{ backgroundColor: "#0f0f0f", padding: 4 }}
  >
    <Tab.Screen
      name="Home"
      component={HomeNavigation}
      options={{
        tabBarLabel: "",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" color={color} size={28} />
        ),
      }}
    />
    <Tab.Screen
      name="favorite"
      component={FavoriteNavigation}
      options={{
        tabBarLabel: "",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="lock-plus" color={color} size={28} />
        ),
      }}
    />
    <Tab.Screen
      name="MyList"
      component={MyListNagigation}
      options={{
        tabBarLabel: "",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons
            name="camera-metering-spot"
            color={color}
            size={28}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileNavigation}
      options={{
        tabBarLabel: "",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account" color={color} size={28} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MenuHomeNavigation;
