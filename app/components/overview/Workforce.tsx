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

// === DATASETS ===
const membersData = [
  { name: "Engineering", percentage: 28, value: 56 },
  { name: "Human Resources", percentage: 12, value: 24 },
  { name: "Finance", percentage: 10, value: 20 },
  { name: "Marketing", percentage: 14, value: 28 },
  { name: "Sales", percentage: 16, value: 32 },
  { name: "Operations", percentage: 9, value: 18 },
  { name: "Customer Support", percentage: 6, value: 12 },
  { name: "Others", percentage: 5, value: 10 },
];

const payData = [
  { name: "Engineering", percentage: 35, value: 4200000 },
  { name: "Human Resources", percentage: 10, value: 1200000 },
  { name: "Finance", percentage: 12, value: 1500000 },
  { name: "Marketing", percentage: 13, value: 1600000 },
  { name: "Sales", percentage: 14, value: 1700000 },
  { name: "Operations", percentage: 8, value: 950000 },
  { name: "Customer Support", percentage: 5, value: 600000 },
  { name: "Others", percentage: 3, value: 350000 },
];

const leavesData = [
  { name: "Engineering", percentage: 25, value: 14 },
  { name: "Human Resources", percentage: 10, value: 6 },
  { name: "Finance", percentage: 8, value: 4 },
  { name: "Marketing", percentage: 12, value: 7 },
  { name: "Sales", percentage: 15, value: 8 },
  { name: "Operations", percentage: 10, value: 5 },
  { name: "Customer Support", percentage: 12, value: 7 },
  { name: "Others", percentage: 8, value: 4 },
];

const Workforce = () => {
  const [filter, setFilter] = useState("members");
  const [data, setData] = useState(membersData);
  const [animatedHeights, setAnimatedHeights] = useState(
    membersData.map(() => 0)
  );

  // Update data when filter changes
  useEffect(() => {
    const selectedData =
      filter === "pay"
        ? payData
        : filter === "leaves"
        ? leavesData
        : membersData;
    setData(selectedData);

    const timeout = setTimeout(() => {
      setAnimatedHeights(selectedData.map((d) => d.percentage));
    }, 100);

    return () => clearTimeout(timeout);
  }, [filter]);

  return (
    <div className="w-full h-full p-4 flex flex-col justify-between gap-3">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[20px] font-medium leading-[1.2]">
            Understand your workforce
          </h1>
          <p className="text-gray-600 text-sm">
            {filter === "members"
              ? "Team members by department"
              : filter === "pay"
              ? "Total payroll by department"
              : "Leaves taken by department"}
          </p>
        </div>

        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="members">Members</SelectItem>
            <SelectItem value="pay">Total payment</SelectItem>
            <SelectItem value="leaves">Leaves</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 w-full flex gap-3 items-end">
        {data.map((dept, i) => (
          <div
            key={i}
            className="flex-1 h-full flex flex-col gap-2 items-center"
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex-1 w-[60px] rounded-[28px] bg-gray-200 relative overflow-hidden group">
                  <div
                    style={{ height: `${animatedHeights[i]}%` }}
                    className="absolute left-0 bottom-0 w-full bg-gray-900 group-hover:bg-pry transition-all duration-700 ease-out"
                  />
                </div>
              </TooltipTrigger>

              <TooltipContent>
                <p className="text-sm">
                  {dept.name} –{" "}
                  {filter === "pay"
                    ? `₦${dept.value.toLocaleString()}`
                    : filter === "members"
                    ? `${dept.value} members`
                    : `${dept.value} leaves`}
                </p>
              </TooltipContent>
            </Tooltip>

            <p className="text-xs font-medium text-gray-700 text-center">
              {dept.name.length > 7
                ? dept.name.slice(0, 7).trim() + "..."
                : dept.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workforce;
