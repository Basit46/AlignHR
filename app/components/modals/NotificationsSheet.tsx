"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import axiosInstance from "@/lib/axiosInstance";
import { useNotifications } from "@/lib/hooks/useNotifications";
import { useGlobalStore } from "@/store/globalStore";
import { getRelativeTime } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  LucideCalendarCheck,
  LucideWalletCards,
  LucideBadgeCheck,
  LucideBell,
} from "lucide-react";

function NotificationsSheet() {
  const queryClient = useQueryClient();
  const { isNotificationsOpen, setIsNotificationsOpen } = useGlobalStore();
  const { notifications, hasPendingNoti } = useNotifications();

  const notificationIcons: Record<string, any> = {
    welcome: LucideBadgeCheck,
    attendance: LucideCalendarCheck,
    salary: LucideWalletCards,
    default: LucideBell,
  };

  //Mark all noti as read
  const { mutate: MarkAllAsRead, isPending } = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.put("/notifications");
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  // const notifications = [
  //   {
  //     id: 3,
  //     type: "salary",
  //     title: "Salary payment reminder",
  //     time: "Just now",
  //     message:
  //       "It's almost payroll time. Ensure all employee payment details are correct and forward to your payment maker.",
  //   },
  //   {
  //     id: 2,
  //     type: "attendance",
  //     title: "Attendance reminder",
  //     time: "1 week ago",
  //     message:
  //       "Review today's attendance and verify employee presence before submitting updates.",
  //   },
  // ];

  return (
    <Sheet open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
        </SheetHeader>

        <div className="scrollbar-hide flex-1 overflow-y-auto">
          <div className="h-fit flex flex-col gap-5">
            {notifications.map((item) => {
              const Icon =
                notificationIcons[item.type] || notificationIcons.default;

              return (
                <div
                  key={item._id}
                  className="group flex justify-between gap-3 pb-4 border-b border-b-gray-300"
                >
                  <div className="shrink-0 size-10 bg-pry/10 rounded-full grid place-items-center">
                    <Icon className="size-[20px] text-pry" />
                  </div>

                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <h1 className="font-medium text-gray-900">
                        {item.title}
                      </h1>

                      <p className="text-xs text-gray-600">
                        {getRelativeTime(item.createdAt)}
                      </p>
                    </div>

                    <p className="mt-1 text-gray-700 text-sm">{item.message}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <SheetFooter className="">
          <Button
            loading={isPending}
            disabled={!hasPendingNoti}
            onClick={() => MarkAllAsRead()}
            autoFocus
            className="w-full h-[44px] rounded-[8px]"
          >
            Mark all as read
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default NotificationsSheet;
