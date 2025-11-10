"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
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

function AddEmployeeSheet() {
  const { isAddEmployeeOpen, setIsAddEmployeeOpen } = useGlobalStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
          <form onSubmit={handleSubmit} className="h-fit flex flex-col gap-3">
            <div>
              <Label required htmlFor="employeeName">
                Employee name
              </Label>
              <Input
                id="employeeName"
                autoFocus
                placeholder="Enter employee name"
              />
            </div>

            <div>
              <Label required htmlFor="employeeEmail">
                Email
              </Label>
              <Input
                id="employeeEmail"
                type="email"
                placeholder="Enter email address"
              />
            </div>

            <div>
              <Label required htmlFor="phone">
                Phone number
              </Label>
              <Input id="phone" type="tel" placeholder="Enter phone number" />
            </div>

            <div>
              <Label required htmlFor="jobTitle">
                Job title
              </Label>
              <Input id="jobTitle" placeholder="Enter job title" />
            </div>

            <div>
              <Label required htmlFor="dept">
                Department
              </Label>
              <Select>
                <SelectTrigger
                  id="dept"
                  className="w-full h-[40px] rounded-md shadow-none"
                >
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label required htmlFor="contractType">
                Contract type
              </Label>
              <Select>
                <SelectTrigger
                  id="contractType"
                  className="w-full h-[40px] rounded-md shadow-none"
                >
                  <SelectValue placeholder="Select contract type" />
                </SelectTrigger>
                <SelectContent>
                  {employeeTypes.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="salary">Salary (₦)</Label>
              <Input
                id="salary"
                type="number"
                placeholder="Enter salary"
                onChange={(e) => {
                  if (parseFloat(e.target.value) < 0) e.target.value = "0";
                }}
              />
            </div>

            <div>
              <Label required htmlFor="date">
                Date joined
              </Label>
              <CustomDatePicker
                className="w-full rounded-md"
                placeholder="Select date joined"
              />
            </div>
          </form>
        </div>

        <SheetFooter className="">
          <Button className="w-full h-[44px] rounded-[6px]">
            Add Employee
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default AddEmployeeSheet;
