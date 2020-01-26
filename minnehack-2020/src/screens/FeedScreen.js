import React, { useState, useEffect } from "react";
import { View, StyleSheet, AsyncStorage, FlatList } from "react-native";
import { Text, Card, Button, Icon } from "react-native-elements";
import { API_PATH } from "../api";

const useUserEvents = () => {
  const [userEvents, setUserEvents] = useState([]);
  useEffect(() => {
    const getUserEvents = async () => {
      const userToken = await AsyncStorage.getItem("userToken");
      try {
        const res = await fetch(`${API_PATH}/user/organization`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": userToken,
          },
        });
        if (!res.ok) {
          throw Error("Response to get a users events has bad error code.");
        }
        const json = await res.json();
        console.log(json);
        setUserEvents(json.events);
      } catch (err) {
        console.log(err.message);
      }
    };
  });

  return userEvents;
};

const FeedScreen = () => {
  return (
    <View style={styles.container}>
      <UserEvents />
    </View>
  );
};

const UserEvents = () => {
  // const userEvents = useUserEvents();
  const userEvents = [{ name: "rafi" }, { name: "ansh" }];
  return (
    <View>
      <Text h1>My Events</Text>
      <FlatList
        renderItem={({ item }) => <Event item={item} />}
        keyExtractor={item => item.name}
        data={userEvents}
        horizontal
      />
    </View>
  );
};

const Event = item => {
  console.log(item);
  return (
    <Card
      title="HELLO WORLD"
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
