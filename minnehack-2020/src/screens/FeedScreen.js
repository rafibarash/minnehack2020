import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Text, Card, Button, Icon } from "react-native-elements";
import MyCard from "../components/MyCard";
import {
  useUserEvents,
  useUserOrganizations,
  useUserRewards,
  useUser,
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
  const { isSubscriber } = useUser();
  const { userEvents, setUserEvents } = useUserEvents();
  return (
    <View style={{ paddingBottom: 25 }}>
      <Text h2>Your Events</Text>
      <FlatList
        renderItem={({ item }) => (
          <MyCard item={item} isSubscribed={isSubscriber("events", item._id)} />
        )}
        keyExtractor={item => item.name}
        data={userEvents}
        horizontal
      />
    </View>
  );
};

const UserOrganizations = () => {
  const { isSubscriber } = useUser();
  const userOrgs = useUserOrganizations();
  return (
    <View>
      <Text h2>Your Organizations</Text>
      <FlatList
        renderItem={({ item }) => (
          <MyCard
            item={item}
            isSubscribed={isSubscriber("organizations", item._id)}
          />
        )}
        keyExtractor={item => item.name}
        data={userOrgs}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default FeedScreen;
