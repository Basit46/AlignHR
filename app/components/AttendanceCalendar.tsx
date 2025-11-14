"use client";

import React from "react";
import { Calendar, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { localizer } from "@/lib/calendarLocalizer";

const attendanceEvents = [
  {
    title: "0% attendance",
    start: new Date(2025, 10, 1),
    end: new Date(2025, 10, 1),
    level: "non-work",
  },
  {
    title: "0% attendance",
    start: new Date(2025, 10, 2),
    end: new Date(2025, 10, 2),
    level: "non-work",
  },
  {
    title: "52% attendance",
    start: new Date(2025, 10, 3),
    end: new Date(2025, 10, 3),
    level: "medium",
  },
  {
    title: "30% attendance",
    start: new Date(2025, 10, 4),
    end: new Date(2025, 10, 4),
    level: "low",
  },
  {
    title: "85% attendance",
    start: new Date(2025, 10, 5),
    end: new Date(2025, 10, 5),
    level: "high",
  },
  {
    title: "47% attendance",
    start: new Date(2025, 10, 6),
    end: new Date(2025, 10, 6),
    level: "low",
  },
  {
    title: "90% attendance",
    start: new Date(2025, 10, 7),
    end: new Date(2025, 10, 7),
    level: "high",
  },
  {
    title: "0% attendance",
    start: new Date(2025, 10, 8),
    end: new Date(2025, 10, 8),
    level: "non-work",
  },
  {
    title: "0% attendance",
    start: new Date(2025, 10, 9),
    end: new Date(2025, 10, 9),
    level: "non-work",
  },
  {
    title: "90% attendance",
    start: new Date(2025, 10, 10),
    end: new Date(2025, 10, 10),
    level: "high",
  },
  {
    title: "90% attendance",
    start: new Date(2025, 10, 11),
    end: new Date(2025, 10, 11),
    level: "high",
  },
];

const eventPropGetter = (event: any) => {
  return {
    style: {
      backgroundColor: "transparent",
      borderRadius: "0px",
      border: "none",
      padding: "2px 6px",
      fontSize: "12px",
      marginTop: "2px",
    },
  };
};

const dayPropGetter = (date: Date) => {
  const hasEvent = attendanceEvents.find(
    (event) => event.start.toDateString() === date.toDateString()
  );

  if (hasEvent) {
    let backgroundColor;

    switch (hasEvent.level) {
      case "high":
        backgroundColor = "rgb(0 98 255 / 0.5)";

        break;
      case "medium":
        backgroundColor = "rgb(0 98 255 / 0.3)";

        break;
      case "low":
        backgroundColor = "rgb(0 98 255 / 0.1)";
        break;
      default:
        backgroundColor = "#ffffff";
    }

    return {
      style: {
        backgroundColor,
      },
    };
  }

  return {};
};

const CustomEvent = ({ event }: any) => (
  <div
    style={{
      fontSize: "12px",
      fontWeight: 500,
      color: "black",
    }}
  >
    {event.level == "non-work" ? "Non-work day" : event.title}
  </div>
);

const AttendanceCalendar = () => {
  return (
    <div className="w-full h-[700px] bg-white rounded-xl p-4">
      <Calendar
        localizer={localizer}
        events={attendanceEvents}
        startAccessor="start"
        endAccessor="end"
        views={[Views.MONTH]}
        defaultView={Views.MONTH}
        defaultDate={new Date()}
        eventPropGetter={eventPropGetter}
        dayPropGetter={dayPropGetter}
        components={{ event: CustomEvent }}
        toolbar={true}
        popup={false}
      />
    </div>
  );
};

export default AttendanceCalendar;
