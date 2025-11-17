"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { LucideEye, LucideEyeOff, LucideLoader } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axiosInstance, { TOKEN } from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";

const loginSchema = z.object({
  email: z.email("Email is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginSchemaType = z.infer<typeof loginSchema>;

const Login = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  //Sign in
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: LoginSchemaType) => {
      const res = await axiosInstance.post("/auth/signin", data);
      return res.data;
    },
    onSuccess: (res) => {
      router.push("/");
      Cookie.set(TOKEN, res.token, { expires: 7 });
    },
    onError(error: any) {
      console.log(error.response.data.error);
      setError(error.response.data.error);
    },
  });

  const onSubmit = (data: LoginSchemaType) => {
    setError("");
    mutate(data);
  };

  const useDemoAccount = () => {
    mutate({ email: "demo@alignhr.com", password: "Demo@001" });
  };

  return (
    <div className="h-screen flex">
      <div className="hidden xl:flex h-full w-1/2 bg-gray-900 flex-col">
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
            <Image
              src="/logo.png"
              width={32}
              height={32}
              alt="logo"
              className="object-cover"
            />
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

      <div className="relative h-full w-full xl:w-1/2 flex items-center justify-center">
        <div className="w-[80%] md:w-[50%] lg:w-[60%]">
          <h1 className="text-[40px] leading-[1.2] font-semibold text-center">
            Welcome Back!
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-[30px] flex flex-col gap-5"
          >
            <div>
              <Label htmlFor="email">Email</Label>
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
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
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

            <Button className="mt-4 w-full h-[44px]">
              {!isPending ? "Login" : <LucideLoader className="animate-spin" />}
            </Button>
            <Button
              type="button"
              onClick={() => useDemoAccount()}
              className="mt-[-6px] w-full h-[44px] bg-[chocolate] hover:bg-[chocolate]/80"
            >
              Use a demo account
            </Button>

            {error && (
              <p className="text-error text-sm mt-1 text-center">{error}</p>
            )}
          </form>
          <p className="mt-2 text-gray-600">
            Don't have an account?{" "}
            <Link href="/auth/register" className="text-pry">
              Create account
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

export default Login;
