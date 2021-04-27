import * as React from "react";

import { Button } from "react-native";
import DetailFilm from "../screens/detailFilm";
import Home from "../screens/home";
import { createStackNavigator } from "@react-navigation/stack";
import PlayVideoScreen from "../screens/PlayVideoScreen";

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator >
    <Stack.Screen
      name="Home"
      component={Home}
      options={({ navigation }) => ({
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "#37474f",
        },
      })}
    />
    <Stack.Screen
      name="DetailFilm"
      component={DetailFilm}
      options={({ navigaton }) => ({
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "#37474f",
        },
      })}
    />
    <Stack.Screen name="PlayVideo" component={PlayVideoScreen}  />
  </Stack.Navigator>
);
