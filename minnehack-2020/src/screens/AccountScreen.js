import React, { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";

const AccountScreen = () => {
  const { signout } = useContext(AuthContext);

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
