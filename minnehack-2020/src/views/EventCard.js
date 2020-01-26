import React, { useState } from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';

function Favorite() {
return (
<Icon name="heart" size={30} color="#900" />
);
} 
function Favo() {
    return (
    <Icon name="hearto" size={30} color="#900" />
    );
    } 
const users = [
    {
       name: 'brynn',
       avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
    },
   ]

export default function EventCard() {
    const [favorited, setFavorited] = useState(false);
    return (
        <Card
        title='Hot SIngles near u'
        image={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'}}>
        <Text style={{marginBottom: 10}}>
            ull nut 69 times
        </Text>
        <Button
        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
        title='View'
        />
        <Button 
            icon={
                <Icon 
                name={favorited ? "heart" : "hearto"}
                color="red"
                size={24}
                />
            }
            onPress={() => setFavorited(!favorited)}
            type="clear"
        />
        </Card>
    );
}