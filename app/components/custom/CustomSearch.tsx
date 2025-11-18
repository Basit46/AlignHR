"use client";

import { cn } from "@/lib/utils";
import { LucideSearch } from "lucide-react";
import React from "react";

const CustomSearch = ({
  className,
  placeholder,
  value,
  setValue,
}: {
  className?: string;
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
}) => {
  return (
    <div
      className={cn(
        "relative w-full vsm:w-[320px] h-[40px] bg-white border border-gray-200 rounded-[20px] overflow-hidden",
        className
      )}
    >
      <LucideSearch className="absolute left-[14px] top-1/2 -translate-y-1/2 size-[20px] text-gray-500" />
      <input
        className="w-full h-full outline-none pl-[40px] pr-[14px] placeholder:text-gray-700"
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default CustomSearch;
