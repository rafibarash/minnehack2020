import { useState, useEffect } from "react";
import { AsyncStorage } from "react-native";
import { API_PATH } from "../api";
import Radar from "react-native-radar";

export const usePoints = () => {
  const [points, setPoints] = useState(null);

  useEffect(() => {
    const getPoints = async () => {
      const userToken = await AsyncStorage.getItem("userToken");
      try {
        const res = await fetch(`${API_PATH}/user/points`, {
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
        setPoints(json.points);
      } catch (err) {
        console.log(err.message);
      }
    };
    getPoints();
  });

  useEffect(() => {
    const trackUser = async () => {
      // identify the user and request permissions
      Radar.setUserId(this.state.userId);
      Radar.requestPermissions(true);

      // track the user's location once in the foreground
      const result = await Radar.trackOnce();
      console.log(result);

      // start tracking the user's location in the background
      Radar.startTracking();
    };
    trackUser();
  });

  return points;
};

// receive events
Radar.on("events", result => {
  // do something with result.events, result.user
});

// receive location updates
Radar.on("location", result => {
  // do something with result.location, result.user
});

// receive errors
Radar.on("error", err => {
  // do something with err
});
