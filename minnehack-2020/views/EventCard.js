import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import { Card, ListItem, Icon, Button } from 'react-native-elements';
import Icons from 'react-native-vector-icons/AntDesign';

const users = [
    {
       name: 'brynn',
       avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
    },
   ]

export default function EventCard() {
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
        {/* <Button/> */}
        <Icons.Button name="Heart"/>
        {/* <HeartIcon/>> */}
        </Card>
    );
}