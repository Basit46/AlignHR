"use client";

import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axiosInstance";
import { EmployeeType } from "@/types";
import { calculateAge, formatDateWithSuffix } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { LucideChevronLeft, LucideFile } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const EmployeeDetailsLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { id } = useParams();

  const { data: employee = {} } = useQuery<EmployeeType>({
    queryKey: ["employees", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/employees/${id}`);
      return res.data.employee;
    },
  });

  return (
    <div className="w-full h-ft px-[var(--main-px)] py-[20px] flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            onClick={() => router.back()}
            variant={"outline"}
            className="bg-transparent rounded-full size-[40px]"
          >
            <LucideChevronLeft className="size-[28px]" />
          </Button>
          <div>
            <h1 className="font-medium text-[24px] leading-[1.3]">
              Employee Details
            </h1>
            <p className="text-gray-700">
              View full employee information, track activity, and manage their
              details
            </p>
          </div>
        </div>
      </div>

      <div className="h-[90vh] w-full flex gap-6">
        <div className="relative w-[300px] h-full bg-white rounded-[12px] overflow-hidden">
          <div className="relative w-full h-[150px] bg-pry">
            <Image
              src="/bg.jpg"
              fill
              className="object-cover"
              alt="Background"
            />
          </div>

          <div className="relative px-4 ">
            <div className="relative size-[120px] mt-[-60px] bg-pry rounded-full border-[3px] border-[white] overflow-hidden">
              <Image
                src="/employee.png"
                fill
                className="object-cover"
                alt="Employee"
              />
            </div>
            <div className="mt-1 flex items-center gap-1">
              <h1 className="text-[20px] font-gray-900 font-medium leading-[1.2] capitalize">
                {employee?.name}
              </h1>
            </div>
            <p className="text-sm text-gray-800">{employee?.role}</p>

            <div className="mt-[20px] w-full flex flex-col gap-2">
              <DetailsView title="Email" value={employee?.email} />
              <DetailsView title="Phone number" value={employee?.phoneNum} />
              <DetailsView
                title="Age"
                value={calculateAge(employee?.dateOfBirth)}
              />
              <DetailsView
                title="Nationality"
                capitalize
                value={employee?.nationality}
              />
              <DetailsView title="Address" value={employee?.address} />
              <DetailsView title="Gender" capitalize value={employee?.gender} />
              <DetailsView
                title="Contract type"
                capitalize
                value={employee?.contractType}
              />
              <DetailsView title="Tax ID" value="7067668092" />
              <DetailsView
                title="Date Joined"
                value={formatDateWithSuffix(employee.dateJoined)}
              />
            </div>

            <Button className="absolute top-[70px] right-[20px]">
              <LucideFile /> Export
            </Button>
          </div>
        </div>

        <div className="flex-1 h-full bg-white rounded-[12px] p-4 flex flex-col gap-4 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailsLayout;

const DetailsView = ({
  title,
  value,
  capitalize,
}: {
  title: string;
  value?: string | number;
  capitalize?: boolean;
}) => {
  return (
    <div>
      <p className="text-xs text-gray-600">{title}</p>
      <p
        className={`${
          capitalize ? "capitalize" : ""
        } font-medium text-sm leading-[1.2]`}
      >
        {value || "-"}
      </p>
    </div>
  );
};
