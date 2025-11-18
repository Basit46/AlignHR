"use client";

import React from "react";
import EmployeeOverview from "./components/overview/EmployeeOverview";
import PayrollOverview from "./components/overview/PayrollOverview";
import LeaveOverview from "./components/overview/LeaveOverview";
import AttendanceOverview from "./components/overview/AttendanceOverview";
import Workforce from "./components/overview/Workforce";
import AttendanceChart from "./components/overview/AttendanceChart";
import ContractOverview from "./components/overview/ContractOverview";
import AIinsight from "./components/overview/AIinsight";
import { useUser } from "@/lib/hooks/useUser";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useGlobalStore } from "@/store/globalStore";

const Overview = () => {
  const router = useRouter();
  const { fullName } = useUser();
  const { setIsAddEmployeeOpen } = useGlobalStore();

  return (
    <div className="w-full px-[var(--main-px)] py-[20px]">
      <div className="flex flex-col md:flex-row gap-3 md:gap-0 justify-between md:items-end">
        <div>
          <h1 className="text-[32px] vsm:text-[40px] leading-[1.2] font-medium text-gray-900">
            Hello{fullName ? `, ${fullName}` : ""}
          </h1>
          <p className="text-gray-600 text-sm">
            Ready to streamline your HR tasks and boost productivity?
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={"outline"}
            onClick={() => setIsAddEmployeeOpen(true)}
          >
            Add Employee
          </Button>

          <Button onClick={() => router.push("/payroll")} variant={"outline"}>
            Update Payroll
          </Button>
        </div>
      </div>

      <div className="mt-[20px] h-fit grid grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="col-span-2 sm:col-span-1 row-span-1 h-[170px] bg-white rounded-[12px]">
          <EmployeeOverview />
        </div>
        <div className="col-span-2 sm:col-span-1 row-span-1 h-[170px] bg-white rounded-[12px]">
          <PayrollOverview />
        </div>
        <div className="col-span-2 md:col-span-1 row-span-2 h-[calc(170px*2+16px)] bg-white rounded-[12px]">
          <ContractOverview />
        </div>
        <div className="col-span-2 md:col-span-1 row-span-2 h-[calc(170px*2+16px)] bg-white rounded-[12px]">
          <AIinsight />
        </div>
        <div className="row-start-3 sm:row-start-2 xl:row-start-auto col-span-2 sm:col-span-1 row-span-1 h-[170px] bg-white rounded-[12px]">
          <LeaveOverview />
        </div>
        <div className="row-start-4 sm:row-start-2 xl:row-start-auto col-span-2 sm:col-span-1 row-span-1 h-[170px] bg-white rounded-[12px]">
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
