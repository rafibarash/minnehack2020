import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Text, Card, Button, Icon } from "react-native-elements";
import MyCard from "../components/MyCard";
import {
  useUserEvents,
  useUserOrganizations,
  useUserRewards,
} from "../hooks/user";
import Container from "../components/Container";

const FeedScreen = () => {
  return (
    <Container>
      <UserEvents />
      <UserOrganizations />
    </Container>
  );
};

const UserEvents = () => {
  const userEvents = useUserEvents();
  return (
    <View style={{ paddingBottom: 30 }}>
      <Text h2>Your Events</Text>
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
      <Text h2>Your Organizations</Text>
      <FlatList
        renderItem={({ item }) => <MyCard item={item} />}
        keyExtractor={item => item.name}
        data={userOrgs}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default FeedScreen;
