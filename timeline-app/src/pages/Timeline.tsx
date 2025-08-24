import { useState } from "react";
import TimelineCard from "./components/TimelineCard";
import EventForm from "./components/EventForm";

function Timeline() {
  const [events, setEvents] = useState([]);

  const addEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Your Timeline</h2>
      <EventForm onAddEvent={addEvent} />
      <div>
        {events.map((event, index) => (
          <TimelineCard key={index} event={event} />
        ))}
      </div>
    </div>
  );
}

export default Timeline;
