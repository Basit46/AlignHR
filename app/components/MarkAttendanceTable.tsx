"use client";

import { Button } from "@/components/ui/button";
import React, { useMemo, useState } from "react";
import DataTable from "../components/DataTable";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import CustomSelect from "../components/custom/CustomSelect";
import { departments, employeeTypes } from "@/constants";
import CustomSearch from "../components/custom/CustomSearch";
import { useGlobalStore } from "@/store/globalStore";
import { Input } from "@/components/ui/input";

const employees = [
  {
    id: "EMP001",
    name: "Sarah Okafor",
    email: "sarahokafor@gmail.com",
    role: "Customer Support",
    department: "engineering",
    employeeType: "permanent",
  },

  {
    id: "EMP002",
    name: "John Adeyemi",
    email: "john.adeyemi@example.com",
    role: "Frontend Developer",
    department: "engineering",
    employeeType: "permanent",
  },
  {
    id: "EMP003",
    name: "Amina Bello",
    email: "amina.bello@example.com",
    role: "Backend Developer",
    department: "engineering",
    employeeType: "contract",
  },

  {
    id: "EMP005",
    name: "Chinyere Ugo",
    email: "chinyere.ugo@example.com",
    role: "HR Manager",
    department: "human-resources",
    employeeType: "permanent",
  },
  {
    id: "EMP006",
    name: "David Afolabi",
    email: "david.afolabi@example.com",
    role: "QA Tester",
    department: "engineering",
    employeeType: "contract",
  },
  {
    id: "EMP007",
    name: "Grace Omotayo",
    email: "grace.omotayo@example.com",
    role: "Marketing Specialist",
    department: "marketing",
    employeeType: "permanent",
  },
  {
    id: "EMP008",
    name: "Tunde Bakare",
    email: "tunde.bakare@example.com",
    role: "Sales Executive",
    department: "sales",
    employeeType: "permanent",
  },
  {
    id: "EMP009",
    name: "Naomi Uche",
    email: "naomi.uche@example.com",
    role: "Operations Officer",
    department: "operations",
    employeeType: "permanent",
  },
  {
    id: "EMP010",
    name: "Samuel Ezenwa",
    email: "samuel.ezenwa@example.com",
    role: "DevOps Engineer",
    department: "engineering",
    employeeType: "permanent",
  },

  {
    id: "EMP011",
    name: "Rita Nwosu",
    email: "rita.nwosu@example.com",
    role: "Content Writer",
    department: "marketing",
    employeeType: "contract",
  },

  {
    id: "EMP013",
    name: "Blessing Igwe",
    email: "blessing.iwe@example.com",
    role: "Customer Support",
    department: "operations",
    employeeType: "permanent",
  },
  {
    id: "EMP014",
    name: "Oluwatobi Akinwale",
    email: "tobi.akinwale@example.com",
    role: "Finance Officer",
    department: "finance",
    employeeType: "permanent",
  },
  {
    id: "EMP015",
    name: "Stephen Okon",
    email: "stephen.okon@example.com",
    role: "Office Assistant",
    department: "operations",
    employeeType: "contract",
  },
  {
    id: "EMP016",
    name: "Favour Chukwu",
    email: "favour.chukwu@example.com",
    role: "Data Analyst",
    department: "engineering",
    employeeType: "permanent",
  },
  {
    id: "EMP017",
    name: "Henry Edet",
    email: "henry.edet@example.com",
    role: "Security Officer",
    department: "operations",
    employeeType: "permanent",
  },
  {
    id: "EMP018",
    name: "Vivian Abiola",
    email: "vivian.abiola@example.com",
    role: "Recruiter",
    department: "human-resources",
    employeeType: "contract",
  },
  {
    id: "EMP019",
    name: "Ibrahim Yusuf",
    email: "ibrahim.yusuf@example.com",
    role: "IT Support",
    department: "engineering",
    employeeType: "permanent",
  },
  {
    id: "EMP020",
    name: "Chisom Anya",
    email: "chisom.anya@example.com",
    role: "Executive Assistant",
    department: "operations",
    employeeType: "permanent",
  },
  {
    id: "EMP021",
    name: "Oghenekevwe Akpofure",
    email: "kevy.akpofure@example.com",
    role: "Full Stack Developer",
    department: "engineering",
    employeeType: "contract",
  },
];

const MarkAttendance = () => {
  const router = useRouter();
  const { setIsUpdatePayrollOpen } = useGlobalStore();

  const [searchValue, setSearchValue] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [contractFilter, setContractFilter] = useState("all");

  const todaysDate = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

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
      accessorKey: "action",
      header: todaysDate,
      cell: () => (
        <div onClick={(e) => e.stopPropagation()} className="flex items-center">
          <Input type="checkbox" className="w-4 h-4" />
        </div>
      ),
    },
  ];

  const handleRowClick = (id: string) => {
    console.log(`/employees/${id}`);
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
      <div className="mb-4 flex items-center justify-between gap-3 flex-wrap">
        <CustomSearch
          placeholder="Search employee"
          value={searchValue}
          setValue={setSearchValue}
        />

        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="default">Mark All Present</Button>

          <Button variant="outline">Mark as Non-Work Day</Button>
        </div>
      </div>

      <DataTable
        data={filteredData}
        columns={columns}
        handleRowClick={handleRowClick}
        placeholder="No employee found"
      />
    </div>
  );
};

export default MarkAttendance;
