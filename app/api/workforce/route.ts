import Employee from "@/models/Employee";
import { connectDB } from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const userId = req.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const employeeDoc = await Employee.findOne({ userId });

    // Department definitions (value only)
    const departments = [
      "engineering",
      "human-resources",
      "finance",
      "marketing",
      "sales",
      "operations",
      "customer-support",
      "others",
    ];

    // Build initial dept map with zeros
    const deptMap: Record<string, { count: number; totalPay: number }> = {};
    departments.forEach((d) => {
      deptMap[d] = { count: 0, totalPay: 0 };
    });

    if (!employeeDoc) {
      return NextResponse.json(
        {
          membersData: departments.map((name) => ({
            name,
            percentage: 0,
            value: 0,
          })),
          payData: departments.map((name) => ({
            name,
            percentage: 0,
            value: 0,
          })),
        },
        { status: 200 }
      );
    }

    const employees = employeeDoc.employees;

    // Fill map with actual data
    employees.forEach((emp: any) => {
      const dept = emp.department || "others";
      if (!deptMap[dept]) return;

      deptMap[dept].count += 1;
      deptMap[dept].totalPay += (emp.basePay || 0) + (emp.addOns || 0);
    });

    const totalEmployees = employees.length || 1;
    const totalPay = Object.values(deptMap).reduce(
      (acc, d) => acc + d.totalPay,
      0
    );

    // Members dataset
    const membersData = departments.map((dept) => ({
      name: dept,
      value: deptMap[dept].count,
      percentage: Math.round((deptMap[dept].count / totalEmployees) * 100),
    }));

    // Pay dataset
    const payData = departments.map((dept) => ({
      name: dept,
      value: deptMap[dept].totalPay,
      percentage:
        totalPay === 0
          ? 0
          : Math.round((deptMap[dept].totalPay / totalPay) * 100),
    }));

    return NextResponse.json({ membersData, payData }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json("Internal server error", { status: 500 });
  }
}
