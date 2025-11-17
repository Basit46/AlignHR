"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { departments } from "@/constants";

const Workforce = () => {
  const [filter, setFilter] = useState("members");
  const [data, setData] = useState([]);

  const { data: wf } = useQuery({
    queryKey: ["workforce"],
    queryFn: async () => {
      const res = await axiosInstance.get("/workforce");
      return res.data;
    },
  });

  useEffect(() => {
    if (!wf) return;

    const selected = filter === "pay" ? wf.payData : wf.membersData;

    setData(selected);
  }, [filter, wf]);

  return (
    <div className="w-full h-full p-4 flex flex-col justify-between gap-3">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[20px] font-medium">Understand your workforce</h1>
          <p className="text-gray-600 text-sm">
            {filter === "members"
              ? "Team members by department"
              : "Total payroll by department"}
          </p>
        </div>

        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="members">Members</SelectItem>
            <SelectItem value="pay">Total Payment</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 overflow-x-scroll">
        <div className="h-full w-full flex gap-3 items-end">
          {data?.map((dept: any, i: number) => (
            <div
              key={i}
              className="relative flex-1 h-full flex flex-col gap-2 items-center"
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex-1 w-[40px] md:w-[60px] rounded-[28px] bg-gray-200 relative overflow-hidden group">
                    <div
                      style={{ height: `${dept.percentage}%` }}
                      className="absolute left-0 bottom-0 w-full bg-gray-900 group-hover:bg-pry transition-all duration-500 ease-out"
                    />
                  </div>
                </TooltipTrigger>

                <TooltipContent>
                  <p className="text-sm">
                    {departments.find((d) => d.value == dept.name)?.label} –{" "}
                    {filter === "pay"
                      ? `₦${dept.value.toLocaleString()}`
                      : `${dept.value} member${dept.value > 1 ? "s" : ""}`}
                  </p>
                </TooltipContent>
              </Tooltip>

              <p className="hidden md:inline absolute bottom-[30px] rotate-[-90deg] md:rotate-0 md:static text-xs font-medium text-gray-700 whitespace-nowrap md:whitespace-normal text-left md:text-center capitalize">
                {dept.name.length > 7
                  ? dept.name.slice(0, 7).trim() + "..."
                  : dept.name}
              </p>
              <p className="md:hidden absolute bottom-[60px] rotate-[-90deg] text-xs font-medium text-gray-700 whitespace-nowrap text-left capitalize">
                {dept.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Workforce;
