import React from "react";
import { Text, View, StyleSheet } from "react-native";

const AccountScreen = () => {
  return (
    <View style={styles.root}>
      <Text>My account</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    top: 100,
    left: 150,
  },
});

export default AccountScreen;
