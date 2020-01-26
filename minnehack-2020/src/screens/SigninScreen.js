import React, { useState } from "react";
import { View, StyleSheet, Text, Button, AsyncStorage } from "react-native";
import { NavigationEvents } from "react-navigation";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { API_PATH } from "../api";

const SigninScreen = ({ navigation }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const signIn = async ({ email, password }) => {
    const res = await fetch(`${API_PATH}/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      setErrorMessage("Invalid login.");
    } else {
      const json = await res.json();
      await AsyncStorage.setItem("userToken", json.token);
      navigation.navigate("App");
    }
  };

  return (
    <View style={styles.container}>
      <NavigationEvents onWillBlur={() => setErrorMessage("")} />
      <AuthForm
        headerText="Sign In to Your Account"
        onSubmit={signIn}
        errorMessage={errorMessage}
        submitButtonText="Sign In"
      />
      <NavLink
        text="Dont have an account? Sign up instead"
        routeName="SignUp"
      />
    </View>
  );
};

SigninScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 250,
  },
});

export default SigninScreen;
