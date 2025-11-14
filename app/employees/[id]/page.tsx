"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { departments, employeeTypes } from "@/constants";
import { CustomDatePicker } from "@/app/components/custom/CustomDatePicker";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { EmployeeType } from "@/types";
import PersonalInformation from "@/app/components/PersonalInformation";

const EmployeeDetails = () => {
  const { id } = useParams();

  const { data: employee = {} } = useQuery<EmployeeType>({
    queryKey: ["employees", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/employees/${id}`);
      return res.data.employee;
    },
  });

  return (
    <div className="h-fit w-full flex flex-col gap-4">
      <PersonalInformation employee={employee} />

      {/* <div className="w-full rounded-md border border-gray-300">
        <div className="flex items-center justify-between p-3 border-b border-b-gray-300">
          <p className="font-medium text-[18px]">Role</p>
          <Button className="h-[36px]">Edit</Button>
        </div>
        <div className="p-3 grid grid-cols-2 gap-4">
          <div>
            <Label className="text-gray-600" htmlFor="position">
              Position
            </Label>
            <Input id="position" value={"Customer Support"} />
          </div>

          <div>
            <Label className="text-gray-600" htmlFor="dept">
              Department
            </Label>
            <Select value="operations">
              <SelectTrigger
                id="dept"
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
        </div>
      </div> */}

      <div className="w-full rounded-md border border-gray-300">
        <div className="flex items-center justify-between p-3 border-b border-b-gray-300">
          <p className="font-medium text-[18px]">
            Total Compensation: ₦450,000
          </p>
          <Button className="h-[36px]">Edit</Button>
        </div>
        <div className="p-3 grid grid-cols-2 gap-4">
          <div>
            <Label className="text-gray-600" htmlFor="basePay">
              Base pay
            </Label>
            <Input id="basePay" type="number" value={"400000"} />
          </div>

          <div>
            <Label className="text-gray-600" htmlFor="addOns">
              Add ons
            </Label>
            <Input id="addOns" type="number" value={"50000"} />
          </div>

          <div>
            <Label className="text-gray-600" htmlFor="bankName">
              Bank name
            </Label>
            <Input id="bankName" value={"Zenith bank"} />
          </div>

          <div>
            <Label className="text-gray-600" htmlFor="bankAccount">
              Bank account no
            </Label>
            <Input id="bankAccount" type="number" value={"2209584374"} />
          </div>

          {/* <div>
                    <Label className="text-gray-600" htmlFor="taxId">
                      Tax ID
                    </Label>
                    <Input id="taxId" {...register("taxId")} />
                  </div> */}
        </div>
      </div>

      <div className="w-full rounded-md border border-gray-300">
        <div className="flex items-center justify-between p-3 border-b border-b-gray-300">
          <p className="font-medium text-[18px]">Attendance</p>
        </div>
        <div className="p-3">
          <Label className="text-gray-600">21/28</Label>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
