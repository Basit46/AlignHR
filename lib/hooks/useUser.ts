import { useQuery } from "@tanstack/react-query";
import Cookie from "js-cookie";
import axiosInstance, { TOKEN } from "../axiosInstance";

export const useUser = () => {
  const token = Cookie.get(TOKEN);

  const { data, isLoading } = useQuery({
    queryKey: ["user", token],
    queryFn: async () => {
      const res = await axiosInstance.get("/auth/me");
      return res.data.user;
    },
    enabled: !!token,
  });

  const user = data;
  const orgName = data?.orgName;
  const fullName = data?.fullName;
  const email = data?.email;

  return { user, orgName, fullName, email, isLoading };
};
