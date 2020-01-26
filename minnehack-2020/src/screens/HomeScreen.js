import React from "react";
import { Text, View, StyleSheet } from "react-native";

const HomeScreen = () => {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>Hello world!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    // padding: 100,
    // textAlign: "center",
    // backgroundColor: "red",
  },
  text: {
    // justifyContent: "center",
    // alignItems: "center",
    top: 100,
    left: 100,
  },
});

export default HomeScreen;
