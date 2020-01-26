import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, AsyncStorage, Button } from "react-native";
import { API_PATH } from "../api";

const HomeScreen = ({ navigation }) => {
  _showAccount = () => {
    navigation.navigate("AccountScreen");
  };

  _getPoints = () => {
    navigation.navigate("GetPointsScreen");
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    navigation.navigate("Auth");
  };

  return (
    <View>
      <Button title="Show me more of the app" onPress={this._showAccount} />
      <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
      <Button title="Get Points" onPress={this._getPoints}></Button>
    </View>
  );
};

HomeScreen.navigationOptions = {
  title: "Welcome to the app!",
};

const styles = StyleSheet.create({});

export default HomeScreen;
