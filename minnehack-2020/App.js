import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import AuthLoadingScreen from "./src/screens/AuthLoadingScreen";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import PointsScreen from "./src/screens/GetPointsScreen";
import FeedScreen from "./src/screens/FeedScreen";
import ExploreScreen from "./src/screens/ExploreScreen";
import RewardScreen from "./src/screens/RewardsScreen";
import AccountScreen from "./src/screens/AccountScreen";

const AppStack = createBottomTabNavigator({
  Home: PointsScreen,
  Feed: FeedScreen,
  Explore: ExploreScreen,
  Rewards: RewardScreen,
  Account: AccountScreen,
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
