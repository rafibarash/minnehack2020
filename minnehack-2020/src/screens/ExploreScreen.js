





import React from "react";
import { View, StyleSheet, FlatList, AsyncStorage } from "react-native";
import { Text } from "react-native-elements";
import Container from "../components/Container";
import MyCard from "../components/MyCard";
import { useEvents } from "../hooks/event";
import { API_PATH } from "../api";

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

const ExploreScreen = () => {
    const cities = [
      {
        name: "Minneapolis",
        latitude: 44.963992,
        longitude: -93.229259,
      },
      {
        name: "Chicago",
        latitude: 41.8789,
        longitude: 87.6359
      },
      {
        name: "New York",
        latitude: 40.7831,
        longitude: 73.9712
      }
    ]
    
  //const events = useEventLocationed(cities[0].latitude, cities[0].longitude);
  const { events } = useEvents();

  return (
    <View>
    <Container>
      <View>
        <Text h2>Cities</Text>
        <FlatList
          renderItem={({ item }) => <MyCard item={item} />}
          keyExtractor={item => item.name}
          data={cities}
          horizontal
        />
      </View>
    </Container>
    <Container>
      <View>
        <Text h2>Volunteer Events Near You</Text>
        <FlatList
          renderItem={({ item }) => (
            <MyCard
              item={item}
              onSubscribe={subscribeToEvent}
              onUnsubscribe={unsubscribeFromEvent}
            />
          )}
          keyExtractor={item => item.name}
          data={events}
          horizontal
        />
      </View>
    </Container>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ExploreScreen;
