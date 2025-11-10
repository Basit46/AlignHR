"use client";

import React from "react";
import AddEmployee from "./components/modals/AddEmployee";
import UpdatePayroll from "./components/modals/UpdatePayroll";
import EmployeeOverview from "./components/overview/EmployeeOverview";
import PayrollOverview from "./components/overview/PayrollOverview";
import LeaveOverview from "./components/overview/LeaveOverview";
import AttendanceOverview from "./components/overview/AttendanceOverview";
import Workforce from "./components/overview/Workforce";
import AttendanceChart from "./components/overview/AttendanceChart";
import ContractOverview from "./components/overview/ContractOverview";
import AIinsight from "./components/overview/AIinsight";
import { useUser } from "@/lib/hooks/useUser";

const Overview = () => {
  const { fullName } = useUser();

  return (
    <div className="w-full px-[var(--main-px)] py-[20px]">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-[40px] leading-[1.2] font-medium text-gray-900">
            Hello{fullName ? `, ${fullName}` : ""}
          </h1>
          <p className="text-gray-600">
            Ready to streamline your HR tasks and boost productivity?
          </p>
        </div>

        <div className="flex items-center gap-2">
          <AddEmployee />
          <UpdatePayroll />
        </div>
      </div>

      <div className="mt-[20px] h-fit grid grid-cols-4 gap-4">
        <div className="col-span-1 row-span-1 h-[170px] bg-white rounded-[12px]">
          <EmployeeOverview />
        </div>
        <div className="col-span-1 row-span-1 h-[170px] bg-white rounded-[12px]">
          <PayrollOverview />
        </div>
        <div className="col-span-1 row-span-2 h-[calc(170px*2+16px)] bg-white rounded-[12px]">
          <ContractOverview />
        </div>
        <div className="col-span-1 row-span-2 h-[calc(170px*2+16px)] bg-white rounded-[12px]">
          <AIinsight />
        </div>
        <div className="col-span-1 row-span-1 h-[170px] bg-white rounded-[12px]">
          <LeaveOverview />
        </div>
        <div className="col-span-1 row-span-1 h-[170px] bg-white rounded-[12px]">
          <AttendanceOverview />
        </div>
        <div className="col-span-2 row-span-1 h-[calc(170px*2+16px)] bg-white rounded-[12px]">
          <Workforce />
        </div>
        <div className="col-span-2 row-span-1 h-[calc(170px*2+16px)] bg-white rounded-[12px]">
          <AttendanceChart />
        </div>
      </div>
    </div>
  );
};

export default Overview;
