"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";
import { TooltipProvider } from "@/components/ui/tooltip";
import AddEmployeeSheet from "./modals/AddEmployeeSheet";
import DeleteEmployee from "./modals/DeleteEmployee";
import UpdatePayrollSheet from "./modals/UpdatePayrollSheet";
import NotificationsSheet from "./modals/NotificationsSheet";

const RootLayoutContent = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isAuthRoute = pathname.startsWith("/auth");
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={0}>
        <div className="w-full">
          {!isAuthRoute && <Navbar />}
          {children}
        </div>

        <AddEmployeeSheet />
        <UpdatePayrollSheet />
        <DeleteEmployee />
        <NotificationsSheet />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default RootLayoutContent;
