import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import FavoriteScreen from '../screens/TabBar/FavoriteScreen';
import FavoriteScreenDetail from '../screens/TabBar/FavoriteScreenDetail';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator >
    <Stack.Screen
      name="Favorite"
      component={FavoriteScreen}
      options={({ navigation }) => ({
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "#37474f",
        },
      })}
    />
    <Stack.Screen
      name="FavoriteDetail"
      component={FavoriteScreenDetail}
      options={({ navigation }) => ({
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "#37474f",
        },
      })}
    />
  </Stack.Navigator>
);
