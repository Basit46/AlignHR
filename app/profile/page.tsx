"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosInstance, { TOKEN } from "@/lib/axiosInstance";
import { useUser } from "@/lib/hooks/useUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LucideLogOut, LucideSettings } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";

const imgSrc =
  "https://i.pinimg.com/originals/38/58/19/385819a74b8876828e1e4407a69b0c5f.gif";

const Profile = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, fullName, orgName, isLoading } = useUser();

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    orgName: "",
  });
  useEffect(() => {
    setProfile(user);
  }, [user]);

  //reset user details
  const handleReset = () => {
    setProfile(user);
  };

  //handle signout
  const signout = () => {
    router.push("/auth/login");
    Cookie.remove(TOKEN);
  };

  //Edit user
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: {
      fullName: string;
      email: string;
      orgName: string;
    }) => {
      const res = await axiosInstance.post("/editUser", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return (
    <div className="fixed inset-0 w-screen h-screen grid place-items-center">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url(${imgSrc})`,
        }}
      />

      <div
        className={`${
          isLoading ? "opacity-0" : "opacity-100 duration-300"
        } relative z-[2] h-fit w-[450px] rounded-[16px] overflow-hidden border-[8px] border-white bg-white`}
      >
        <div className="h-[100px] w-full relative overflow-hidden rounded-b-[16px]">
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: `url(${imgSrc})`,
            }}
          ></div>
        </div>

        <div className="absolute z-[3] size-[100px] ml-[20px] mt-[-50px] rounded-full bg-white border-[3px] border-white overflow-hidden">
          <Image src="/avatar.jpg" fill className="object-cover" alt="avatar" />
        </div>

        <div className="h-fit bg-white w-full relative px-[20px] pt-[10px] pb-[20px]">
          <div className="flex justify-end">
            <Button onClick={signout} className="" variant={"destructive"}>
              <LucideLogOut /> Sign out
            </Button>
          </div>

          <h1 className="mt-1 font-semibold">{fullName}</h1>
          <p className="text-gray-900 text-sm font-medium">{orgName}</p>

          <div className="border-b border-b-gray-300 pb-2 mt-[20px] flex items-center gap-1">
            <LucideSettings className="size-[16px] text-gray-800" />
            <p className="text-sm text-gray-700">Settings</p>
          </div>

          <div className="my-4 flex flex-col gap-3">
            <div className="flex gap-4 justify-between items-center">
              <Label htmlFor="fullName">Fullname</Label>
              <Input
                className="w-[70%]"
                id="fullName"
                value={profile?.fullName || ""}
                onChange={(e) =>
                  setProfile({ ...profile, fullName: e.target.value })
                }
              />
            </div>
            <div className="flex gap-4 justify-between items-center">
              <Label htmlFor="email">Email</Label>
              <Input
                className="w-[70%]"
                id="email"
                type="mail"
                value={profile?.email || ""}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
              />
            </div>
            <div className="flex gap-4 justify-between items-center">
              <Label htmlFor="orgName">Org name</Label>
              <Input
                className="w-[70%]"
                id="orgName"
                value={profile?.orgName || ""}
                onChange={(e) =>
                  setProfile({ ...profile, orgName: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 items-center">
            <Button onClick={handleReset} variant={"outline"}>
              Discard
            </Button>
            <Button loading={isPending} onClick={() => mutate(profile)}>
              Save changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
