import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Divider } from "react-native-elements";
import Container from "../components/Container";
import { usePoints } from "../hooks/points";

const PointsScreen = () => {
  const points = usePoints();
  const curTime = 0;
  const curPoints = 0;
  return (
    <Container>
      <View style={styles.pointsView}>
        <Text h2 style={styles.header}>
          Current Points
        </Text>
        <Text h4>{points}</Text>
      </View>
      <Divider />
      <View style={styles.accumPointsView}>
        <Text h3 style={styles.curSession}>
          Current session
        </Text>
        <View style={styles.sGrid}>
          <View style={styles.sGridChild}>
            <Text h4>Time</Text>
            <Text h4>{curTime}</Text>
          </View>
          <View style={styles.sGridChild}>
            <Text h4>Points</Text>
            <Text h4>{curPoints}</Text>
          </View>
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  pointsView: {
    alignItems: "center",
    marginTop: 60,
    flex: 1,
  },
  header: {
    paddingBottom: 20,
  },
  accumPointsView: {
    alignItems: "center",
    flex: 1.5,
    paddingVertical: 70,
  },
  curSession: {
    color: "red",
  },
  sGrid: {
    flexDirection: "row",
    textAlign: "center",
  },
  sGridChild: {
    alignItems: "center",
  },
});

export default PointsScreen;
