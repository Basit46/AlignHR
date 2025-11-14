"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { departments, employeeTypes } from "@/constants";
import { CustomDatePicker } from "./custom/CustomDatePicker";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmployeeType } from "@/types";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { useParams } from "next/navigation";

const personalInfoSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.email("Invalid email"),
  phoneNum: z.string().optional(),
  nationality: z.string().optional(),
  address: z.string().optional(),
  dateOfBirth: z.date().optional(),
  gender: z.string().optional(),
  contractType: z.string().min(1, "Contract type is required"),
  role: z.string().min(1, "Role is required"),
  department: z.string().min(1, "Department is required"),
  isOnLeave: z.string().optional(),
});

type PersonalInfoType = z.infer<typeof personalInfoSchema>;

const PersonalInformation = ({ employee }: { employee: EmployeeType }) => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<PersonalInfoType>({
    resolver: zodResolver(personalInfoSchema),

    defaultValues: {
      name: employee?.name || "",
      email: employee?.email || "",
      phoneNum: employee?.phoneNum || "",
      nationality: employee?.nationality || "",
      address: employee?.address || "",
      gender: (employee?.gender as "male" | "female") || "",
      contractType: employee?.contractType || "permanent",
      dateOfBirth: employee?.dateOfBirth
        ? new Date(employee.dateOfBirth)
        : undefined,
      role: employee?.role || "",
      department: employee?.department || "",
      isOnLeave: employee?.isOnLeave ? "ON" : "OFF",
    },
  });

  useEffect(() => {
    if (employee) {
      handleReset();
    }
  }, [employee, reset]);

  //Edit employee details
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: any) => {
      const res = await axiosInstance.put(`/employees/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees", id] });
      alert("Saved changes successfully");
    },
  });

  const onSubmit = (data: PersonalInfoType) => {
    mutate({ ...data, isOnLeave: data.isOnLeave ? true : false });
  };

  const handleReset = () => {
    reset({
      name: employee.name || "",
      email: employee.email || "",
      phoneNum: employee.phoneNum || "",
      nationality: employee.nationality || "",
      address: employee?.address || "",
      gender: employee.gender || "male",
      contractType: employee.contractType || "",
      dateOfBirth: employee.dateOfBirth
        ? new Date(employee.dateOfBirth)
        : undefined,
      role: employee?.role || "",
      department: employee?.department || "",
      isOnLeave: employee?.isOnLeave ? "ON" : "OFF",
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full rounded-md border border-gray-300"
    >
      <div className="flex items-center justify-between p-3 border-b border-b-gray-300">
        <p className="font-medium text-[18px]">General</p>
        <div className="flex gap-2 items-center">
          <Button
            onClick={handleReset}
            type="button"
            variant={"outline"}
            className="h-[36px]"
          >
            Reset
          </Button>
          <Button loading={isPending} type="submit" className="h-[36px]">
            Save changes
          </Button>
        </div>
      </div>

      <div className="p-3 grid grid-cols-2 gap-4">
        <div>
          <Label className="text-gray-600" htmlFor="name">
            Employee name
          </Label>
          <Input id="name" {...register("name")} />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label className="text-gray-600" htmlFor="email">
            Email
          </Label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label className="text-gray-600" htmlFor="phoneNum">
            Phone number
          </Label>
          <Input id="phoneNum" type="tel" {...register("phoneNum")} />
          {errors.phoneNum && (
            <p className="text-red-500 text-sm">{errors.phoneNum.message}</p>
          )}
        </div>

        <div>
          <Label className="text-gray-600" htmlFor="dateOfBirth">
            Date of Birth
          </Label>

          <Controller
            name="dateOfBirth"
            control={control}
            render={({ field }) => (
              <CustomDatePicker
                className="w-full rounded-md"
                placeholder="Select birth date"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        <div>
          <Label className="text-gray-600" htmlFor="nationality">
            Nationality
          </Label>
          <Input id="nationality" {...register("nationality")} />
          {errors.nationality && (
            <p className="text-red-500 text-sm">{errors.nationality.message}</p>
          )}
        </div>

        <div>
          <Label className="text-gray-600" htmlFor="address">
            Address
          </Label>
          <Input id="address" {...register("address")} />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}
        </div>

        <div>
          <Label className="text-gray-600" htmlFor="gender">
            Gender
          </Label>
          <Select
            value={watch("gender")}
            onValueChange={(val) =>
              setValue("gender", val as "male" | "female")
            }
          >
            <SelectTrigger className="w-full h-[40px] rounded-md shadow-none">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-gray-600" htmlFor="contractType">
            Contract type
          </Label>
          <Select
            value={watch("contractType")}
            onValueChange={(val) => setValue("contractType", val)}
          >
            <SelectTrigger className="w-full h-[40px] rounded-md shadow-none">
              <SelectValue placeholder="Select contract type" />
            </SelectTrigger>
            <SelectContent>
              {employeeTypes.slice(1).map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-gray-600" htmlFor="role">
            Role
          </Label>
          <Input id="role" {...register("role")} />
          {errors.role && (
            <p className="text-red-500 text-sm">{errors.role.message}</p>
          )}
        </div>

        <div>
          <Label className="text-gray-600" htmlFor="department">
            Department
          </Label>
          <Select
            value={watch("department")}
            onValueChange={(val) => setValue("department", val)}
          >
            <SelectTrigger
              id="department"
              className="w-full h-[40px] rounded-md shadow-none"
            >
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              {departments.slice(1).map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-gray-600" htmlFor="isOnleave">
            Leave status
          </Label>
          <Select
            value={watch("isOnLeave")}
            onValueChange={(val) => setValue("isOnLeave", val)}
          >
            <SelectTrigger
              id="isOnleave"
              className="w-full h-[40px] rounded-md shadow-none"
            >
              <SelectValue placeholder="Select leave status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ON">ON</SelectItem>
              <SelectItem value="OFF">OFF</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </form>
  );
};

export default PersonalInformation;
