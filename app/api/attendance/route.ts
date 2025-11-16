import { NextRequest, NextResponse } from "next/server";
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

    const attendanceList = employeeDoc?.employees.map((emp: any) => ({
      _id: emp._id,
      name: emp.name,
      email: emp.email,
      attendance: emp.attendance,
      role: emp.role,
      department: emp.department,
      contractType: emp.contractType,
    }));

    return NextResponse.json(
      {
        attendance: attendanceList,
        attendanceRecords: employeeDoc.attendanceRecords,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("attendance GET error:", error);
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const { employees } = await req.json();

  try {
    await connectDB();

    const userId = req.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const employeesDoc = await Employee.findOne({ userId });

    if (!employeesDoc) {
      return NextResponse.json("User not found", { status: 404 });
    }

    employeesDoc.employees.forEach((e: any) => {
      const match = employees.find((emp: any) => emp._id == e._id);
      if (match) {
        e.attendance = match.attendance;
      }
    });

    const presentEmps = employees.filter(
      (e: any) => e.attendance === "present"
    );
    const presentPercent = (presentEmps.length / employees.length) * 100;

    const today = new Date().toISOString().split("T")[0];
    const existingRecord = employeesDoc.attendanceRecords.find(
      (rec: any) => new Date(rec.date).toISOString().split("T")[0] === today
    );

    if (existingRecord) {
      existingRecord.value = presentPercent;
    } else {
      employeesDoc.attendanceRecords.push({
        date: new Date(), // use full Date object
        value: presentPercent,
      });
    }

    await employeesDoc.save();

    return NextResponse.json({ employee: employeesDoc }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json("Internal server error", { status: 500 });
  }
}
