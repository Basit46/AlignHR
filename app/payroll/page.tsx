"use client";

import { Button } from "@/components/ui/button";
import { LucideFileSpreadsheet } from "lucide-react";
import React, { useMemo, useState } from "react";
import DataTable from "../components/DataTable";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import CustomSelect from "../components/custom/CustomSelect";
import { departments, employeeTypes } from "@/constants";
import CustomSearch from "../components/custom/CustomSearch";
import { useGlobalStore } from "@/store/globalStore";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { calculateNigeriaPAYE, exportJSONToExcel } from "@/utils";

const PayrollTable = () => {
  const router = useRouter();
  const { setIsUpdatePayrollOpen, setEmployeePaymentDetails } =
    useGlobalStore();

  //GET Payroll
  const { data: payroll = [], isLoading } = useQuery({
    queryKey: ["payroll"],
    queryFn: async () => {
      const res = await axiosInstance.get("/payroll");
      return res.data.payroll;
    },
  });

  const [searchValue, setSearchValue] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [contractFilter, setContractFilter] = useState("all");

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
      accessorKey: "totalPay",
      header: "Total Pay",
      cell: ({ row }) => {
        const { basePay, addOns, taxRate } = row.original;
        const tax = taxRate ? basePay * taxRate : 0;
        const total = basePay + addOns - tax;

        return (
          <span className="text-gray-800 font-medium">
            ₦{total.toLocaleString() || "-"}
          </span>
        );
      },
    },

    {
      accessorKey: "basePay",
      header: "Base Pay",
      cell: ({ row }) => (
        <span className="text-gray-700">
          ₦{row.original.basePay.toLocaleString() || "-"}
        </span>
      ),
    },

    {
      accessorKey: "addOns",
      header: "Add-Ons",
      cell: ({ row }) => (
        <span className="text-gray-700">
          ₦{row.original.addOns.toLocaleString() || "-"}
        </span>
      ),
    },

    {
      accessorKey: "taxRate",
      header: "Tax per month",
      cell: ({ row }) => {
        const rate = row.original.taxRate;
        return (
          <span className="text-gray-700">
            {row.original.contractType !== "intern"
              ? row.original.basePay
                ? `₦${calculateNigeriaPAYE(row.original.basePay).taxAmount} (${
                    calculateNigeriaPAYE(row.original.basePay).taxPercent
                  }%)`
                : "-"
              : "-"}
          </span>
        );
      },
    },

    {
      accessorKey: "taxId",
      header: "Tax ID",
      cell: ({ row }) => (
        <span className="text-gray-700">{row.original.taxId || "-"}</span>
      ),
    },

    {
      accessorKey: "bankName",
      header: "Bank",
      cell: ({ row }) => (
        <span className="text-gray-700">{row.original.bankName || "-"}</span>
      ),
    },

    {
      accessorKey: "accountNo",
      header: "Account No.",
      cell: ({ row }) => (
        <span className="text-gray-700">{row.original.accountNo || "-"}</span>
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
          <Button
            onClick={() => {
              setIsUpdatePayrollOpen(true);
              setEmployeePaymentDetails(row.original);
            }}
            variant={"outline"}
            className="h-[30px] text-xs"
          >
            Edit info
          </Button>
        </div>
      ),
    },
  ];

  const handleRowClick = (row: any) => {
    router.push(`/employees/${row._id}`);
  };

  const filteredData = useMemo(() => {
    if (!payroll) return [];

    return payroll.filter((employee: any) => {
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
  }, [payroll, searchValue, deptFilter, contractFilter]);

  return (
    <div className="w-full px-[var(--main-px)] py-[20px]">
      <div className="flex flex-col md:flex-row gap-3 md:gap-0 justify-between md:items-center">
        <div>
          <h1 className="font-medium text-[24px] leading-[1.2]">Payroll</h1>
          <p className="text-gray-700">
            View payroll details, payment breakdowns, and salary information
          </p>
        </div>

        <div className="flex gap-2 items-center">
          <Button
            variant={"outline"}
            onClick={() => exportJSONToExcel(payroll, "Payroll")}
          >
            <LucideFileSpreadsheet />
            Export
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

export default PayrollTable;
