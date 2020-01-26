import React from "react";
import { StyleSheet, Image, View } from "react-native";
import { Text, Card, Button, Icon } from "react-native-elements";

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
  },
  imageStyle: {
    width: 100,
    height: 75,
    marginBottom: 10,
  },
  viewStyle: {
    justifyContent: "center",
    alignItems: "center",
  },
});

const MyCard = ({ item, onSubscribe, onUnsubscribe }) => {
  return (
    <Card
      title={item.name}
      // image={item.image}
      // image={require('../images/pic2.jpg')}>
    >
      <View style={styles.viewStyle}>
        <Image source={{ uri: item.image }} style={styles.imageStyle} />
        <Button
          style={styles.buttonStyle}
          icon={<Icon name="code" color="#ffffff" />}
          title="VIEW NOW"
        />
      </View>
    </Card>
  );
};

export default MyCard;
