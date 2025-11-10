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
import { formatDateWithSuffix } from "@/utils";
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

const employees = [
  {
    id: "EMP001",
    name: "Sarah Okafor",
    role: "Frontend Developer",
    department: "engineering",
    employeeType: "permanent",
    email: "sarah.okafor@example.com",
    phone: "+2348134459001",
    salary: 450000,
    onLeave: false,
    attendance: { daysPresent: 21, daysAbsent: 2 },
    dateJoined: "2023-05-10",
  },
  {
    id: "EMP002",
    name: "Michael Adeyemi",
    role: "HR Manager",
    department: "human-resources",
    employeeType: "permanent",
    email: "michael.adeyemi@example.com",
    phone: "+2348025567812",
    salary: 380000,
    onLeave: false,
    attendance: { daysPresent: 23, daysAbsent: 0 },
    dateJoined: "2022-08-15",
  },
  {
    id: "EMP003",
    name: "Grace Attah",
    role: "Marketing Associate",
    department: "marketing",
    employeeType: "contract",
    email: "grace.attah@example.com",
    phone: "+2347043221189",
    salary: 250000,
    onLeave: true,
    attendance: { daysPresent: 19, daysAbsent: 3 },
    dateJoined: "2024-01-20",
  },
  {
    id: "EMP004",
    name: "Toheeb Lawal",
    role: "Finance Analyst",
    department: "finance",
    employeeType: "intern",
    email: "toheeb.lawal@example.com",
    phone: "+2349054420099",
    salary: 120000,
    onLeave: false,
    attendance: { daysPresent: 18, daysAbsent: 4 },
    dateJoined: "2024-06-05",
  },
  {
    id: "EMP005",
    name: "Chiamaka Nwosu",
    role: "Operations Officer",
    department: "operations",
    employeeType: "permanent",
    email: "chiamaka.nwosu@example.com",
    phone: "+2348167884421",
    salary: 320000,
    onLeave: true,
    attendance: { daysPresent: 20, daysAbsent: 2 },
    dateJoined: "2021-11-11",
  },
  {
    id: "EMP006",
    name: "Kunle Balogun",
    role: "Backend Developer",
    department: "engineering",
    employeeType: "permanent",
    email: "kunle.balogun@example.com",
    phone: "+2348093341122",
    salary: 480000,
    onLeave: false,
    attendance: { daysPresent: 22, daysAbsent: 1 },
    dateJoined: "2023-02-14",
  },
  {
    id: "EMP007",
    name: "Aisha Sule",
    role: "QA Tester",
    department: "engineering",
    employeeType: "contract",
    email: "aisha.sule@example.com",
    phone: "+2348147789201",
    salary: 300000,
    onLeave: false,
    attendance: { daysPresent: 20, daysAbsent: 3 },
    dateJoined: "2024-03-10",
  },
  {
    id: "EMP008",
    name: "David Okon",
    role: "DevOps Engineer",
    department: "engineering",
    employeeType: "permanent",
    email: "david.okon@example.com",
    phone: "+2348021164478",
    salary: 550000,
    onLeave: true,
    attendance: { daysPresent: 19, daysAbsent: 4 },
    dateJoined: "2022-10-01",
  },
  {
    id: "EMP009",
    name: "Blessing Udo",
    role: "Talent Recruiter",
    department: "human-resources",
    employeeType: "permanent",
    email: "blessing.udo@example.com",
    phone: "+2348065332281",
    salary: 270000,
    onLeave: false,
    attendance: { daysPresent: 24, daysAbsent: 0 },
    dateJoined: "2023-12-01",
  },
  {
    id: "EMP010",
    name: "Stephen Ezugwu",
    role: "People Operations Associate",
    department: "human-resources",
    employeeType: "intern",
    email: "stephen.ezugwu@example.com",
    phone: "+2348162271044",
    salary: 100000,
    onLeave: false,
    attendance: { daysPresent: 17, daysAbsent: 5 },
    dateJoined: "2024-07-20",
  },
  {
    id: "EMP011",
    name: "Juliet Chukwu",
    role: "Accountant",
    department: "finance",
    employeeType: "permanent",
    email: "juliet.chukwu@example.com",
    phone: "+2348039923388",
    salary: 350000,
    onLeave: true,
    attendance: { daysPresent: 21, daysAbsent: 2 },
    dateJoined: "2023-04-11",
  },
  {
    id: "EMP012",
    name: "Samuel Akande",
    role: "Finance Officer",
    department: "finance",
    employeeType: "contract",
    email: "samuel.akande@example.com",
    phone: "+2348124459912",
    salary: 280000,
    onLeave: false,
    attendance: { daysPresent: 22, daysAbsent: 1 },
    dateJoined: "2024-02-05",
  },
  {
    id: "EMP013",
    name: "Rita Nnamdi",
    role: "Social Media Manager",
    department: "marketing",
    employeeType: "permanent",
    email: "rita.nnamdi@example.com",
    phone: "+2348105521177",
    salary: 260000,
    onLeave: false,
    attendance: { daysPresent: 20, daysAbsent: 2 },
    dateJoined: "2023-06-18",
  },
  {
    id: "EMP014",
    name: "Emmanuel Ajayi",
    role: "Content Writer",
    department: "marketing",
    employeeType: "intern",
    email: "emmanuel.ajayi@example.com",
    phone: "+2349056671233",
    salary: 90000,
    onLeave: false,
    attendance: { daysPresent: 18, daysAbsent: 4 },
    dateJoined: "2024-08-12",
  },
  {
    id: "EMP015",
    name: "Patricia Eze",
    role: "Performance Marketer",
    department: "marketing",
    employeeType: "contract",
    email: "patricia.eze@example.com",
    phone: "+2349035418821",
    salary: 300000,
    onLeave: true,
    attendance: { daysPresent: 21, daysAbsent: 2 },
    dateJoined: "2024-01-10",
  },
  {
    id: "EMP016",
    name: "Ibrahim Mohammed",
    role: "Sales Executive",
    department: "sales",
    employeeType: "permanent",
    email: "ibrahim.mohammed@example.com",
    phone: "+2348045322290",
    salary: 310000,
    onLeave: false,
    attendance: { daysPresent: 19, daysAbsent: 3 },
    dateJoined: "2022-09-14",
  },
  {
    id: "EMP017",
    name: "Ngozi Amadi",
    role: "Sales Representative",
    department: "sales",
    employeeType: "contract",
    email: "ngozi.amadi@example.com",
    phone: "+2348153392204",
    salary: 230000,
    onLeave: false,
    attendance: { daysPresent: 22, daysAbsent: 1 },
    dateJoined: "2024-03-28",
  },
  {
    id: "EMP018",
    name: "Opeyemi Afolabi",
    role: "Operations Supervisor",
    department: "operations",
    employeeType: "permanent",
    email: "opeyemi.afolabi@example.com",
    phone: "+2349024481176",
    salary: 340000,
    onLeave: false,
    attendance: { daysPresent: 21, daysAbsent: 1 },
    dateJoined: "2021-12-02",
  },
  {
    id: "EMP019",
    name: "Kelechi Okorie",
    role: "Logistics Coordinator",
    department: "operations",
    employeeType: "contract",
    email: "kelechi.okorie@example.com",
    phone: "+2348134420081",
    salary: 280000,
    onLeave: true,
    attendance: { daysPresent: 20, daysAbsent: 3 },
    dateJoined: "2023-10-10",
  },
  {
    id: "EMP020",
    name: "Mariam Bello",
    role: "Customer Support Agent",
    department: "customer-support",
    employeeType: "intern",
    email: "mariam.bello@example.com",
    phone: "+2348076612249",
    salary: 85000,
    onLeave: false,
    attendance: { daysPresent: 17, daysAbsent: 5 },
    dateJoined: "2024-09-01",
  },
  {
    id: "EMP021",
    name: "Chidera Obi",
    role: "Customer Support Officer",
    department: "customer-support",
    employeeType: "permanent",
    email: "chidera.obi@example.com",
    phone: "+2348092264421",
    salary: 200000,
    onLeave: false,
    attendance: { daysPresent: 23, daysAbsent: 0 },
    dateJoined: "2023-03-07",
  },
  {
    id: "EMP022",
    name: "James Ekanem",
    role: "Product Designer",
    department: "engineering",
    employeeType: "contract",
    email: "james.ekanem@example.com",
    phone: "+2348123458911",
    salary: 420000,
    onLeave: true,
    attendance: { daysPresent: 20, daysAbsent: 2 },
    dateJoined: "2024-04-15",
  },
  {
    id: "EMP023",
    name: "Felicia Moses",
    role: "Office Assistant",
    department: "operations",
    employeeType: "permanent",
    email: "felicia.moses@example.com",
    phone: "+2348067789921",
    salary: 150000,
    onLeave: true,
    attendance: { daysPresent: 22, daysAbsent: 1 },
    dateJoined: "2022-06-17",
  },
  {
    id: "EMP024",
    name: "Olaide Yusuf",
    role: "Financial Auditor",
    department: "finance",
    employeeType: "permanent",
    email: "olaide.yusuf@example.com",
    phone: "+2349013341188",
    salary: 390000,
    onLeave: false,
    attendance: { daysPresent: 21, daysAbsent: 1 },
    dateJoined: "2023-07-05",
  },
  {
    id: "EMP025",
    name: "Somto Nweke",
    role: "Marketing Strategist",
    department: "marketing",
    employeeType: "permanent",
    email: "somto.nweke@example.com",
    phone: "+2349097764412",
    salary: 310000,
    onLeave: false,
    attendance: { daysPresent: 23, daysAbsent: 0 },
    dateJoined: "2024-02-22",
  },
];

const Employees = () => {
  const router = useRouter();
  const { setIsAddEmployeeOpen, setIsDeleteEmployeeOpen } = useGlobalStore();

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
      accessorKey: "employeeType",
      header: "Contract type",
      cell: ({ row }) => {
        const value = row.original.employeeType;
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
          ₦{row.original.salary.toLocaleString()}
        </span>
      ),
    },

    {
      accessorKey: "attendance",
      header: "Attendance",
      cell: ({ row }) => {
        const present = row.original.attendance.daysPresent;
        const absent = row.original.attendance.daysAbsent;
        const percentage = Math.round((present / (present + absent)) * 100);

        return (
          <span className="text-gray-700">
            {present}/{present + absent} ({percentage}%)
          </span>
        );
      },
    },

    {
      accessorKey: "onLeave",
      header: "Leave status",
      cell: ({ row }) => (
        <Badge variant={row.original.onLeave ? "default" : "secondary"}>
          {row.original.onLeave ? "ON" : "OFF"}
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
              <button onClick={() => handleRowClick(row.original.id)}>
                <LucideEye className="text-pry" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View Employee</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={() => setIsDeleteEmployeeOpen(true)}>
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

  const handleRowClick = (id: string) => {
    router.push(`/employees/${id}`);
  };

  const filteredData = useMemo(() => {
    if (!employees) return [];

    return employees.filter((employee: any) => {
      const matchedName = employee.name
        ?.toLowerCase()
        .includes(searchValue.trim().toLowerCase());

      const matchedDept =
        deptFilter == "all" ? true : employee.department == deptFilter;

      const matchedContract =
        contractFilter == "all"
          ? true
          : employee.employeeType == contractFilter;

      return matchedName && matchedDept && matchedContract;
    });
  }, [employees, searchValue, deptFilter, contractFilter]);

  return (
    <div className="w-full px-[var(--main-px)] py-[20px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-medium text-[24px] leading-[1.2]">Employees</h1>
          <p className="text-gray-700">
            Manage and view the complete list of employees within the
            organisation
          </p>
        </div>

        <div className="flex gap-2 items-center">
          <Button variant={"outline"}>
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
          />
        </div>
      </div>
    </div>
  );
};

export default Employees;
