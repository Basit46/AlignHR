import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
import { NotificationType } from "@/types";

export const useNotifications = () => {
  const { data: notifications = [] } = useQuery<NotificationType[]>({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await axiosInstance.get("/notifications");
      return res.data.notifications;
    },
    // refetchInterval: 1000 * 60 * 60,
  });

  const hasPendingNoti = notifications.some((n) => !n.isRead);

  return { notifications, hasPendingNoti };
};
