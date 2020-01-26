import React, { useState } from "react";
import { View, StyleSheet, AsyncStorage } from "react-native";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { API_PATH } from "../api";

const SignupScreen = ({ navigation }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const signUp = async ({ email, password }) => {
    try {
      const res = await fetch(`${API_PATH}/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name: "John Doe" }),
      });
      if (!res.ok) {
        throw Error("API response has bad error code.");
      } else {
        const json = await res.json();
        await AsyncStorage.setItem("userToken", json.token);
        navigation.navigate("App");
      }
    } catch (err) {
      console.log(err.message);
      setErrorMessage(
        "Invalid account information. Your password is likely already in use."
      );
    }
  };

  return (
    <View style={styles.container}>
      <AuthForm
        headerText="Sign Up"
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
