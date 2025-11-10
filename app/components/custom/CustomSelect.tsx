import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const CustomSelect = ({
  placeholder,
  data,
  value,
  defaultValue,
  setSelectedValue,
  className,
  align,
}: {
  placeholder?: string;
  data: { value: string; label: string }[];
  value: string;
  defaultValue?: string;
  setSelectedValue: (value: string) => void;
  className?: string;
  align?: "center" | "end" | "start";
}) => {
  const getDisplayValue = () => {
    if (value === "all") {
      return placeholder;
    }

    const selectedItem = data.find((item) => item.value === value);
    return selectedItem ? selectedItem.label : placeholder;
  };

  return (
    <Select
      defaultValue={defaultValue}
      value={value}
      onValueChange={setSelectedValue}
    >
      <SelectTrigger className={cn("w-fit gap-2 h-[40px]", className)}>
        <SelectValue placeholder={getDisplayValue()}>
          {getDisplayValue()}
        </SelectValue>
      </SelectTrigger>
      <SelectContent align={align || "start"}>
        {data.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;
