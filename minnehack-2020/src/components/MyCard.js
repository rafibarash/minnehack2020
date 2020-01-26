import React from "react";
import { StyleSheet, Image, View } from "react-native";
import { Text, Card, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const styles = StyleSheet.create({
  buttonStyle: {
    // borderRadius: 0,
    // marginLeft: 0,
    // marginRight: 0,
    // marginBottom: 0,
    // alignSelf: "stretch",
    width: 120,
    marginTop: 15,
  },
  imageStyle: {
    width: 164,
    height: 100,
    marginBottom: 10,
    borderRadius: 7,
  },
  viewStyle: {
    // justifyContent: "center",
    // alignItems: "left",
    // textAlign: "center",
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

const MyCard = ({ item, onSubscribe, onUnsubscribe, isSubscribed }) => {
  let name;
  item.name.length > 19
    ? (name = item.name.slice(0, 16) + "...")
    : (name = item.name);
  return (
    <Card title={name} containerStyle={styles.cardStyle}>
      <View style={styles.viewStyle}>
        <Image source={{ uri: item.image }} style={styles.imageStyle} />
        {isSubscribed ? (
          <Button
            style={styles.buttonStyle}
            icon={
              <Icon
                name="thumbs-up"
                color="#ffffff"
                style={{ paddingRight: 8 }}
              />
            }
            title="Joined"
            onPress={() => onUnsubscribe(item._id)}
          />
        ) : (
          <Button
            style={styles.buttonStyle}
            icon={
              <Icon
                name="thumbs-down"
                color="#ffffff"
                style={{ paddingRight: 8 }}
              />
            }
            title="Not joined"
            onPress={() => onSubscribe(item._id)}
          />
        )}
      </View>
    </Card>
  );
};

export default MyCard;
