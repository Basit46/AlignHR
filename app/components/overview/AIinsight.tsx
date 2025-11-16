"use client";

import { Skeleton } from "@/components/ui/skeleton";

const AIinsight = () => {
  //   if (isLoading) {
  //   return <Skeleton className="w-full h-full" />;
  // }
  return (
    <div className="w-full h-full p-4 flex flex-col justify-between gap-4">
      <div>
        <h1 className="text-[20px] font-medium leading-[1.2]">AI Insight</h1>
        <p className="text-gray-600 text-sm">
          View summaries of workforce trends
        </p>
      </div>

      <div className="scrollbar-hide flex-1 w-full overflow-y-auto">
        <div className="h-fit w-full">
          <p className="text-sm text-gray-700">
            Over the past quarter, the workforce has shown a notable shift
            toward permanent employment, with a 10% increase compared to the
            previous cycle. Contract roles, while still vital for flexibility,
            have seen a gradual decline as departments focus on long-term
            stability. Engineering and Operations departments lead this
            transition, accounting for nearly half of all new permanent hires.
            Meanwhile, intern positions remain steady, reflecting consistent
            investment in talent development and onboarding programs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIinsight;
