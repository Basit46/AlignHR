"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LucideEdit2 } from "lucide-react";
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

const EmployeeDetails = () => {
  const { id } = useParams();

  const employee = {
    fullName: "Marlo Stanfield",
  };

  return (
    <div className="h-fit w-full flex flex-col gap-4">
      <div className="w-full rounded-md border border-gray-300">
        <div className="flex items-center justify-between p-3 border-b border-b-gray-300">
          <p className="font-medium text-[18px]">Personal Information</p>
          <Button className="h-[36px]">Edit</Button>
        </div>
        <div className="p-3 grid grid-cols-2 gap-4">
          <div>
            <Label className="text-gray-600" htmlFor="fullName">
              Fullname
            </Label>
            <Input id="fullName" value={"Marlo Stanfield"} />
          </div>

          <div>
            <Label className="text-gray-600" htmlFor="mail">
              Email
            </Label>
            <Input id="mail" value={"marlostanfield@gmail.com"} />
          </div>

          <div>
            <Label className="text-gray-600" htmlFor="phoneNum">
              Phone number
            </Label>
            <Input type="tel" id="phoneNum" value={"+2347067668093"} />
          </div>

          <div>
            <Label className="text-gray-600" htmlFor="nationality">
              Nationality
            </Label>
            <Input id="nationality" value={"Nigerian"} />
          </div>

          <div>
            <Label className="text-gray-600" htmlFor="date">
              Date of Birth
            </Label>
            <CustomDatePicker
              className="w-full rounded-md"
              placeholder="Select birth date"
            />
          </div>

          <div>
            <Label className="text-gray-600" htmlFor="gender">
              Gender
            </Label>
            <Select value="male">
              <SelectTrigger
                id="gender"
                className="w-full h-[40px] rounded-md shadow-none"
              >
                <SelectValue placeholder="Select contract type" />
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
            <Select value="permanent">
              <SelectTrigger
                id="contractType"
                className="w-full h-[40px] rounded-md shadow-none"
              >
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
            <Label className="text-gray-600" htmlFor="taxId">
              Tax ID
            </Label>
            <Input id="taxId" value={"7067668092"} />
          </div>
        </div>
      </div>

      <div className="w-full rounded-md border border-gray-300">
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
      </div>

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
        </div>
      </div>

      <div className="w-full rounded-md border border-gray-300">
        <div className="flex items-center justify-between p-3 border-b border-b-gray-300">
          <p className="font-medium text-[18px]">Leave</p>

          <Button className="h-[36px]">Edit</Button>
        </div>
        <div className="p-3">
          <div>
            <Label className="text-gray-600" htmlFor="leave">
              Leave status
            </Label>
            <Select value="OFF">
              <SelectTrigger
                id="leave"
                className="w-[calc(50%-16px)] h-[40px] rounded-md shadow-none"
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
