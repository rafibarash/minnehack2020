import React from "react";
import { View, AsyncStorage, StyleSheet } from "react-native";
import { Text, Button, ListItem } from "react-native-elements";
import Container from "../components/Container";

const AccountScreen = ({ navigation }) => {
  const signOut = async () => {
    await AsyncStorage.clear();
    navigation.navigate("Auth");
  };

  return (
    <View style={styles.root}>
      <Text h2 style={styles.header}>
        Personal Account
      </Text>
      <View style={styles.actions}>
        <ListItem title="Sign out" onPress={signOut} topDivider bottomDivider />
        <ListItem
          title="Action two"
          onPress={() => alert("action two!!")}
          bottomDivider
        />
        <ListItem
          title="Action three"
          onPress={() => alert("action threeeee")}
          bottomDivider
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: 100,
  },
  header: {
    marginLeft: 25,
  },
  actions: {
    marginTop: 25,
  },
});

export default AccountScreen;
