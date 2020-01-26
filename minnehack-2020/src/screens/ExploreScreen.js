import React, { useState } from "react";
import { View, StyleSheet, FlatList, TextInput, TouchableHighlight } from "react-native";
import { Text } from "react-native-elements";
import Container from "../components/Container";
import MyCard from "../components/MyCard";
import { useEventLocationed } from "../hooks/eventLocationed";
import { StackGestureContext } from "react-navigation";



const SearchBar = () => {
  const [text, setText] = useState('')

  return (
    <View style={{flexDirection:'row'}}>
    <View>
    <TextInput
        style={{width: 80, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(newText) => setText(newText)}
        value={text}
      />
    </View>
</View>
  )
}


const FindScreen = () => {
  const cities = [
    {
      name: "Minneapolis",
      latitude: 44.963992,
      longitude: -93.229259,
    },
    {
      name: "Chicago",
      latitude: 41.8789,
      longitude: 87.6359
    },
    {
      name: "New York",
      latitude: 40.7831,
      longitude: 73.9712
    }
  ]
  
  const events = useEventLocationed(cities[0].latitude, cities[0].longitude);
  return (
    <View>
    <Container>
      <View>
        <Text h2>Cities</Text>
        <FlatList
          renderItem={({ item }) => <MyCard item={item} />}
          keyExtractor={item => item.name}
          data={cities}
          horizontal
        />
      </View>
    </Container>
    <Container>
      <View>
        <Text h2>Explore Volunteer Opportunities</Text>
        <FlatList
          renderItem={({ item }) => <MyCard item={item} />}
          keyExtractor={item => item.name}
          data={events}
          horizontal
        />
      </View>
    </Container>
    </View>
  );
};

const styles = StyleSheet.create({});

export default FindScreen;
