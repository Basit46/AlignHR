"use client";

import { Button } from "@/components/ui/button";
import { LucideCalendar, LucideListCheck } from "lucide-react";
import React, { useState } from "react";
import AttendanceCalendar from "../components/AttendanceCalendar";
import MarkAttendance from "../components/MarkAttendanceTable";

const Attendance = () => {
  const [viewMode, setViewMode] = useState<"calendar" | "table">("calendar");

  return (
    <div className="w-full px-[var(--main-px)] py-[20px]">
      <div className="flex flex-col md:flex-row gap-3 md:gap-0 justify-between md:items-center">
        <div>
          <h1 className="font-medium text-[24px] leading-[1.2]">Attendance</h1>
          <p className="text-gray-700">
            Monitor staff attendance, mark daily presence, and review attendance
            records
          </p>
        </div>

        {viewMode == "table" ? (
          <Button className="w-fit" onClick={() => setViewMode("calendar")}>
            <LucideCalendar />
            View Calendar
          </Button>
        ) : (
          <Button className="w-fit" onClick={() => setViewMode("table")}>
            <LucideListCheck />
            Mark attendance
          </Button>
        )}
      </div>

      <div className="mt-5">
        {viewMode == "table" ? <MarkAttendance /> : <AttendanceCalendar />}
      </div>
    </div>
  );
};

export default Attendance;
