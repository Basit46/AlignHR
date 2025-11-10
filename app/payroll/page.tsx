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

const payroll = [
  {
    id: "EMP001",
    name: "Sarah Okafor",
    employeeId: "AX-1101",
    department: "engineering",
    employeeType: "permanent",
    basePay: 450000,
    addOns: 50000,
    taxId: "TX-39821",
    bankName: "GTBank",
    accountNumber: "0123456789",
  },
  {
    id: "EMP002",
    name: "Michael Adeyemi",
    employeeId: "AX-1102",
    department: "human-resources",
    employeeType: "permanent",
    basePay: 380000,
    addOns: 30000,
    taxId: "TX-44210",
    bankName: "Access Bank",
    accountNumber: "0987654321",
  },
  {
    id: "EMP003",
    name: "Grace Attah",
    employeeId: "AX-1103",
    department: "marketing",
    employeeType: "intern",
    basePay: 250000,
    addOns: 20000,
    taxId: null,
    taxRate: null,
    bankName: "Zenith Bank",
    accountNumber: "1122334455",
  },

  // ✅ 20 NEW RECORDS BELOW

  {
    id: "EMP004",
    name: "Toheeb Lawal",
    employeeId: "AX-1104",
    department: "finance",
    employeeType: "intern",
    basePay: 120000,
    addOns: 10000,
    taxId: null,
    taxRate: null,
    bankName: "UBA",
    accountNumber: "2211345566",
  },
  {
    id: "EMP005",
    name: "Chiamaka Nwosu",
    employeeId: "AX-1105",
    department: "operations",
    employeeType: "permanent",
    basePay: 320000,
    addOns: 30000,
    taxId: "TX-12345",
    bankName: "First Bank",
    accountNumber: "3344556677",
  },
  {
    id: "EMP006",
    name: "Kunle Balogun",
    employeeId: "AX-1106",
    department: "engineering",
    employeeType: "permanent",
    basePay: 480000,
    addOns: 40000,
    taxId: "TX-98761",
    bankName: "GTBank",
    accountNumber: "5566778899",
  },
  {
    id: "EMP007",
    name: "Aisha Sule",
    employeeId: "AX-1107",
    department: "engineering",
    employeeType: "contract",
    basePay: 300000,
    addOns: 25000,
    taxId: "TX-67331",
    bankName: "Access Bank",
    accountNumber: "6655443322",
  },
  {
    id: "EMP008",
    name: "David Okon",
    employeeId: "AX-1108",
    department: "engineering",
    employeeType: "permanent",
    basePay: 550000,
    addOns: 50000,
    taxId: "TX-55110",
    bankName: "Zenith Bank",
    accountNumber: "7788990011",
  },
  {
    id: "EMP009",
    name: "Blessing Udo",
    employeeId: "AX-1109",
    department: "human-resources",
    employeeType: "permanent",
    basePay: 270000,
    addOns: 20000,
    taxId: "TX-88341",
    bankName: "UBA",
    accountNumber: "9988776655",
  },
  {
    id: "EMP010",
    name: "Stephen Ezugwu",
    employeeId: "AX-1110",
    department: "human-resources",
    employeeType: "intern",
    basePay: 100000,
    addOns: 5000,
    taxId: null,
    taxRate: null,
    bankName: "Polaris Bank",
    accountNumber: "4455667788",
  },
  {
    id: "EMP011",
    name: "Juliet Chukwu",
    employeeId: "AX-1111",
    department: "finance",
    employeeType: "permanent",
    basePay: 350000,
    addOns: 30000,
    taxId: "TX-22419",
    bankName: "First Bank",
    accountNumber: "3322110099",
  },
  {
    id: "EMP012",
    name: "Samuel Akande",
    employeeId: "AX-1112",
    department: "finance",
    employeeType: "contract",
    basePay: 280000,
    addOns: 25000,
    taxId: "TX-11880",
    bankName: "GTBank",
    accountNumber: "4477992211",
  },
  {
    id: "EMP013",
    name: "Rita Nnamdi",
    employeeId: "AX-1113",
    department: "marketing",
    employeeType: "permanent",
    basePay: 260000,
    addOns: 15000,
    taxId: "TX-55198",
    bankName: "Fidelity Bank",
    accountNumber: "1133557799",
  },
  {
    id: "EMP014",
    name: "Emmanuel Ajayi",
    employeeId: "AX-1114",
    department: "marketing",
    employeeType: "intern",
    basePay: 90000,
    addOns: 5000,
    taxId: null,
    taxRate: null,
    bankName: "GTBank",
    accountNumber: "6677889900",
  },
  {
    id: "EMP015",
    name: "Patricia Eze",
    employeeId: "AX-1115",
    department: "marketing",
    employeeType: "contract",
    basePay: 300000,
    addOns: 20000,
    taxId: "TX-66211",
    bankName: "Access Bank",
    accountNumber: "9988001122",
  },
  {
    id: "EMP016",
    name: "Ibrahim Mohammed",
    employeeId: "AX-1116",
    department: "sales",
    employeeType: "permanent",
    basePay: 310000,
    addOns: 25000,
    taxId: "TX-21099",
    bankName: "First Bank",
    accountNumber: "0099887766",
  },
  {
    id: "EMP017",
    name: "Ngozi Amadi",
    employeeId: "AX-1117",
    department: "sales",
    employeeType: "contract",
    basePay: 230000,
    addOns: 20000,
    taxId: "TX-72155",
    bankName: "UBA",
    accountNumber: "2211003344",
  },
  {
    id: "EMP018",
    name: "Opeyemi Afolabi",
    employeeId: "AX-1118",
    department: "operations",
    employeeType: "permanent",
    basePay: 340000,
    addOns: 30000,
    taxId: "TX-91022",
    bankName: "Zenith Bank",
    accountNumber: "7766554433",
  },
  {
    id: "EMP019",
    name: "Kelechi Okorie",
    employeeId: "AX-1119",
    department: "operations",
    employeeType: "contract",
    basePay: 280000,
    addOns: 20000,
    taxId: "TX-18832",
    bankName: "Access Bank",
    accountNumber: "5544332211",
  },
  {
    id: "EMP020",
    name: "Mariam Bello",
    employeeId: "AX-1120",
    department: "customer-support",
    employeeType: "intern",
    basePay: 85000,
    addOns: 5000,
    taxId: null,
    taxRate: null,
    bankName: "Fidelity Bank",
    accountNumber: "7700112233",
  },
  {
    id: "EMP021",
    name: "Chidera Obi",
    employeeId: "AX-1121",
    department: "customer-support",
    employeeType: "permanent",
    basePay: 200000,
    addOns: 15000,
    taxId: "TX-99120",
    bankName: "GTBank",
    accountNumber: "6633441122",
  },
  {
    id: "EMP022",
    name: "James Ekanem",
    employeeId: "AX-1122",
    department: "engineering",
    employeeType: "contract",
    basePay: 420000,
    addOns: 35000,
    taxId: "TX-55291",
    bankName: "UBA",
    accountNumber: "5500998811",
  },
  {
    id: "EMP023",
    name: "Felicia Moses",
    employeeId: "AX-1123",
    department: "operations",
    employeeType: "permanent",
    basePay: 150000,
    addOns: 10000,
    taxId: "TX-33581",
    bankName: "First Bank",
    accountNumber: "4411223366",
  },
  {
    id: "EMP024",
    name: "Olaide Yusuf",
    employeeId: "AX-1124",
    department: "finance",
    employeeType: "permanent",
    basePay: 390000,
    addOns: 30000,
    taxId: "TX-77112",
    bankName: "Access Bank",
    accountNumber: "3300112244",
  },
  {
    id: "EMP025",
    name: "Somto Nweke",
    employeeId: "AX-1125",
    department: "marketing",
    employeeType: "permanent",
    basePay: 310000,
    addOns: 25000,
    taxId: "TX-55901",
    bankName: "Zenith Bank",
    accountNumber: "5500221100",
  },
];

const PayrollTable = () => {
  const router = useRouter();
  const { setIsUpdatePayrollOpen } = useGlobalStore();

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
          <p className="text-gray-600 text-xs">{row.original.employeeId}</p>
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
            ₦{total.toLocaleString()}
          </span>
        );
      },
    },

    {
      accessorKey: "basePay",
      header: "Base Pay",
      cell: ({ row }) => (
        <span className="text-gray-700">
          ₦{row.original.basePay.toLocaleString()}
        </span>
      ),
    },

    {
      accessorKey: "addOns",
      header: "Add-Ons",
      cell: ({ row }) => (
        <span className="text-gray-700">
          ₦{row.original.addOns.toLocaleString()}
        </span>
      ),
    },

    {
      accessorKey: "taxRate",
      header: "Tax",
      cell: ({ row }) => {
        const rate = row.original.taxRate;
        return (
          <span className="text-gray-700">
            {row.original.employeeType !== "intern" ? `12%` : "—"}
          </span>
        );
      },
    },

    {
      accessorKey: "taxId",
      header: "Tax ID",
      cell: ({ row }) => (
        <span className="text-gray-700">{row.original.taxId ?? "—"}</span>
      ),
    },

    {
      accessorKey: "bankName",
      header: "Bank",
      cell: ({ row }) => (
        <span className="text-gray-700">{row.original.bankName}</span>
      ),
    },

    {
      accessorKey: "accountNumber",
      header: "Account No.",
      cell: ({ row }) => (
        <span className="text-gray-700">{row.original.accountNumber}</span>
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
            onClick={() => setIsUpdatePayrollOpen(true)}
            variant={"outline"}
            className="h-[30px] text-xs"
          >
            Edit info
          </Button>
        </div>
      ),
    },
  ];

  const handleRowClick = (id: string) => {
    router.push(`/employees/${id}`);
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
          : employee.employeeType == contractFilter;

      return matchedName && matchedDept && matchedContract;
    });
  }, [payroll, searchValue, deptFilter, contractFilter]);

  return (
    <div className="w-full px-[var(--main-px)] py-[20px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-medium text-[24px] leading-[1.2]">Payroll</h1>
          <p className="text-gray-700">
            View payroll details, payment breakdowns, and salary information
          </p>
        </div>

        <div className="flex gap-2 items-center">
          <Button variant={"outline"}>
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
          />
        </div>
      </div>
    </div>
  );
};

export default PayrollTable;
