import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, } from 'react-native';




export default function Points() {
    const [points, setPoints] = useState(0);
    return (
        <View>
          <Text>You clicked {points} times</Text>
          <Button
            title="Press me" 
            onPress={() => setPoints(points + 1)}
          />
        </View>
      );
}



