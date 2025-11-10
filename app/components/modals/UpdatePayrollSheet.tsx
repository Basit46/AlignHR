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

function UpdatePayrollSheet() {
  const { isUpdatePayrollOpen, setIsUpdatePayrollOpen } = useGlobalStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Sheet open={isUpdatePayrollOpen} onOpenChange={setIsUpdatePayrollOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Update payroll</SheetTitle>
          <SheetDescription>
            Edit the details below to update{" "}
            <span className="font-bold">Sarah Okafor</span> compensation details
          </SheetDescription>
        </SheetHeader>

        <div className="scrollbar-hide flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="h-fit flex flex-col gap-3">
            <div>
              <Label htmlFor="basePay">Base pay (₦)</Label>
              <Input
                autoFocus
                id="basePay"
                type="number"
                placeholder="Enter base pay"
                onChange={(e) => {
                  if (parseFloat(e.target.value) < 0) e.target.value = "0";
                }}
              />
            </div>

            <div>
              <Label htmlFor="addOns">Add ons (₦)</Label>
              <Input
                id="addOns"
                type="number"
                placeholder="Enter add ons"
                onChange={(e) => {
                  if (parseFloat(e.target.value) < 0) e.target.value = "0";
                }}
              />
            </div>

            <div>
              <Label htmlFor="taxId">Tax ID (%)</Label>
              <Input id="taxId" placeholder="Enter tax ID" />
            </div>

            <div>
              <Label htmlFor="bankName">Bank name</Label>
              <Input id="bankName" placeholder="Enter bank name" />
            </div>

            <div>
              <Label htmlFor="accountNo">Bank account no</Label>
              <Input
                id="accountNo"
                type="number"
                placeholder="Enter account no"
                onChange={(e) => {
                  if (parseFloat(e.target.value) < 0) e.target.value = "0";
                }}
              />
            </div>
          </form>
        </div>

        <SheetFooter className="">
          <Button className="w-full h-[44px] rounded-[6px]">Update</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default UpdatePayrollSheet;
