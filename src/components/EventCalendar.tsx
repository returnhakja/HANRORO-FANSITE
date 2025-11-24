// src/components/EventCalendar.tsx
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/calendar.css";
import Modal from "react-modal";
import styled from "styled-components";
import { Events } from "../data/CalendarData";

const EventCalendar = () => {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  return (
    <div>
      <Calendar
        tileClassName={({ date }) =>
          Events.some((e) => e.date.toDateString() === date.toDateString())
            ? "highlight has-event"
            : "no-event"
        }
        onClickDay={(value) => {
          const event = Events.find(
            (e) => e.date.toDateString() === value.toDateString()
          );
          if (event) setSelectedEvent(event);
        }}
      />

      <Modal
        isOpen={!!selectedEvent}
        onRequestClose={() => setSelectedEvent(null)}
        contentLabel="Event Details"
        style={{
          content: {
            width: "500px",
            height: "900px",
            margin: "auto",
            borderRadius: "12px",
            padding: "1.5rem",
          },
          overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
          },
        }}
      >
        <CloseButton onClick={() => setSelectedEvent(null)}>×</CloseButton>

        {selectedEvent && (
          <div>
            <h2>{selectedEvent.title}</h2>
            <p>{selectedEvent.time}</p>
            {selectedEvent.place}
            <img
              src={selectedEvent.poster}
              alt={selectedEvent.title}
              style={{ width: "100%", borderRadius: "8px" }}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default EventCalendar;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: transparent;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;

  &:hover {
    color: #ff0000;
  }
`;
