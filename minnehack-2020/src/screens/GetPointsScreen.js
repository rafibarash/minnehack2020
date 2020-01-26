import React, { useState } from "react";
import { API_PATH } from "../api";

import { StyleSheet,
    Button,
    View,
    SafeAreaView,
    AsyncStorage,
    Text,
    Alert } from "react-native";
import AwesomeButton from "react-native-really-awesome-button"
import LinearGradient from "react-native-linear-gradient";

import { Context as AuthContext } from "../context/AuthContext";


function Separator() {
  return <View style={styles.separator} />;
}
const GetPointsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.starterButtonView}>
      <AwesomeButton style={styles.starterButton}
      progress
      onPress= {async next => {
        const [errorMessage, setErrorMessage] = useState("");
        const userToken = await AsyncStorage.getItem("userToken");
        const res = await fetch(`${API_PATH}/events`, {
            method: "GET",
            headers: { "Content-Type": "application/json", "x-auth-token": userToken },
            
          });
          if (!res.ok) {
            setErrorMessage("Event loading error.");
          } else {
            const json = await res.json();
            console.log(json);
          }
        // get all registered events for user
        // for each event, check if current time is between the time given
        // if it is, get the current location and compare it with the location of the event
        // if same location, start counting points
        // else: error

        /** Do Something **/
        next();
      }}
    >
      Begin Volunteering Tracking
    </AwesomeButton>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    starterButtonView:{
        marginTop: 100,
        alignItems: 'center',
    },
    starterButton:{
        backgroundColor: 'skyblue'
    }
  
});

export default GetPointsScreen;
