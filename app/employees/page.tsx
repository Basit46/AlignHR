"use client";

import { Button } from "@/components/ui/button";
import {
  LucideEye,
  LucideFileSpreadsheet,
  LucidePlus,
  LucideTrash,
  LucideView,
} from "lucide-react";
import React, { useMemo, useState } from "react";
import DataTable from "../components/DataTable";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { exportJSONToExcel, formatDateWithSuffix } from "@/utils";
import CustomSelect from "../components/custom/CustomSelect";
import { departments, employeeTypes } from "@/constants";
import CustomSearch from "../components/custom/CustomSearch";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGlobalStore } from "@/store/globalStore";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";

const Employees = () => {
  const router = useRouter();
  const { setIsAddEmployeeOpen, setIsDeleteEmployeeOpen, setEmployeeToDelId } =
    useGlobalStore();

  const [searchValue, setSearchValue] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [contractFilter, setContractFilter] = useState("all");

  //GET Employees
  const { data: employees = [], isLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await axiosInstance.get("/employees");
      return res.data.employees;
    },
  });

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "name",
      header: "Employee",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <p className="text-gray-800 font-medium">{row.original.name}</p>
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
          {departments.find((d) => d.value == row.original.department)?.label ??
            "-"}
        </span>
      ),
    },

    {
      accessorKey: "contractType",
      header: "Contract type",
      cell: ({ row }) => {
        const value = row.original.contractType;
        return (
          <p className="text-gray-700">
            <span
              className={`${
                value === "permanent"
                  ? "text-pry"
                  : value === "contract"
                  ? "text-sec"
                  : "text-success"
              }`}
            >
              •
            </span>{" "}
            <span className="capitalize">{value}</span>
          </p>
        );
      },
    },

    {
      accessorKey: "salary",
      header: "Salary (₦)",
      cell: ({ row }) => (
        <span className="text-gray-700">
          ₦{row.original.salary?.toLocaleString()}
        </span>
      ),
    },

    {
      accessorKey: "attendance",
      header: "Attendance",
      cell: ({ row }) => {
        return (
          <span className="text-gray-700 capitalize">
            {row.original.attendance}
          </span>
        );
      },
    },

    {
      accessorKey: "isOnLeave",
      header: "Leave status",
      cell: ({ row }) => (
        <Badge variant={row.original.isOnLeave ? "default" : "secondary"}>
          {row.original.isOnLeave ? "ON" : "OFF"}
        </Badge>
      ),
    },

    {
      accessorKey: "dateJoined",
      header: "Date Joined",
      cell: ({ row }) => (
        <span className="text-gray-700">
          {formatDateWithSuffix(row.original.dateJoined)}
        </span>
      ),
    },

    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-2 [&_svg]:size-5"
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={() => handleRowClick(row.original)}>
                <LucideEye className="text-pry" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View Employee</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => {
                  setIsDeleteEmployeeOpen(true);
                  setEmployeeToDelId({
                    name: row.original.name,
                    id: row.original._id,
                  });
                }}
              >
                <LucideTrash className="text-error" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete</p>
            </TooltipContent>
          </Tooltip>
        </div>
      ),
    },
  ];

  const handleRowClick = (row: any) => {
    router.push(`/employees/${row._id}`);
  };

  //Filter employee
  const filteredData = useMemo(() => {
    if (!employees) return [];

    return employees?.filter((employee: any) => {
      const matchedName = employee.name
        ?.toLowerCase()
        .includes(searchValue.trim().toLowerCase());

      const matchedDept =
        deptFilter == "all" ? true : employee.department == deptFilter;

      const matchedContract =
        contractFilter == "all"
          ? true
          : employee.contractType == contractFilter;

      return matchedName && matchedDept && matchedContract;
    });
  }, [employees, searchValue, deptFilter, contractFilter]);

  return (
    <div className="w-full px-[var(--main-px)] py-[20px]">
      <div className="flex flex-col md:flex-row gap-3 md:gap-0 justify-between md:items-center">
        <div>
          <h1 className="font-medium text-[24px] leading-[1.2]">Employees</h1>
          <p className="text-gray-700">
            Manage and view the complete list of employees within the
            organisation
          </p>
        </div>

        <div className="flex gap-2 items-center">
          <Button
            onClick={() => exportJSONToExcel(employees, "Employees")}
            variant={"outline"}
          >
            <LucideFileSpreadsheet />
            Export
          </Button>

          <Button onClick={() => setIsAddEmployeeOpen(true)}>
            <LucidePlus />
            Add Employee
          </Button>
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-[16px] flex items-center justify-between">
          <CustomSearch
            placeholder={"Search for employee"}
            value={searchValue}
            setValue={setSearchValue}
          />

          <div className="flex gap-2">
            <CustomSelect
              placeholder="Department"
              data={departments}
              value={deptFilter}
              defaultValue={deptFilter}
              setSelectedValue={setDeptFilter}
            />
            <CustomSelect
              placeholder="Contract type"
              data={employeeTypes}
              value={contractFilter}
              defaultValue={contractFilter}
              setSelectedValue={setContractFilter}
            />
          </div>
        </div>

        <div className="">
          <DataTable
            data={filteredData}
            columns={columns}
            handleRowClick={handleRowClick}
            placeholder="No employee found"
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Employees;
