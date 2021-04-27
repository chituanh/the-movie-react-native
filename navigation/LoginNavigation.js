import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import SignInScreen from '../screens/login/SignInScreen';
import SignUpScreen from '../screens/login/SignUpScreen';
import SplashScreen from '../screens/login/SplashScreen';
import ResetPasswordScreen from '../screens/login/ResetPasswordScreen';


const Stack = createStackNavigator();

const LoginNavigation = () => (
    <Stack.Navigator headerMode = 'none'>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
        <Stack.Screen name = 'Splash' component = {SplashScreen}/>
        <Stack.Screen name = 'SignUp' component = {SignUpScreen}/>
        <Stack.Screen name = 'SignIn' component = {SignInScreen}/>
        <Stack.Screen name = 'ResetPassword' component = {ResetPasswordScreen}/>
    </Stack.Navigator>
)

export default LoginNavigation;