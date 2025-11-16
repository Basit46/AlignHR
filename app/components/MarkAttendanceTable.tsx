"use client";

import { Button } from "@/components/ui/button";
import React, { useMemo, useState } from "react";
import DataTable from "../components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { departments } from "@/constants";
import CustomSearch from "../components/custom/CustomSearch";
import { Input } from "@/components/ui/input";
import { EmployeeType } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const MarkAttendance = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  const [searchValue, setSearchValue] = useState("");

  //GET Employees attendance list
  const { refetch: refetchEmployees, isLoading } = useQuery({
    queryKey: ["attendance"],
    queryFn: async () => {
      const res = await axiosInstance.get("/attendance");
      setEmployees(res.data.attendance);
      return res.data.attendance;
    },
  });

  //Update attendance record
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.put("/attendance", { employees });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Attendance updated successfully");
      queryClient.invalidateQueries({ queryKey: ["attendance"] });
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  const todaysDate = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const markAllAsPresent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmployees(
      employees?.map((e) => ({
        ...e,
        attendance: event.target.checked ? "present" : "absent",
      }))
    );
  };

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "name",
      header: "Employee",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <p className="text-gray-900 font-medium">{row.original.name}</p>
          <p className="text-gray-600 text-xs">{row.original.email}</p>
        </div>
      ),
    },
    {
      accessorKey: "role",
      header: "Job Title",
      cell: ({ row }) => (
        <span className="text-gray-700">{row.original.role}</span>
      ),
    },
    {
      accessorKey: "department",
      header: "Department",
      cell: ({ row }) => (
        <span className="text-gray-700">
          {departments.find((d) => d.value === row.original.department)
            ?.label ?? "-"}
        </span>
      ),
    },
    {
      accessorKey: "attendance",
      header: () => (
        <div className="flex gap-2">
          <Input
            checked={!employees.some((e) => e.attendance !== "present")}
            onChange={markAllAsPresent}
            type="checkbox"
            className="w-4 h-4"
          />
          <p>{todaysDate}</p>
        </div>
      ),
      cell: ({ row }) => (
        <div onClick={(e) => e.stopPropagation()} className="flex items-center">
          <Input
            checked={row.original.attendance == "present"}
            onChange={(event) =>
              setEmployees(
                employees.map((e) =>
                  e._id === row.original._id
                    ? {
                        ...e,
                        attendance: event.target.checked ? "present" : "absent",
                      }
                    : e
                )
              )
            }
            type="checkbox"
            className="w-4 h-4"
          />
        </div>
      ),
    },
  ];

  const handleRowClick = (row: any) => {
    router.push(`/employees/${row._id}`);
  };

  const filteredData = useMemo(() => {
    if (!employees) return [];

    return employees.filter((employee: any) => {
      const matchedName = employee.name
        ?.toLowerCase()
        .includes(searchValue.trim().toLowerCase());

      return matchedName;
    });
  }, [employees, searchValue]);

  return (
    <div className="mt-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <CustomSearch
          placeholder="Search employee"
          value={searchValue}
          setValue={setSearchValue}
        />

        <div className="flex items-center gap-3">
          <Button onClick={() => refetchEmployees()} variant="outline">
            Reset
          </Button>
          <Button onClick={() => mutate()} loading={isPending}>
            Save attendance
          </Button>
        </div>
      </div>

      <DataTable
        data={filteredData}
        columns={columns}
        handleRowClick={handleRowClick}
        placeholder="No employee found"
        isLoading={isLoading}
      />
    </div>
  );
};

export default MarkAttendance;
