"Use client";

import axiosInstance from "@/lib/axiosInstance";
import { formatAmount } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { LucideArrowUpRight, LucideWalletCards } from "lucide-react";
import React from "react";

const PayrollOverview = () => {
  //Get overview of employees
  const { data: overview } = useQuery({
    queryKey: ["overview", "payroll-view"],
    queryFn: async () => {
      const res = await axiosInstance.get("/dashboard/overview");
      return res.data.payroll;
    },
  });

  return (
    <div className="w-full h-full p-4 flex flex-col justify-between">
      <div className="flex w-full items-center gap-2">
        <div className="size-[32px] bg-pry rounded-full grid place-items-center">
          <LucideWalletCards className="size-4 text-white" />
        </div>
        <p className="font-medium">Payroll Processed</p>
      </div>

      <div>
        <h1 className="text-[60px] text-gray-900 font-[450] leading-[1.2]">
          ₦{formatAmount(overview?.number || 0)}
        </h1>

        <div className="flex justify-between">
          <p className="text-gray-700 text-sm">Salary Transactions</p>

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

export default PayrollOverview;
