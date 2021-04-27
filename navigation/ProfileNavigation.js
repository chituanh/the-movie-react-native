import * as React from "react";

import { Button, Platform, Text } from "react-native";
import EditProfile from "../screens/editProfile";
import Profile from "../screens/profile";
import { createStackNavigator } from "@react-navigation/stack";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { TouchableOpacity } from "react-native-gesture-handler";

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={({ navigation }) => ({
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "#37474f",
        },
        headerRight: () => {
          return (
            <TouchableOpacity style = {{padding: 10}}  onPress = {() => {
              navigation.navigate("EditProfile");
            }} >
              <Text style = {{
                color: 'white'
              }} >
              Edit
              </Text>
            </TouchableOpacity>
          );
        },
      })}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfile}
      options={({ navigaton }) => ({
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "#37474f",
        },
      })}
    />
  </Stack.Navigator>
);
