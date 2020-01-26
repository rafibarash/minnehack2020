import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Text, Card, Button, Icon } from "react-native-elements";
import MyCard from "../components/MyCard";
import {
  useUserEvents,
  useUserOrganizations,
  useUserRewards,
} from "../hooks/user";

const FeedScreen = () => {
  return (
    <View style={styles.container}>
      <UserEvents />
      <UserOrganizations />
    </View>
  );
};

const UserEvents = () => {
  const userEvents = useUserEvents();
  return (
    <View>
      <Text h2>My Events</Text>
      <FlatList
        renderItem={({ item }) => <MyCard item={item} />}
        keyExtractor={item => item.name}
        data={userEvents}
        horizontal
      />
    </View>
  );
};

const UserOrganizations = () => {
  const userOrgs = useUserOrganizations();
  return (
    <View>
      <Text h2>My Organizations</Text>
      <FlatList
        renderItem={({ item }) => <MyCard item={item} />}
        keyExtractor={item => item.name}
        data={userOrgs}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    marginHorizontal: 25,
  },
});

export default FeedScreen;
