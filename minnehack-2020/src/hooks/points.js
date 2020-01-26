import { useState, useEffect } from "react";
import { AsyncStorage } from "react-native";
import { API_PATH } from "../api";

export const usePoints = () => {
  const [points, setPoints] = useState(null);
  const [isInLocation, setIsInLocation] = useState(true);

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
  }, []);

  useEffect(() => {
    setInterval(() => {
      setPoints(prevPoints => prevPoints + 1);
    }, 1000);
  }, [isInLocation]);

  return points;
};
