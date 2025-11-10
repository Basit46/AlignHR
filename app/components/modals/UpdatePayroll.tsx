import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

const UpdatePayroll = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Update Payroll</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Payroll</DialogTitle>
          <DialogDescription>
            Update the payroll of your organisation
          </DialogDescription>
        </DialogHeader>
        <div></div>
        <DialogFooter className="">
          <DialogClose asChild>
            <Button variant={"destructive"}>Close</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Update</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePayroll;
