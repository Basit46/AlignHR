"use client";

import { useNotifications } from "@/lib/hooks/useNotifications";
import { useGlobalStore } from "@/store/globalStore";
import { LucideBell } from "lucide-react";
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

  //sticky top-0 backdrop-blur-[10px] z-[10]
  return (
    <div className="relative z-[10] w-full px-[var(--main-px)] py-[20px] flex gap-10 items-center justify-between">
      <div className="relative size-[36px]">
        <Image src="/logo.png" fill alt="logo" className="object-cover" />
      </div>

      <div className="flex-1 flex gap-4 items-center">
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
      </div>
    </div>
  );
};

export default Navbar;
