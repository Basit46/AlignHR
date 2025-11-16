"use client";

import { Skeleton } from "@/components/ui/skeleton";
import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { LucideArrowUpRight, LucideCalendarCheck2 } from "lucide-react";
import React from "react";

const AttendanceOverview = () => {
  //Get overview of attendance
  const { data, isLoading } = useQuery({
    queryKey: ["overview"],
    queryFn: async () => {
      const res = await axiosInstance.get("/dashboard/overview");
      return res.data;
    },
  });
  const overview = data?.attendance;

  if (isLoading) {
    return <Skeleton className="w-full h-full" />;
  }

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
          {overview?.number}
          <span className="text-base text-gray-600">/{overview?.all}</span>
        </h1>

        <div className="flex justify-between">
          <p className="text-gray-700 text-sm">Staff attendance today</p>

          <div
            className={`${
              overview?.trend == "up" ? "text-success" : "text-error"
            } flex gap-1 items-center`}
          >
            <p className="text-xs">{overview?.percentChange}%</p>
            <div
              className={`${
                overview?.trend == "up" ? "bg-success" : "bg-error"
              } size-6 rounded-full grid place-items-center`}
            >
              <LucideArrowUpRight
                className={`${
                  overview?.trend == "up" ? "" : "rotate-[180deg]"
                } text-white size-4`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceOverview;
