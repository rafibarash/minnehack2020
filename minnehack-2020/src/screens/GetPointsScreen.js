import React from "react";
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
} from "react-native";
import AwesomeButton from "react-native-really-awesome-button";

function Separator() {
  return <View style={styles.separator} />;
}
const GetPointsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <AwesomeButton
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

const styles = StyleSheet.create({});

export default GetPointsScreen;
