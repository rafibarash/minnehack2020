import React, { useContext } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import SearchBar from 'react-native-search-bar';
import { Context as AuthContext } from "../context/AuthContext";
import { Input } from 'galio-framework'
import { Icon } from '../components/Icon';
import * as Permissions from 'expo-permissions';


componentWillMount= () => {
  if (Platform.OS === 'android' && !Constants.isDevice) {
    this.setState({
      errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
    });
  } else {
    this._getLocationAsync();
  }
}

_getLocationAsync = async () => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') {
    this.setState({
      errorMessage: 'Permission to access location was denied',
    });
  }
}

state = {
  location: null
};



findCoordinates= () => {
  
  navigator.geolocation.getCurrentPosition( position=> {
    const location = JSON.stringify(position.coords);
    console.log(location);
    
    this.setState({location});
    },
    error => Alert.alert(error.message),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
  );
};



const FindScreen = () => {
  
  

  

    return (
      <View>
        <Text onLayout={this.findCoordinates}>COORDS {this.state.location}</Text>
      </View>
      
    );
};


const styles = StyleSheet.create({
  search: {
    height: 48,
    width: 50,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },


});




export default FindScreen;
