"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function CustomDatePicker({
  className,
  placeholder,
}: {
  className?: string;
  placeholder?: string;
}) {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant="outline"
          data-empty={!date}
          className={cn(
            "data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal",
            className
          )}
        >
          <CalendarIcon />
          {date ? (
            format(date, "PPP")
          ) : (
            <span>{placeholder ?? "Pick a date"}</span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent id="date" className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </PopoverContent>
    </Popover>
  );
}
