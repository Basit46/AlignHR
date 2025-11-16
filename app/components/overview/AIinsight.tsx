"use client";

import { Skeleton } from "@/components/ui/skeleton";
import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import Markdown from "react-markdown";

const AIinsight = () => {
  //Get AI summary
  const { data, isLoading } = useQuery({
    queryKey: ["summary"],
    queryFn: async () => {
      const res = await axiosInstance.get("/ai");
      return res.data.summary;
    },
    staleTime: 1000 * 60 * 60,
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

      <div className="scrollbar-hide flex-1 w-full overflow-y-auto">
        <div className="h-fit w-full text-sm text-gray-700 space-y-1">
          <Markdown>{data}</Markdown>
        </div>
      </div>
    </div>
  );
};

export default AIinsight;
