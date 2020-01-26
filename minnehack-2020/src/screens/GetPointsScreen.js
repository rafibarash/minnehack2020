import React, { useContext } from "react";
import { StyleSheet,
    Button,
    View,
    SafeAreaView,
    Text,
    Alert } from "react-native";
import AwesomeButton from "react-native-really-awesome-button"
import { Context as AuthContext } from "../context/AuthContext";


function Separator() {
    return <View style={styles.separator} />;
  }
const GetPointsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
      <AwesomeButton style={styles.}
      progress
      onPress={next => {
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
  
});

export default GetPointsScreen;
