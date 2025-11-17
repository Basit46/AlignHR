"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LucideEye, LucideEyeOff, LucideLoader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";

const registerSchema = z.object({
  orgName: z.string().min(2, "Organisation name is required"),
  fullName: z.string().min(2, "Full name is required"),
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must include one symbol"),
});

type RegisterSchemaType = z.infer<typeof registerSchema>;

const RegisterAccount = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  //Sign up
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: RegisterSchemaType) => {
      const res = await axiosInstance.post("/auth/signup", data);
      return res.data;
    },
    onSuccess: () => {
      router.replace("/auth/login");
    },
    onError(error: any) {
      console.log(error.response.data.error);
      setError(error.response.data.error);
    },
  });

  const onSubmit = (data: RegisterSchemaType) => {
    setError("");
    mutate(data);
  };

  return (
    <div className="h-screen flex">
      <div className="h-full hidden xl:flex w-1/2 bg-gray-900 flex-col">
        <div className="relative h-[65%] border-b-4 border-b-pry">
          <Image
            src="/registerImg.jpg"
            fill
            priority
            alt="AlignHR"
            className="object-cover"
          />
        </div>
        <div className="px-[40px] pt-[20px] text-white">
          <div className="flex gap-3 items-center">
            <Image src="/logo.png" width={32} height={32} alt="logo" />
            <p className="text-[20px] font-bold tracking-[0%]">AlignHR</p>
          </div>
          <h1 className="mt-[20px] mb-[10px] text-[36px] font-bold leading-[1.2]">
            Helping your organisation <br /> stay aligned
          </h1>
          <p className="text-gray-600">
            AlignHR is built for growing teams, it brings together HR
            operations, performance insights, and employee management tools
          </p>
        </div>
      </div>

      <div className="relative h-full w-full xl:w-1/2 flex justify-center items-center">
        <div className="w-[80%] md:w-[50%] lg:w-[60%]">
          <h1 className="text-[40px] leading-[1.2] font-semibold">
            Get Started
          </h1>
          <p className="text-gray-700">
            Manage your Employees easily starting from now!
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-[30px] flex flex-col gap-5"
          >
            <div>
              <Label htmlFor="orgName">
                Organisation name <span className="text-error">*</span>
              </Label>
              <Input
                id="orgName"
                placeholder="Enter your organisation name"
                {...register("orgName")}
              />
              {errors.orgName && (
                <p className="text-error text-sm mt-1">
                  {errors.orgName.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="fullName">
                HR manager name <span className="text-error">*</span>
              </Label>
              <Input
                id="fullName"
                placeholder="Enter your full name"
                {...register("fullName")}
              />
              {errors.fullName && (
                <p className="text-error text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="email">
                Email <span className="text-error">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-error text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="password">
                Password <span className="text-error">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password must include at least 8 characters and one symbol"
                  className="pr-[60px]"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-[20px] top-1/2 -translate-y-1/2 text-gray-600"
                >
                  {showPassword ? (
                    <LucideEyeOff className="size-[20px]" />
                  ) : (
                    <LucideEye className="size-[20px]" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-error text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button disabled={isPending} className="mt-4 w-full h-[44px]">
              {!isPending ? (
                "Create Account"
              ) : (
                <LucideLoader className="animate-spin" />
              )}
            </Button>

            {error && (
              <p className="text-error text-sm mt-1 text-center">{error}</p>
            )}
          </form>

          <p className="mt-2 text-gray-600">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-pry">
              Login here
            </Link>
          </p>
        </div>

        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-gray-600 text-center font-normal text-sm mx-auto">
          <p>© {new Date().getFullYear()} AlignHR</p>
        </div>
      </div>
    </div>
  );
};

export default RegisterAccount;
