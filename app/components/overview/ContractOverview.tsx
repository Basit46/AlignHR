"use client";

import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Fulltime", value: 70, fill: "var(--pry)" },
  { name: "Intern", value: 20, fill: "var(--success)" },
  { name: "Contract", value: 10, fill: "var(--sec)" },
];

const ContractOverview = () => {
  return (
    <div className="w-full h-full p-4 flex flex-col justify-between gap-4">
      <div>
        <h1 className="text-[20px] font-medium leading-[1.2]">
          Contract overview
        </h1>
        <p className="text-gray-600 text-sm">Monitor employment types</p>
      </div>

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

      <div className="flex justify-between items-center">
        <div className="flex gap-1 items-center">
          <div className="size-3 rounded-full bg-pry" />
          <p className="text-xs text-gray-700">Fulltime (70%)</p>
        </div>

        <div className="flex gap-1 items-center">
          <div className="size-3 rounded-full bg-sec" />
          <p className="text-xs text-gray-700">Contract (10%)</p>
        </div>

        <div className="flex gap-1 items-center">
          <div className="size-3 rounded-full bg-success" />
          <p className="text-xs text-gray-700">Intern (20%)</p>
        </div>
      </div>
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
            {data.name} - {data.value}%
          </p>
        </div>
      </div>
    );
  }
  return null;
};
