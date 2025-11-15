"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { EmployeeType } from "@/types";
import PersonalInformation from "@/app/components/PersonalInformation";
import PayrollInformation from "@/app/components/PayrollInformation";

const EmployeeDetails = () => {
  const { id } = useParams();

  const { data: employee = {} } = useQuery<EmployeeType>({
    queryKey: ["employees", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/employees/${id}`);
      return res.data.employee;
    },
  });

  return (
    <div className="h-fit w-full flex flex-col gap-4">
      <PersonalInformation employee={employee} />
      <PayrollInformation employee={employee} />

      <div className="w-full rounded-md border border-gray-300">
        <div className="flex items-center justify-between p-3 border-b border-b-gray-300">
          <p className="font-medium text-[18px]">Attendance</p>
        </div>
        <div className="p-3">
          <Label className="text-gray-600">Present</Label>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
