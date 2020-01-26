import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, } from 'react-native';




export default function Home() {
    const [points, setPoints] = useState(0);
    return (
        <View>
          <Text>You clicked {points} times</Text>
          <Button
            title="Home" 
            onPress={() => setPoints(points + 1)}
          />
        </View>
      );
}