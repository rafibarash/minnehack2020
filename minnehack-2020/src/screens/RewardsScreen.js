import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Text } from "react-native-elements";
import MyCard from "../components/MyCard";
import { useUserRewards } from "../hooks/user";
import { useLocalRewards } from "../hooks/reward";
import Container from "../components/Container";

const RewardsScreen = () => {
  return (
    <Container>
      <UserRewards />
      <LocalRewards />
    </Container>
  );
};

const UserRewards = () => {
  let userRewards = useUserRewards();
  userRewards = userRewards.map(reward => {
    return { ...reward, name: reward.sponsor };
  });
  return (
    <View style={{ paddingBottom: 25 }}>
      <Text h2>Your Rewards</Text>
      <FlatList
        renderItem={({ item }) => <MyCard item={item} />}
        keyExtractor={item => item.name}
        data={userRewards}
        horizontal
      />
    </View>
  );
};

const LocalRewards = () => {
  let rewards = useLocalRewards();
  rewards = rewards.map(reward => {
    return { ...reward, name: reward.sponsor };
  });
  return (
    <View>
      <Text h2>Local Rewards</Text>
      <FlatList
        renderItem={({ item }) => <MyCard item={item} />}
        keyExtractor={item => item._id}
        data={rewards}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default RewardsScreen;
