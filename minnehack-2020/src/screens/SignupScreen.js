import React, { useState } from "react";
import { View, StyleSheet, AsyncStorage } from "react-native";
import { NavigationEvents } from "react-navigation";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";

const SignupScreen = ({ navigation }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const signUp = async ({ email, password }) => {
    await AsyncStorage.setItem("userToken", "abc");
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <NavigationEvents onWillBlur={() => setErrorMessage("")} />
      <AuthForm
        headerText="Sign Up for Tracker"
        errorMessage={errorMessage}
        submitButtonText="Sign Up"
        onSubmit={signUp}
      />
      <NavLink
        routeName="SignIn"
        text="Already have an account? Sign in instead!"
      />
    </View>
  );
};

SignupScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 250,
  },
});

export default SignupScreen;
