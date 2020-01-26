import React from "react";
import { Image, View } from "react-native";
import { Text, Card, Button, Icon, Tile } from "react-native-elements";

const MyCard = ({ item }) => {
  return (
    <>
      <Card title={item.name}>
        <View>
          {item.image && (
            <Image resizeMode="cover" source={{ uri: item.image }} />
          )}
          <Text style={{ marginBottom: 10 }}>{item.name}</Text>
          <Button
            icon={<Icon name="thumb-up" color="#ffffff" />}
            // buttonStyle={{
            //   borderRadius: 0,
            //   marginLeft: 0,
            //   marginRight: 0,
            //   marginBottom: 0,
            // }}
            // title="VIEW NOW"
          />
        </View>
      </Card>
    </>
  );
};

export default MyCard;
