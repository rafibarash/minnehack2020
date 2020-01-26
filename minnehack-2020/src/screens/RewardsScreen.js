import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Text } from "react-native-elements";
import MyCard from "../components/MyCard";
import { useUserRewards } from "../hooks/user";

const RewardsScreen = () => {
  return (
    <View style={styles.container}>
      <UserRewards />
    </View>
  );
};

const UserRewards = () => {
  let userRewards = useUserRewards();
  userRewards = userRewards.map(reward => {
    return { ...reward, name: reward.sponsor };
  });
  return (
    <View>
      <Text h2> Rewards</Text>
      <FlatList
        renderItem={({ item }) => <MyCard item={item} />}
        keyExtractor={item => item.name}
        data={userRewards}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    marginHorizontal: 25,
  },
});

export default RewardsScreen;
