import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import AuthLoadingScreen from "./src/screens/AuthLoadingScreen";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import PointsScreen from "./src/screens/PointsScreen";
import FeedScreen from "./src/screens/FeedScreen";
import ExploreScreen from "./src/screens/ExploreScreen";
import RewardScreen from "./src/screens/RewardsScreen";
import AccountScreen from "./src/screens/AccountScreen";
import Icon from 'react-native-ionicons';


const AppStack = createBottomTabNavigator({
  Home: {screen: PointsScreen, tabBarIcon: ({ tintColor }) => (
    <Icon name='ios-home' size={30} color={tintColor}/>
  )},
  Feed: {screen: FeedScreen , tabBarIcon: ({ tintColor }) => (
    <Icon name='ios-home' size={30} color={tintColor}/>
  )},
  Explore: {screen: ExploreScreen, tabBarIcon: ({ tintColor }) => (
    <Icon name='ios-home' size={30} color={tintColor}/>
  )},
  Rewards: {screen: RewardScreen, tabBarIcon: ({ tintColor }) => (
    <Icon name='ios-home' size={30} color={tintColor}/>
  )},
  Account: {screen: AccountScreen, tabBarIcon: ({ tintColor }) => (
    <Icon name='ios-home' size={30} color={tintColor}/>
  )},
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
