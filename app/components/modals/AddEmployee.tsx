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

const AddEmployee = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Add Employee</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Employee</DialogTitle>
          <DialogDescription>
            Add a new employee to your organisation
          </DialogDescription>
        </DialogHeader>
        <div></div>
        <DialogFooter className="">
          <DialogClose asChild>
            <Button variant={"destructive"}>Close</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Add Employee</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEmployee;
