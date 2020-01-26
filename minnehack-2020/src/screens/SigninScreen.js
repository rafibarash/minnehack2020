import React, { useContext } from "react";
import { View, StyleSheet, Text, Button, AsyncStorage } from "react-native";

class SigninScreen extends React.Component {
  static navigationOptions = {
    title: "Please sign in",
  };

  render() {
    return (
      <View>
        <Button title="Sign in!" onPress={this._signInAsync} />
      </View>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem("userToken", "abc");
    this.props.navigation.navigate("App");
  };
}

export default SigninScreen;
