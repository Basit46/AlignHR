import {
  LucideArrowDownRight,
  LucideArrowUpRight,
  LucideCalendarCheck2,
} from "lucide-react";
import React from "react";

const AttendanceOverview = () => {
  return (
    <div className="w-full h-full p-4 flex flex-col justify-between">
      <div className="flex w-full items-center gap-2">
        <div className="size-[32px] bg-pry rounded-full grid place-items-center">
          <LucideCalendarCheck2 className="size-4 text-white" />
        </div>
        <p className="font-medium">Attendance</p>
      </div>

      <div>
        <h1 className="text-[60px] text-gray-900 font-[450] leading-[1.2]">
          24<span className="text-base text-gray-600">/28</span>
        </h1>

        <div className="flex justify-between">
          <p className="text-gray-700 text-sm">Staff attendance today</p>

          <div className="flex gap-1 items-center text-error">
            <p className="text-xs">-10%</p>
            <div className="size-6 bg-error rounded-full grid place-items-center">
              <LucideArrowDownRight className="text-white size-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceOverview;
