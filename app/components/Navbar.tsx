"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNotifications } from "@/lib/hooks/useNotifications";
import { useGlobalStore } from "@/store/globalStore";
import { PopoverClose } from "@radix-ui/react-popover";
import { LucideBell, LucideMenu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { setIsNotificationsOpen } = useGlobalStore();
  const { hasPendingNoti } = useNotifications();

  const sections = [
    { name: "Overview", path: "/" },
    { name: "Employees", path: "/employees" },
    { name: "Payroll", path: "/payroll" },
    { name: "Attendance", path: "/attendance" },
  ];

  return (
    <div className="sticky top-0 md:top-auto md:relative backdrop-blur-[10px] md:backdrop-blur-none z-[10] w-full px-[var(--main-px)] py-[20px] flex gap-10 items-center justify-between">
      <div
        role="button"
        onClick={() => router.push("/")}
        className="relative size-[36px]"
      >
        <Image src="/logo.png" fill alt="logo" className="object-cover" />
      </div>

      <div className="hidden md:flex flex-1 gap-4 items-center">
        {sections.map((section) => (
          <Link
            key={section.path}
            href={section.path}
            className={`${
              (
                section.path == "/"
                  ? pathname === section.path
                  : pathname.startsWith(section.path)
              )
                ? "bg-pry text-white"
                : "bg-white text-black"
            } rounded-[20px] px-[20px] h-[36px] font-medium flex items-center text-sm`}
          >
            {section.name}
          </Link>
        ))}
      </div>

      <div className="flex gap-2 items-center">
        <button
          onClick={() => setIsNotificationsOpen(true)}
          className="relative bg-white size-9 grid place-items-center rounded-full"
        >
          <LucideBell className="size-[20px] text-gray-700" />
          {hasPendingNoti && (
            <div className="absolute top-0 right-0 size-1.5 bg-[red] rounded-full" />
          )}
        </button>

        <div
          role="button"
          onClick={() => router.push("/profile")}
          className="relative size-[40px] rounded-full overflow-hidden"
        >
          <Image src="/avatar.jpg" fill alt="avatar" className="object-cover" />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <button className="md:hidden">
              <LucideMenu className="text-pry" />
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            alignOffset={0}
            sideOffset={10}
            className="w-fit p-3"
          >
            <div className="flex flex-col gap-4">
              {sections.map((section) => (
                <PopoverClose key={section.path} asChild>
                  <Link
                    href={section.path}
                    className={`${
                      (
                        section.path == "/"
                          ? pathname === section.path
                          : pathname.startsWith(section.path)
                      )
                        ? "bg-pry text-white"
                        : "bg-white text-black"
                    } rounded-[20px] px-[12px] h-[32px] font-medium flex justify-center items-center text-center text-sm`}
                  >
                    <p className="text-center">{section.name}</p>
                  </Link>
                </PopoverClose>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Navbar;
