import React, { useState } from "react";
import { View, StyleSheet, Text, Button, AsyncStorage } from "react-native";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { API_PATH } from "../api";

const SigninScreen = ({ navigation }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const signIn = async ({ email, password }) => {
    try {
      const res = await fetch(`${API_PATH}/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        throw Error("Response has bad error code");
      } else {
        const json = await res.json();
        await AsyncStorage.setItem("userToken", json.token);
        navigation.navigate("App");
      }
    } catch (err) {
      console.log(err.message);
      setErrorMessage("Invalid login.");
    }
  };

  return (
    <View style={styles.container}>
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
