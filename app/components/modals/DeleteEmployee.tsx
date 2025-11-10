"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGlobalStore } from "@/store/globalStore";

const DeleteEmployee = () => {
  const { isDeleteEmployeeOpen, setIsDeleteEmployeeOpen } = useGlobalStore();

  return (
    <Dialog open={isDeleteEmployeeOpen} onOpenChange={setIsDeleteEmployeeOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Delete Employee
          </DialogTitle>

          <DialogDescription className="text-sm text-gray-600">
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2">
          <p className="text-gray-800 text-sm leading-relaxed">
            This employee will be permanently removed from your organisation.
            Are you sure you want to continue?
          </p>
        </div>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <DialogClose asChild>
            <Button variant="destructive">Delete Employee</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteEmployee;
