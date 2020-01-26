import React, { useEffect } from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

const AuthLoadingScreen = ({ navigation }) => {
  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const _bootstrapAsync = async () => {
      const userToken = await AsyncStorage.getItem("userToken");

      // Take us to app if logged in, otherwise auth screen
      navigation.navigate(userToken ? "App" : "Auth");
    };

    _bootstrapAsync();
  });

  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
};

export default AuthLoadingScreen;
