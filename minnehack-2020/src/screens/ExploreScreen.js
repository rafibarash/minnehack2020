import React from "react";
import { View, StyleSheet, FlatList, AsyncStorage } from "react-native";
import { Text } from "react-native-elements";
import Container from "../components/Container";
import MyCard from "../components/MyCard";
import { useEvents } from "../hooks/event";
import { API_PATH } from "../api";
import { useUser } from "../hooks/user";

const subscribeToEvent = async (eventID, setEvents) => {
  const userToken = await AsyncStorage.getItem("userToken");
  try {
    const res = await fetch(`${API_PATH}/user/event`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userToken,
      },
      body: JSON.stringify({ eventID }),
    });
    if (!res.ok) {
      throw Error("Trouble subscribing to event");
    }
    const json = await res.json();
    setEvents(json.events);
  } catch (err) {
    console.log(err.message);
  }
};

const unsubscribeFromEvent = async (eventID, setEvents) => {
  const userToken = await AsyncStorage.getItem("userToken");
  try {
    const res = await fetch(`${API_PATH}/user/event`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userToken,
      },
      body: JSON.stringify({ eventID }),
    });
    if (!res.ok) {
      throw Error("Trouble unsubscribing from event");
    }
    const json = await res.json();
    setEvents(json.events);
  } catch (err) {
    console.log(err.message);
  }
};

const FindScreen = () => {
  const { events } = useEvents();
  const { user, setUser, isSubscriber } = useUser();

  return (
    <Container>
      <View>
        <Text h2>Nearby Volunteer Opportunities</Text>
        <FlatList
          renderItem={({ item }) => (
            <MyCard
              item={item}
              onSubscribe={subscribeToEvent}
              onUnsubscribe={unsubscribeFromEvent}
              isSubscribed={isSubscriber("events", item._id)}
            />
          )}
          keyExtractor={item => item.name}
          data={events}
          horizontal
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default FindScreen;
