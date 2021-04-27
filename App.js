import "react-native-gesture-handler";

import * as React from "react";
import { Provider } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { applyMiddleware, combineReducers, createStore } from "redux";
import ReduxThunk from "redux-thunk";

import LoginNavigation from "./navigation/LoginNavigation";
import MenuHomeNavigation from "./navigation/MenuHomeNavigation";

import authReducer from "./store/reducers/auth";
import filmReducer from "./store/reducers/film";

const Stack = createStackNavigator();

const rootReducer = combineReducers({
  auth: authReducer,
  film: filmReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = (props) => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Login" component={LoginNavigation} />
          <Stack.Screen name="MenuHome" component={MenuHomeNavigation} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
