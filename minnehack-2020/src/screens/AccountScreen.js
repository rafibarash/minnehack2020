import React from "react";
import { View, AsyncStorage, StyleSheet } from "react-native";
import { Text, Button, ListItem } from "react-native-elements";
import Container from "../components/Container";

const AccountScreen = ({ navigation }) => {
  return (
    <View style={styles.root}>
      <Text h2 style={styles.header}>
        My Account
      </Text>
      <Actions />
    </View>
  );
};

const signOut = async () => {
  await AsyncStorage.clear();
  navigation.navigate("Auth");
};

const Actions = () => {
  return (
    <View style={styles.actions}>
      <ListItem title="Sign out" onPress={signOut} topDivider bottomDivider />
      <ListItem title="Action two" bottomDivider />
      <ListItem title="Action three" bottomDivider />
      {/* <Button title="Sign out" onPress={signOut} type="clear" /> */}
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
