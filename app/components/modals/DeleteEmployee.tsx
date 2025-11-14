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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";

const DeleteEmployee = () => {
  const queryClient = useQueryClient();
  const { isDeleteEmployeeOpen, setIsDeleteEmployeeOpen, employeeToDelId } =
    useGlobalStore();

  //Delete employee
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.delete(
        `/employees/${employeeToDelId.id}`
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      setIsDeleteEmployeeOpen(false);
      alert("Employee deleted successfully");
    },
  });

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
            <span className="font-semibold">{employeeToDelId.name}</span> will
            be permanently removed from your organisation. Are you sure you want
            to continue?
          </p>
        </div>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button
            onClick={() => mutate()}
            loading={isPending}
            variant="destructive"
          >
            Delete Employee
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteEmployee;
