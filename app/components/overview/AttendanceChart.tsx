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

const AttendanceChart = () => {
  const [month, setMonth] = useState("january");
  const [daysInMonth, setDaysInMonth] = useState(31);

  // Set current month on mount
  useEffect(() => {
    const currentMonth = new Date()
      .toLocaleString("default", { month: "long" })
      .toLowerCase();
    setMonth(currentMonth);
  }, []);

  // Function to get number of days in month (with leap year handling)
  const getDaysInMonth = (month: string, year: number) => {
    const monthIndex = new Date(`${month} 1, ${year}`).getMonth();
    return new Date(year, monthIndex + 1, 0).getDate();
  };

  // Update days when month changes
  useEffect(() => {
    const year = new Date().getFullYear();
    setDaysInMonth(getDaysInMonth(month, year));
  }, [month]);

  // Generate days and weekdays
  const days = useMemo(() => {
    const year = new Date().getFullYear();
    const monthIndex = new Date(`${month} 1, ${year}`).getMonth();

    return Array.from({ length: daysInMonth }, (_, i) => {
      const date = new Date(year, monthIndex, i + 1);
      const weekday = date.toLocaleString("default", { weekday: "long" });
      return { day: i + 1, weekday };
    });
  }, [daysInMonth, month]);

  return (
    <div className="w-full h-full p-4 flex flex-col justify-between gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[20px] font-medium leading-[1.2]">
            Attendance chart
          </h1>

          <div className="flex gap-2 items-center flex-wrap">
            <div className="flex gap-1 items-center">
              <div className="size-3 rounded-[2px] bg-gray-300" />
              <p className="text-[10px] text-gray-800">No work day</p>
            </div>

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

      {/* Attendance grid */}
      <div className="flex-1 w-full">
        <div className="h-fit w-full grid grid-cols-7 gap-2">
          {days.map(({ day, weekday }) => {
            const randomNo = Math.floor(Math.random() * 4);

            return (
              <Tooltip key={day}>
                <TooltipTrigger asChild>
                  <div
                    className={` 
                      ${randomNo == 0 ? "bg-gray-300" : ""} 
                      ${randomNo == 1 ? "bg-pry/30" : ""} 
                      ${randomNo == 2 ? "bg-pry/60" : ""} 
                      ${randomNo == 3 ? "bg-pry" : ""} 
                      w-full h-[48px] rounded-[8px]`}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">
                    <span className="capitalize">{weekday}</span>,{" "}
                    <span className="capitalize">{month}</span> {day}
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
