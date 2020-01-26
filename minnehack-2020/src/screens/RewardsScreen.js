import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Text } from "react-native-elements";
import MyCard from "../components/MyCard";
import { useUserRewards } from "../hooks/user";
import Container from "../components/Container";

const RewardsScreen = () => {
  return (
    <Container>
      <UserRewards />
    </Container>
  );
};

const UserRewards = () => {
  let userRewards = useUserRewards();
  userRewards = userRewards.map(reward => {
    return { ...reward, name: reward.sponsor };
  });
  return (
    <View>
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

const styles = StyleSheet.create({});

export default RewardsScreen;
