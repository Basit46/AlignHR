"use client";

import { Skeleton } from "@/components/ui/skeleton";
import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const ContractOverview = () => {
  //Get contract types of employees
  const { data = [], isLoading } = useQuery({
    queryKey: ["overview", "contractChart"],
    queryFn: async () => {
      const res = await axiosInstance.get("/dashboard/contract-chart");
      return res.data.chart;
    },
  });

  const hasNoData = data.every((i: any) => i.value === 0);

  if (isLoading) {
    return <Skeleton className="w-full h-full" />;
  }

  return (
    <div className="w-full h-full p-4 flex flex-col justify-between gap-4">
      <div>
        <h1 className="text-[20px] font-medium leading-[1.2]">
          Contract overview
        </h1>
        <p className="text-gray-600 text-sm">Monitor employment types</p>
      </div>

      {!hasNoData ? (
        <>
          <div className="flex-1 w-full">
            <ResponsiveContainer width={"100%"} height={"100%"}>
              <PieChart>
                <Pie
                  data={data}
                  innerRadius="70%"
                  outerRadius="100%"
                  cornerRadius="50%"
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                />
                <Tooltip content={<CustomTooltip />} cursor={false} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-center gap-4 items-center">
            <div className="flex gap-1 items-center">
              <div className="size-2.5 rounded-full bg-pry" />
              <p className="text-xs text-gray-700">Permanent</p>
            </div>

            <div className="flex gap-1 items-center">
              <div className="size-2.5 rounded-full bg-sec" />
              <p className="text-xs text-gray-700">Contract</p>
            </div>

            <div className="flex gap-1 items-center">
              <div className="size-2.5 rounded-full bg-success" />
              <p className="text-xs text-gray-700">Intern</p>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 w-full bg-gray-200 rounded-[12px] flex flex-col items-center gap-2 justify-center p-4">
          <h1 className="text-sm font-semibold text-center text-gray-800">
            No Employees Yet
          </h1>
          <p className="text-xs text-center text-gray-600">
            You don't have any employees added yet. <br />
            Once you do, their data will appear here.
          </p>
        </div>
      )}
    </div>
  );
};

export default ContractOverview;

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <div className="bg-white p-2 border border-gray-200 shadow-sm rounded">
        <div className="flex items-center gap-[8px]">
          <span style={{ color: data.fill }}>•</span>
          <p className="text-[14px] font-medium text-gray-800">
            {data.name} - {data.value} employee{data.value > 1 && "s"}
          </p>
        </div>
      </div>
    );
  }
  return null;
};
