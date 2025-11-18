"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { months } from "@/constants";
import { useEffect, useMemo, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";

const AttendanceChart = () => {
  const [mounted, setMounted] = useState(false);
  const [month, setMonth] = useState("january");
  const [daysInMonth, setDaysInMonth] = useState(31);

  //GET Employees attendance record
  const { data = [] } = useQuery({
    queryKey: ["attendance"],
    queryFn: async () => {
      const res = await axiosInstance.get("/attendance");
      const record = res.data.attendanceRecords
        ? res.data.attendanceRecords.map((r: any) => ({
            value: r?.value,
            date: new Date(r?.date),
            level: r.value > 70 ? 3 : r.value > 60 ? 2 : 1,
          }))
        : [];

      return record;
    },
  });

  useEffect(() => {
    setMounted(true);

    // Set current month
    const currentMonth = new Date()
      .toLocaleString("default", { month: "long" })
      .toLowerCase();
    setMonth(currentMonth);
  }, []);

  // Function to get number of days in a month
  const getDaysInMonth = (month: string, year: number) => {
    const monthIndex = new Date(`${month} 1, ${year}`).getMonth();
    return new Date(year, monthIndex + 1, 0).getDate();
  };

  // To Update days when month changes
  useEffect(() => {
    const year = new Date().getFullYear();
    const days = getDaysInMonth(month, year);
    setDaysInMonth(days);
  }, [month]);

  // To Generate days and weekdays
  const days = useMemo(() => {
    const year = new Date().getFullYear();
    const monthIndex = new Date(`${month} 1, ${year}`).getMonth();

    return Array.from({ length: daysInMonth }, (_, i) => {
      const date = new Date(year, monthIndex, i + 1);
      const weekday = date.toLocaleString("default", { weekday: "long" });
      return { day: i + 1, weekday };
    });
  }, [daysInMonth, month]);

  if (!mounted) return null; // Avoid server/client mismatch

  const notificationColors = ["!bg-pry/30", "!bg-pry/60", "!bg-pry"];

  return (
    <div className="w-full h-full p-4 flex flex-col justify-between gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 justify-between">
        <div>
          <h1 className="text-[20px] font-medium leading-[1.2]">
            Attendance chart
          </h1>

          <div className="flex gap-2 items-center flex-wrap">
            {/* <div className="flex gap-1 items-center">
              <div className="size-3 rounded-[2px] bg-gray-300" />
              <p className="text-[10px] text-gray-800">No work day</p>
            </div> */}

            <div className="flex gap-1 items-center">
              <div className="size-3 rounded-[2px] bg-pry/30" />
              <p className="text-[10px] text-gray-800">0% to 30%</p>
            </div>

            <div className="flex gap-1 items-center">
              <div className="size-3 rounded-[2px] bg-pry/60" />
              <p className="text-[10px] text-gray-800">31% to 70%</p>
            </div>

            <div className="flex gap-1 items-center">
              <div className="size-3 rounded-[2px] bg-pry" />
              <p className="text-[10px] text-gray-800">70% to 100%</p>
            </div>
          </div>
        </div>

        <Select value={month} onValueChange={setMonth}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((m) => (
              <SelectItem key={m.value} value={m.value}>
                {m.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 w-full">
        <div className="h-fit w-full grid grid-cols-7 gap-2">
          {days.map(({ day, weekday }) => {
            const year = new Date().getFullYear();
            const monthIndex = new Date(`${month} 1, ${year}`).getMonth();
            const dateObj = new Date(year, monthIndex, day);

            // Format current grid date to compare with DB record dates
            const formatted = dateObj.toISOString().split("T")[0];

            // Find attendance record for this day
            const record = data.find(
              (r: any) => r.date?.toISOString().split("T")[0] === formatted
            );

            // Determine level
            const level = record ? record.level - 1 : null;

            // Determine color
            const colorClass =
              level !== null ? notificationColors[level] : "bg-gray-300"; // default for no record

            return (
              <Tooltip key={day}>
                <TooltipTrigger asChild>
                  <div
                    className={`${colorClass} w-full h-[36px] sm:h-[48px] rounded-[8px]`}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">
                    <span className="capitalize">{weekday}</span>,{" "}
                    <span className="capitalize">{month}</span> {day}
                    {record && (
                      <>
                        <br />
                        Attendance: {record.value.toFixed(1)}%
                      </>
                    )}
                  </p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AttendanceChart;
