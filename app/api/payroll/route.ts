import { NextResponse } from "next/server";
import { connectDB } from "@/utils/connectDB";
import Employee from "@/models/Employee";

export async function GET(req: Request) {
  try {
    await connectDB();

    const userId = req.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const employeeDoc = await Employee.findOne({ userId });

    if (!employeeDoc) {
      return NextResponse.json(
        { message: "No employees found" },
        { status: 404 }
      );
    }

    const payrollEmployees = employeeDoc?.employees.map((emp: any) => ({
      _id: emp._id,
      name: emp.name,
      email: emp.email,
      basePay: emp.basePay,
      addOns: emp.addOns,
      taxId: emp.taxId,
      bankName: emp.bankName,
      accountNo: emp.accountNo,
      department: emp.department,
      contractType: emp.contractType,
    }));

    return NextResponse.json({ payroll: payrollEmployees }, { status: 200 });
  } catch (error) {
    console.error("Payroll GET error:", error);
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}
