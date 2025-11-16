"use client";

import { Skeleton } from "@/components/ui/skeleton";
import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import Markdown from "react-markdown";

const AIinsight = () => {
  //GET Employees
  const { data: employees = [] } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await axiosInstance.get("/employees");
      return res.data.employees;
    },
  });

  //Get AI summary
  const { data, isLoading } = useQuery({
    queryKey: ["summary"],
    queryFn: async () => {
      const res = await axiosInstance.get("/ai");
      return res.data.summary;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  if (isLoading) {
    return <Skeleton className="w-full h-full" />;
  }

  return (
    <div className="w-full h-full p-4 flex flex-col justify-between gap-3">
      <div>
        <h1 className="text-[20px] font-medium leading-[1.2]">AI Insight</h1>
        <p className="text-gray-600 text-sm">
          View summaries of workforce trends
        </p>
      </div>

      {employees.length > 0 ? (
        <div className="scrollbar-hide flex-1 w-full overflow-y-auto">
          <div className="h-fit w-full text-sm text-gray-700 space-y-1">
            <Markdown>{data}</Markdown>
          </div>
        </div>
      ) : (
        <div className="flex-1 w-full bg-gray-200 rounded-[12px] flex flex-col items-center gap-2 justify-center p-4">
          <h1 className="text-sm font-semibold text-center text-gray-800">
            No Insight
          </h1>
          <p className="text-xs text-center text-gray-600">
            You don't have any employees added yet. <br />
            Once you do, AI Insight will be available.
          </p>
        </div>
      )}
    </div>
  );
};

export default AIinsight;
