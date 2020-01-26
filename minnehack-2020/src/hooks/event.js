import { useState, useEffect } from "react";
import { API_PATH } from "../api";

export const useEvents = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const getEvents = async () => {
      try {
        const res = await fetch(`${API_PATH}/event`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          throw Error("Response to get all events has bad error code.");
        }
        const json = await res.json();
        setEvents(json.events);
      } catch (err) {
        console.log(err.message);
      }
    };
    getEvents();
  }, []);

  return { events, setEvents };
};
