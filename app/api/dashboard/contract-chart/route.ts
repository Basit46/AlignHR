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
    if (!employeeDoc) {
      return NextResponse.json("User not found", { status: 404 });
    }

    const employees = employeeDoc.employees;

    const permanent = employees.filter(
      (emp: any) => emp.contractType == "permanent"
    );
    const contract = employees.filter(
      (emp: any) => emp.contractType == "contract"
    );
    const intern = employees.filter((emp: any) => emp.contractType == "intern");

    return NextResponse.json(
      {
        chart: [
          {
            name: "Permanent",
            value: permanent.length || 0,
            fill: "var(--pry)",
          },
          { name: "Intern", value: intern.length || 0, fill: "var(--success)" },
          { name: "Contract", value: contract.length || 0, fill: "var(--sec)" },
        ],
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json("Internal server error", { status: 500 });
  }
}
