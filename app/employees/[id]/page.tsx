"use client";

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
    </div>
  );
};

export default EmployeeDetails;
