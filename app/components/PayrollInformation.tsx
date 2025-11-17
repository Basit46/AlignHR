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
import { toast } from "sonner";

//ZOD SCHEMA
const PayrollSchema = z.object({
  basePay: z.number().optional(),
  addOns: z.number().optional(),
  taxId: z.string().optional(),
  bankName: z.string().optional(),
  accountNo: z.string().optional(),
});

type PayrollType = z.infer<typeof PayrollSchema>;

const PayrollInformation = ({ employee }: { employee: EmployeeType }) => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    register,
    reset,
    getValues,
    watch,
    formState: { errors },
  } = useForm<PayrollType>({
    resolver: zodResolver(PayrollSchema),
    defaultValues: {
      basePay: employee.basePay,
      addOns: employee.addOns,
      taxId: employee.taxId,
      bankName: employee.bankName,
      accountNo: employee.accountNo,
    },
  });

  useEffect(() => {
    if (employee) {
      handleReset();
    }
  }, [employee, reset]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: any) => {
      const res = await axiosInstance.put(`/payroll/${employee._id}`, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Employee updated successfully");
      queryClient.invalidateQueries({ queryKey: ["payroll"] });
      queryClient.invalidateQueries({ queryKey: ["employees", id] });
    },
  });

  const onSubmit = (data: PayrollType) => {
    mutate(data);
  };

  const handleReset = () => {
    reset({
      basePay: employee.basePay,
      addOns: employee.addOns,
      taxId: employee.taxId,
      bankName: employee.bankName,
      accountNo: employee.accountNo,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full rounded-md border border-gray-300"
    >
      <div className="flex items-center justify-between p-3 border-b border-b-gray-300">
        <p className="font-medium text-[18px]">
          Total Compensation: ₦
          {((watch("basePay") || 0) + (watch("addOns") || 0))?.toLocaleString()}
        </p>
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

      <div className="p-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="basePay">Base pay (₦)</Label>
          <Input
            autoFocus
            {...register("basePay", { valueAsNumber: true })}
            id="basePay"
            type="number"
            placeholder="Enter base pay"
          />
          {errors.basePay && (
            <p className="text-red-500 text-sm">{errors.basePay.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="addOns">Add ons (₦)</Label>
          <Input
            {...register("addOns", { valueAsNumber: true })}
            id="addOns"
            type="number"
            placeholder="Enter add ons"
          />
          {errors.addOns && (
            <p className="text-red-500 text-sm">{errors.addOns.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="taxId">Tax ID</Label>
          <Input id="taxId" placeholder="Enter tax ID" {...register("taxId")} />
          {errors.taxId && (
            <p className="text-red-500 text-sm">{errors.taxId.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="bankName">Bank name</Label>
          <Input
            id="bankName"
            placeholder="Enter bank name"
            {...register("bankName")}
          />
          {errors.bankName && (
            <p className="text-red-500 text-sm">{errors.bankName.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="accountNo">Bank account no</Label>
          <Input
            id="accountNo"
            placeholder="Enter account no"
            {...register("accountNo")}
          />
          {errors.accountNo && (
            <p className="text-red-500 text-sm">{errors.accountNo.message}</p>
          )}
        </div>
      </div>
    </form>
  );
};

export default PayrollInformation;
