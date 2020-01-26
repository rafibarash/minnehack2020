import { useState, useEffect } from "react";
import { AsyncStorage } from "react-native";
import { API_PATH } from "../api";

export const useUserEvents = () => {
  const [userEvents, setUserEvents] = useState([]);
  useEffect(() => {
    const getUserEvents = async () => {
      const userToken = await AsyncStorage.getItem("userToken");
      try {
        const res = await fetch(`${API_PATH}/user/event`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": userToken,
          },
        });
        if (!res.ok) {
          throw Error("Response to get a users events has bad error code.");
        }
        const json = await res.json();
        setUserEvents(json.events);
      } catch (err) {
        console.log(err.message);
      }
    };
    getUserEvents();
  }, []);

  return userEvents;
};

export const useUserOrganizations = () => {
  const [userOrgs, setUserOrgs] = useState([]);
  useEffect(() => {
    const getUserOrgs = async () => {
      const userToken = await AsyncStorage.getItem("userToken");
      try {
        const res = await fetch(`${API_PATH}/user/organization`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": userToken,
          },
        });
        if (!res.ok) {
          throw Error(
            "Response to get a users organizations has bad error code."
          );
        }
        const json = await res.json();
        setUserOrgs(json.organizations);
      } catch (err) {
        console.log(err.message);
      }
    };
    getUserOrgs();
  }, []);

  return userOrgs;
};

export const useUserRewards = () => {
  const [userRewards, setUserRewards] = useState([]);
  useEffect(() => {
    const getUserRewards = async () => {
      const userToken = await AsyncStorage.getItem("userToken");
      try {
        const res = await fetch(`${API_PATH}/user/reward`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": userToken,
          },
        });
        if (!res.ok) {
          throw Error("Response to get a user's rewards has bad error code.");
        }
        const json = await res.json();
        setUserRewards(json.rewards);
      } catch (err) {
        console.log(err.message);
      }
    };
    getUserRewards();
  }, []);

  return userRewards;
};
