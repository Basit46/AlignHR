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

    //Employee counts
    const now = new Date();
    const currentMonth = now.getMonth();
    const lastMonth = (currentMonth - 1 + 12) % 12;
    const currentYear = now.getFullYear();
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const currentMonthEmployees = employees.filter((emp: any) => {
      const date = new Date(emp.dateJoined);
      return (
        date.getMonth() === currentMonth && date.getFullYear() === currentYear
      );
    });

    const lastMonthEmployees = employees.filter((emp: any) => {
      const date = new Date(emp.dateJoined);
      return (
        date.getMonth() === lastMonth && date.getFullYear() === lastMonthYear
      );
    });

    const currentCount = currentMonthEmployees.length;
    const lastCount = lastMonthEmployees.length;

    let percentChange = 0;
    let trend: "up" | "down" = "up";

    if (lastCount === 0 && currentCount > 0) {
      percentChange = 100;
      trend = "up";
    } else if (lastCount === 0 && currentCount === 0) {
      percentChange = 0;
      trend = "up";
    } else {
      percentChange = ((currentCount - lastCount) / lastCount) * 100;
      trend = percentChange > 0 ? "up" : percentChange < 0 ? "down" : "up";
    }

    //Leaves
    const employeesOnLeave = employees.filter((e: any) => e.isOnLeave);
    const leavePercentChange =
      (employeesOnLeave.length / employees.length) * 100;
    const leaveTrend = leavePercentChange >= 0 ? "up" : "down";

    //Payroll
    const totalPayrollAmount =
      employees.reduce(
        (acc: number, e: any) => acc + (e.basePay || 0) + (e.addOns || 0),
        0
      ) || 0;

    //Attendance
    const employeesPresent = employees.filter(
      (e: any) => e.attendance == "present"
    );
    const attendanceChange = (employeesPresent.length / employees.length) * 100;
    const attendanceTrend = attendanceChange >= 0 ? "up" : "down";

    return NextResponse.json(
      {
        employees: {
          number: employees.length,
          percentChange: percentChange.toFixed(0),
          trend,
        },

        leaves: {
          number: employeesOnLeave.length,
          leavePercentChange: leavePercentChange.toFixed(0),
          leaveTrend,
        },

        payroll: {
          number: totalPayrollAmount,
        },

        attendance: {
          all: employees.length,
          number: employeesPresent.length,
          percentChange: attendanceChange.toFixed(0),
          trend: attendanceTrend,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json("Internal server error", { status: 500 });
  }
}
