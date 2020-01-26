import React, { useState, useEffect } from "react";
import { View, StyleSheet, AsyncStorage, FlatList } from "react-native";
import { Text, Card, Button, Icon } from "react-native-elements";
import { API_PATH } from "../api";
import { useUserEvents, useUserOrganizations } from "../hooks/user";

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
      <Text h1>My Events</Text>
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
      <Text h1>My Organizations</Text>
      <FlatList
        renderItem={({ item }) => <MyCard item={item} />}
        keyExtractor={item => item.name}
        data={userOrgs}
        horizontal
      />
    </View>
  );
};

const MyCard = ({ item }) => {
  return (
    <Card
      title={item.name}
      // image={item.image}
      // image={require('../images/pic2.jpg')}>
    >
      <Text style={{ marginBottom: 10 }}>{item.name}</Text>
      <Button
        icon={<Icon name="code" color="#ffffff" />}
        buttonStyle={{
          borderRadius: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
        }}
        title="VIEW NOW"
      />
    </Card>
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
