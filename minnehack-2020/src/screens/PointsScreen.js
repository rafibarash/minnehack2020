import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Divider } from "react-native-elements";
import Container from "../components/Container";
import { usePoints } from "../hooks/points";


const PointsScreen = () => {
  const points = usePoints();
  const [currTime, setCurrTime] = useState(0);
  const curPoints = 0;

/*
  const intervalId = BackgroundTimer.setInterval(() => {
    // this will be executed every 200 ms
    // even when app is the the background
    setCurrTime(currTime+1);
  }, 1000);
  */

  return (
    <Container>
      <View style={styles.pointsView}>
        <Text h3 style={styles.header}>
          Your Point Total
        </Text>
        <Text h1 style={styles.header}>{points}</Text>
      </View>
      <View style={styles.accumPointsView}>
        <Text h4 style={styles.curSession}>
          Current session
        </Text>
        <View style={styles.sGrid}>
          <View style={styles.sGridChild}>
            <Text h4 style={styles.sGridText}>Time</Text>
            <Text h5 style={styles.sGridText}>
              0:00
            </Text>
          </View>
          <View style={styles.sGridChild}>
            <Text h4 style={styles.sGridText}>Points</Text>
            <Text h5 style={styles.sGridText}>{curPoints}</Text>
          </View>
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  pointsView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    borderRadius: 200,
    borderWidth: 10,
    borderColor: "#1e90ff",
  },
  header: {
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom:10,
    marginTop:10,
    borderRadius: 30,
    backgroundColor: "#1e90ff",
    color: "#ffffff",
  },
  accumPointsView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
    flex: 0.5,
    borderRadius: 100,
    borderWidth: 10,
    borderColor: "#d11d0d",
  },
  curSession: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingTop: 10,
    marginBottom:10,
    borderRadius: 30,
    color: "#ffffff",
    backgroundColor: "#d11d0d",

  },
  sGrid: {
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "space-around",

  },
  sGridChild: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingTop: 10,
    marginBottom:10,
    borderRadius: 30,
    backgroundColor: "#d11d0d",
    flexDirection: "column",
    alignItems: "center",
    marginLeft:20,
    marginRight:20,
  },
  sGridText: {
    color: "#ffffff",

  }
});

export default PointsScreen;
