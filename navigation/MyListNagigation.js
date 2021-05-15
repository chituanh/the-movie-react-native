import * as React from "react";

import DetailFilm from "../screens/detailFilm";
import { createStackNavigator } from "@react-navigation/stack";
import PlayVideoScreen from "../screens/PlayVideoScreen";
import RatingScreen from "../screens/RatingScreen";
import ReviewScreen from "../screens/ReviewScreen";
import MyListFilm from "../screens/MyListFilm";

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator>
    <Stack.Screen
      name="MyList"
      component={MyListFilm}
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
    <Stack.Screen
      name="PlayVideo"
      component={PlayVideoScreen}
      options={({ navigaton }) => ({
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "#37474f",
        },
      })}
    />
    <Stack.Screen
      name="Rating"
      component={RatingScreen}
      options={({ navigaton }) => ({
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "#37474f",
        },
      })}
    />
    <Stack.Screen
      name="Review"
      component={ReviewScreen}
      options={({ navigaton }) => ({
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "#37474f",
        },
      })}
    />
  </Stack.Navigator>
);
