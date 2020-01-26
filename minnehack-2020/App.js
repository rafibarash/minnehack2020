import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Points from './Points';


export default function App() {
  return (
    <View style={styles.container}>
      <Points></Points>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
