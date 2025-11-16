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
import { useGlobalStore } from "@/store/globalStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { departments, employeeTypes } from "@/constants";
import { CustomDatePicker } from "../custom/CustomDatePicker";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";

//ZOD SCHEMA
const AddEmployeeSchema = z.object({
  employeeName: z.string().min(1, "Employee name is required"),
  employeeEmail: z.string().email("Invalid email address"),
  phone: z.string().min(7, "Enter a valid phone number"),
  jobTitle: z.string().min(1, "Job title is required"),
  dept: z.string().min(1, "Department is required"),
  contractType: z.string().min(1, "Contract type is required"),
  basePay: z.string().optional(),
  addOns: z.string().optional(),
  dateJoined: z.date().optional(),
});

type AddEmployeeType = z.infer<typeof AddEmployeeSchema>;

function AddEmployeeSheet() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isAddEmployeeOpen, setIsAddEmployeeOpen } = useGlobalStore();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AddEmployeeType>({
    resolver: zodResolver(AddEmployeeSchema),
    defaultValues: {
      employeeName: "",
      employeeEmail: "",
      phone: "",
      jobTitle: "",
      dept: "",
      contractType: "",
      basePay: "",
      addOns: "",
      dateJoined: new Date(),
    },
  });

  //Add employee to DB
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: AddEmployeeType) => {
      const res = await axiosInstance.post("/employees", {
        ...data,
        addOns: data.addOns || 0,
        basePay: data.basePay || 0,
      });
      return res.data;
    },
    onSuccess: () => {
      reset();
      setIsAddEmployeeOpen(false);
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
      router.push("/employees");
    },
  });

  const onSubmit = (data: AddEmployeeType) => {
    mutate(data);
  };

  return (
    <Sheet open={isAddEmployeeOpen} onOpenChange={setIsAddEmployeeOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add new Employee</SheetTitle>
          <SheetDescription>
            Fill in the details below to add a new employee to{" "}
            <span className="font-bold">Axios</span>
          </SheetDescription>
        </SheetHeader>

        <div className="scrollbar-hide flex-1 overflow-y-auto">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="h-fit flex flex-col gap-3"
          >
            {/* NAME */}
            <div>
              <Label required>Employee name</Label>
              <Input
                {...register("employeeName")}
                placeholder="Enter employee name"
              />
              {errors.employeeName && (
                <p className="text-red-500 text-sm">
                  {errors.employeeName.message}
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <Label required>Email</Label>
              <Input
                type="email"
                {...register("employeeEmail")}
                placeholder="Enter email address"
              />
              {errors.employeeEmail && (
                <p className="text-red-500 text-sm">
                  {errors.employeeEmail.message}
                </p>
              )}
            </div>

            {/* PHONE */}
            <div>
              <Label required>Phone number</Label>
              <Input
                type="tel"
                {...register("phone")}
                placeholder="Enter phone number"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>

            {/* JOB TITLE */}
            <div>
              <Label required>Job title</Label>
              <Input {...register("jobTitle")} placeholder="Enter job title" />
              {errors.jobTitle && (
                <p className="text-red-500 text-sm">
                  {errors.jobTitle.message}
                </p>
              )}
            </div>

            {/* DEPARTMENT SELECT */}
            <div>
              <Label required>Department</Label>
              <Controller
                name="dept"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full h-[40px] rounded-md shadow-none">
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
                )}
              />
              {errors.dept && (
                <p className="text-red-500 text-sm">{errors.dept.message}</p>
              )}
            </div>

            {/* CONTRACT TYPE SELECT */}
            <div>
              <Label required>Contract type</Label>
              <Controller
                name="contractType"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
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
                )}
              />
              {errors.contractType && (
                <p className="text-red-500 text-sm">
                  {errors.contractType.message}
                </p>
              )}
            </div>

            {/* BASE PAY */}
            <div>
              <Label htmlFor="basePay">Base pay (₦)</Label>
              <Input
                type="number"
                {...register("basePay")}
                placeholder="Enter Base pay"
                min="0"
              />
              {errors.basePay && (
                <p className="text-red-500 text-sm">{errors.basePay.message}</p>
              )}
            </div>

            {/* ADD ONS */}
            <div>
              <Label htmlFor="addOns">Add ons (₦)</Label>
              <Input
                type="number"
                {...register("addOns")}
                placeholder="Enter Add ons"
                min="0"
              />
              {errors.addOns && (
                <p className="text-red-500 text-sm">{errors.addOns.message}</p>
              )}
            </div>

            {/* DATE JOINED */}
            <div>
              <Label>Date joined</Label>
              <Controller
                name="dateJoined"
                control={control}
                render={({ field }) => (
                  <CustomDatePicker
                    className="w-full rounded-md"
                    placeholder="Select date joined"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.dateJoined && (
                <p className="text-red-500 text-sm">
                  {errors.dateJoined.message}
                </p>
              )}
            </div>

            <SheetFooter>
              <Button
                loading={isPending}
                type="submit"
                className="w-full h-[44px] rounded-[6px]"
              >
                Add Employee
              </Button>
            </SheetFooter>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default AddEmployeeSheet;
