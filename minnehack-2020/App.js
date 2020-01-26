import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import AuthLoadingScreen from "./src/screens/AuthLoadingScreen";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import HomeScreen from "./src/screens/HomeScreen";

import AccountScreen from "./src/screens/AccountScreen";
import GetPointsScreen from "./src/screens/GetPointsScreen";

const AppStack = createBottomTabNavigator({
  Home: HomeScreen,
  GetPoints: GetPointsScreen,
  Account: AccountScreen
});

const AuthStack = createStackNavigator({
  SignIn: SigninScreen,
  SignUp: SignupScreen,
});

const switchNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: "AuthLoading",
  }
);

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <>
      <App />
    </>
  );
};
