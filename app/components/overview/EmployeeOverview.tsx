"use client";

import { Skeleton } from "@/components/ui/skeleton";
import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { LucideArrowUpRight, LucideUsers } from "lucide-react";

const EmployeeOverview = () => {
  //Get overview of employees
  const { data: overview, isLoading } = useQuery({
    queryKey: ["overview", "employee-view"],
    queryFn: async () => {
      const res = await axiosInstance.get("/dashboard/overview");
      return res.data.employees;
    },
  });

  if (isLoading) {
    return <Skeleton className="w-full h-full" />;
  }

  return (
    <div className="w-full h-full p-4 flex flex-col justify-between">
      <div className="flex w-full items-center gap-2">
        <div className="size-[32px] bg-pry rounded-full grid place-items-center">
          <LucideUsers className="size-4 text-white" />
        </div>
        <p className="font-medium">Employees</p>
      </div>

      <div>
        <h1 className="text-[60px] text-gray-900 font-[450] leading-[1.2]">
          {overview?.number}
        </h1>

        <div className="flex justify-between">
          <p className="text-gray-700 text-sm">Employees count</p>

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

export default EmployeeOverview;
