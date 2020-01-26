import React from "react";
import { StyleSheet, Image, View } from "react-native";
import { Text, Card, Button } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
  },
  imageStyle: {
    width: 150,
    height: 100,
    marginBottom: 10,
    borderRadius: 7,
  },
  viewStyle: {
    justifyContent: "center",
    alignItems: "center",
  },
  cardStyle: {
    width: 200,
    height: 250,
    borderRadius: 7,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
});

const MyCard = ({ item, onSubscribe, onUnsubscribe }) => {
  var name;
  var isLiked = false;
  item.name.length > 20
    ? (name = item.name.slice(0, 17) + "...")
    : (name = item.name);
  return (
    <Card title={name} containerStyle={styles.cardStyle}>
      <View style={styles.viewStyle}>
        <Image source={{ uri: item.image }} style={styles.imageStyle} />
        {isLiked
          ? <Button
          style={styles.buttonStyle}
          icon={<Icon name="code" color="#ffffff" />}
          title="Like"
        />
          : <Button
          style={styles.buttonStyle}
          icon={<Icon name="code" color="#ffffff" />}
          title="Dislike"
        />
          }
        
        
      </View>
    </Card>
  );
};

export default MyCard;
