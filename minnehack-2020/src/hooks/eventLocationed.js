import { useState, useEffect } from "react";
import { API_PATH } from "../api";

export const useEventLocationed = (lat, long) => {
  const [events, setEvents] = useState([]);
  console.log(lat, long);
  useEffect(() => {
    const getEvents = async () => {
      try {
        const res = await fetch(`${API_PATH}/event/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          throw Error("Response to get a users events has bad error code.");
        }
        const json = await res.json();
        const events = json.events.filter ((item) => item.location.coordinates[0] > item.location.coordinates[0]-.0002 && item.location.coordinates < item.location.coordinates[0]+.0002 && item.location.coordinates[1] > item.location.coordinates[1]-0.002 && item.location.coordinates[1] < item.location.coordinates[1]+0.002);
        setEvents(events);
      } catch (err) {
        console.log(err.message);
      }
    };
    getEvents();
  }, []);



  return events;
};
