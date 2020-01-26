import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { API_PATH } from "../api";

const HomeScreen = () => {
  const [msg, setMsg] = useState("Hello world!");
  useEffect(() => {
    const sayHi = async () => {
      const res = await fetch(`${API_PATH}`);
      console.log(res);
      const json = await res.json();
      console.log(json.msg);
      setMsg(json.msg);
    };
    sayHi();
  });
  return (
    <View style={styles.root}>
      <Text style={styles.text}>{msg}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    // padding: 100,
    // textAlign: "center",
    // backgroundColor: "red",
  },
  text: {
    // justifyContent: "center",
    // alignItems: "center",
    top: 100,
    left: 100,
  },
});

export default HomeScreen;
