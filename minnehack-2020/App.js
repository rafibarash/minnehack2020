import React, { useState } from "react";
import { Text, View } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { ClipLoader } from "react-spinners";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import Home from "./src/views/Home";
import { setNavigator } from "./src/navigationRef";
import HomeScreen from "./src/screens/HomeScreen";
import AccountScreen from "./src/screens/AccountScreen";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";

import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";

// class HomeScreen extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <Home> </Home>
//       </View>
//     );
//   }
// }

// class SettingsScreen extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <Text>Settings!</Text>
//       </View>
//     );
//   }
// }

const switchNavigator = createSwitchNavigator({
  // ResolveAuth: ResolveAuthScreen,
  // loginFlow: createStackNavigator({
  //   Signup: SignupScreen,
  //   Signin: SigninScreen,
  // }),
  mainFlow: createBottomTabNavigator({
    Home: HomeScreen,
    // Settings: SettingsScreen,
    Account: AccountScreen,
  }),
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <>
      {/* <AuthProvider> */}
      <App
        ref={navigator => {
          setNavigator(navigator);
        }}
      />
      {/* </AuthProvider> */}
    </>
  );
};
