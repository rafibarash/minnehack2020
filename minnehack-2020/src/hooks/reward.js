import { useState, useEffect } from "react";
import { API_PATH } from "../api";

export const useLocalRewards = () => {
  const [rewards, setRewards] = useState([]);
  useEffect(() => {
    const getRewards = async () => {
      try {
        const res = await fetch(`${API_PATH}/reward`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          throw Error("Response to get all local rewards has bad error code.");
        }
        const json = await res.json();
        setRewards(json.rewards);
      } catch (err) {
        console.log(err.message);
      }
    };
    getRewards();
  }, []);

  return rewards;
};
