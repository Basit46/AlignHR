"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import axiosInstance from "@/lib/axiosInstance";
import { useGlobalStore } from "@/store/globalStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

//ZOD SCHEMA
const PayrollSchema = z.object({
  basePay: z.number().optional(),
  addOns: z.number().optional(),
  taxId: z.string().optional(),
  bankName: z.string().optional(),
  accountNo: z.string().optional(),
});

type PayrollType = z.infer<typeof PayrollSchema>;

function UpdatePayrollSheet() {
  const {
    isUpdatePayrollOpen,
    setIsUpdatePayrollOpen,
    employeePaymentDetails,
  } = useGlobalStore();
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<PayrollType>({
    resolver: zodResolver(PayrollSchema),
    defaultValues: {
      basePay: employeePaymentDetails.basePay,
      addOns: employeePaymentDetails.addOns,
      taxId: employeePaymentDetails.taxId,
      bankName: employeePaymentDetails.bankName,
      accountNo: employeePaymentDetails.accountNo?.toString(),
    },
  });

  useEffect(() => {
    reset({
      basePay: employeePaymentDetails.basePay,
      addOns: employeePaymentDetails.addOns,
      taxId: employeePaymentDetails.taxId,
      bankName: employeePaymentDetails.bankName,
      accountNo: employeePaymentDetails.accountNo?.toString(),
    });
  }, [employeePaymentDetails, reset]);

  //Edit employee details
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: any) => {
      const res = await axiosInstance.put(
        `/payroll/${employeePaymentDetails._id}`,
        data
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payroll"] });
      toast.success("Payment details updated successfully");
    },
  });

  const onSubmit = (data: PayrollType) => {
    mutate(data);
  };

  return (
    <Sheet open={isUpdatePayrollOpen} onOpenChange={setIsUpdatePayrollOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Update payroll</SheetTitle>
          <SheetDescription>
            Edit the details below to update{" "}
            <span className="font-medium text-gray-900">
              {employeePaymentDetails.name}
            </span>{" "}
            compensation details
          </SheetDescription>
        </SheetHeader>

        <div className="scrollbar-hide flex-1 overflow-y-auto">
          <form
            id="update-payroll-form"
            onSubmit={handleSubmit(onSubmit)}
            className="h-fit flex flex-col gap-3"
          >
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
              <Input
                id="taxId"
                placeholder="Enter tax ID"
                {...register("taxId")}
              />
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
                <p className="text-red-500 text-sm">
                  {errors.bankName.message}
                </p>
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
                <p className="text-red-500 text-sm">
                  {errors.accountNo.message}
                </p>
              )}
            </div>
          </form>
        </div>

        <SheetFooter className="">
          <Button
            form="update-payroll-form"
            loading={isPending}
            className="w-full h-[44px] rounded-[6px]"
          >
            Update
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default UpdatePayrollSheet;
