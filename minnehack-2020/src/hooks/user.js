import { useState, useEffect } from "react";
import { AsyncStorage } from "react-native";
import { API_PATH } from "../api";

export const useUser = () => {
  const [user, setUser] = useState(null);

  const isSubscriber = (field, id) => {
    if (!user) return false;
    for (let obj of user[field]) {
      if (obj._id == id) return true;
    }
    return false;
  };

  const subscribeToEvent = async (eventID, setEvents) => {
    const userToken = await AsyncStorage.getItem("userToken");
    try {
      const res = await fetch(`${API_PATH}/user/event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": userToken,
        },
        body: JSON.stringify({ eventID }),
      });
      if (!res.ok) {
        throw Error("Trouble subscribing to event");
      }
      const json = await res.json();
      setEvents(json.events);
    } catch (err) {
      console.log(err.message);
    }
  };

  const unsubscribeFromEvent = async (eventID, setEvents) => {
    const userToken = await AsyncStorage.getItem("userToken");
    try {
      const res = await fetch(`${API_PATH}/user/event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": userToken,
        },
        body: JSON.stringify({ eventID }),
      });
      if (!res.ok) {
        throw Error("Trouble unsubscribing from event");
      }
      const json = await res.json();
      setEvents(json.events);
    } catch (err) {
      console.log(err.message);
    }
  };

  // const purachaseReward = async (rewardID, setRewards) => {
  //   const userToken = await AsyncStorage.getItem("userToken");
  //   try {
  //     const res = await fetch(`${API_PATH}/user/reward`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "x-auth-token": userToken,
  //       },
  //       body: JSON.stringify({ rewardID }),
  //     });
  //     if (!res.ok) {
  //       throw Error("Trouble unsubscribing from event");
  //     }
  //     const json = await res.json();
  //     setRewards(json.rewards);
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  useEffect(() => {
    const getUser = async () => {
      const userToken = await AsyncStorage.getItem("userToken");
      try {
        const res = await fetch(`${API_PATH}/auth`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": userToken,
          },
        });
        if (!res.ok) {
          throw Error("Response to get a users events has bad error code.");
        }
        const user = await res.json();
        setUser(user);
      } catch (err) {
        console.log(err.message);
      }
    };
    getUser();
  });

  return {
    user,
    setUser,
    isSubscriber,
    subscribeToEvent,
    unsubscribeFromEvent,
    // purachaseReward,
  };
};

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

  return { userEvents, setUserEvents };
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
