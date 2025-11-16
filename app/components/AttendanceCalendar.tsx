"use client";

import React from "react";
import { Calendar, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { localizer } from "@/lib/calendarLocalizer";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";

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
  //GET Employees attendance record
  const { data = [] } = useQuery({
    queryKey: ["attendance"],
    queryFn: async () => {
      const res = await axiosInstance.get("/attendance");
      const record = res.data.attendanceRecords
        ? res.data.attendanceRecords.map((r: any) => ({
            title: `${r?.value || 0}% attendance`,
            start: new Date(r?.date),
            end: new Date(r?.date),
            level: r.value > 70 ? "high" : r.value > 60 ? "medium" : "low",
          }))
        : [];

      return record;
    },
  });

  const dayPropGetter = (date: Date) => {
    const hasEvent = data?.find(
      (event: any) => event.start?.toDateString() === date?.toDateString()
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

  return (
    <div className="w-full h-[700px] bg-white rounded-xl p-4">
      <Calendar
        localizer={localizer}
        events={data}
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
