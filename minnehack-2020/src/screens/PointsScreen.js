import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import Container from "../components/Container";
import { useEvents } from "../hooks/event";
import { usePoints } from "../hooks/points";

const PointsScreen = () => {
  const points = usePoints();
  return (
    <Container>
      <View>
        <Text h2>Current Points: {points}</Text>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default PointsScreen;
