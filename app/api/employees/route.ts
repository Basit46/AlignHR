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

    let employeeDoc = await Employee.findOne({ userId });

    if (!employeeDoc) {
      employeeDoc = await Employee.create({
        userId,
        employees: [],
      });

      return NextResponse.json(
        { employees: employeeDoc.employees },
        { status: 201 }
      );
    }

    return NextResponse.json(
      {
        employees: employeeDoc.employees.map((e: any) => ({
          ...e.toObject(),
          salary: e.basePay + e.addOns,
        })),
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json("Internal server error", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const userId = req.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const {
      employeeName,
      employeeEmail,
      phone,
      jobTitle,
      dept,
      contractType,
      basePay,
      addOns,
      dateJoined,
    } = await req.json();

    if (
      !employeeName ||
      !employeeEmail ||
      !phone ||
      !jobTitle ||
      !dept ||
      !contractType
    ) {
      return NextResponse.json(
        { error: "Incomplete form details" },
        { status: 400 }
      );
    }

    let employeeDoc = await Employee.findOne({ userId });

    if (!employeeDoc) {
      employeeDoc = await Employee.create({
        userId,
        employees: [],
      });
    }

    const newEmployee = {
      name: employeeName,
      email: employeeEmail,
      phoneNum: phone,
      role: jobTitle,
      department: dept,
      contractType,
      basePay: parseFloat(basePay),
      addOns: parseFloat(addOns),
      dateJoined: new Date(dateJoined),
      attendance: "n/a",
      isOnLeave: false,
    };

    employeeDoc.employees.push(newEmployee);

    await employeeDoc.save();

    return NextResponse.json(
      { employee: newEmployee, employees: employeeDoc.employees },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
