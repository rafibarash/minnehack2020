import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import Container from "../components/Container";
import { usePoints } from "../hooks/points";

const PointsScreen = () => {
  const points = usePoints();
  return (
    <Container>
      <View style={{ alignItems: "center" }}>
        <Text h2 style={{ paddingBottom: 20 }}>
          Current Points
        </Text>
        <Text h4>{points}</Text>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default PointsScreen;
