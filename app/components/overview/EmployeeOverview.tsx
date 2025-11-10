import { LucideArrowUpRight, LucideUsers } from "lucide-react";
import React from "react";

const EmployeeOverview = () => {
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
          920
        </h1>

        <div className="flex justify-between">
          <p className="text-gray-700 text-sm">Employees count</p>

          <div className="flex gap-1 items-center text-success">
            <p className="text-xs">+2.5%</p>
            <div className="size-6 bg-success rounded-full grid place-items-center">
              <LucideArrowUpRight className="text-white size-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeOverview;
