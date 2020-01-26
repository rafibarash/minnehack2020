import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, } from 'react-native';

export default function Home() {
    
    const styles = StyleSheet.create ({
        myState: {
        //    marginTop: 20,
        //    textAlign: 'center',
        //    color: 'blue',
        //    fontWeight: 'bold',
           fontSize: 30,
        },
     });
    
    const [points, setPoints] = useState(0);
    return (
        <View>
            <Text style={styles.myState}>
                You clicked {points} times
            </Text>
            <Button
            title="Press me" 
            onPress={() => setPoints(points + 1)}
            />
        </View>
      );
}





