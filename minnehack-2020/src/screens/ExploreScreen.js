import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Text } from "react-native-elements";
import Container from "../components/Container";
import MyCard from "../components/MyCard";
import { useEvents } from "../hooks/event";

const FindScreen = () => {
  const events = useEvents();
  return (
    <Container>
      <View>
        <Text h2>Explore Volunteer Opportunities</Text>
        <FlatList
          renderItem={({ item }) => <MyCard item={item} />}
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
