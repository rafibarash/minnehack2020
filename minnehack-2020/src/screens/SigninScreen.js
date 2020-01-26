import React, { useState } from "react";
import { View, StyleSheet, Text, Button, AsyncStorage } from "react-native";
import { NavigationEvents } from "react-navigation";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";

const SigninScreen = ({ navigation }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const signIn = async () => {
    await AsyncStorage.setItem("userToken", "abc");
    navigation.navigate("App");
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
