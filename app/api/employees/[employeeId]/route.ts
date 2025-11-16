import Employee from "@/models/Employee";
import { connectDB } from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ employeeId: string }> }
) {
  const { employeeId } = await params;

  try {
    await connectDB();

    const userId = req.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    let employeeDoc = await Employee.findOne({ userId });
    const employee = employeeDoc.employees.find(
      (e: any) => e._id.toString() == employeeId
    );

    return NextResponse.json(
      {
        employee,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json("Internal server error", { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ employeeId: string }> }
) {
  const { employeeId } = await params;
  const updatedFields = await req.json();

  if ("isOnLeave" in updatedFields) {
    updatedFields.isOnLeave = updatedFields.isOnLeave === "ON";
  }

  try {
    await connectDB();

    const userId = req.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const updatedDoc = await Employee.findOneAndUpdate(
      { userId, "employees._id": employeeId },
      {
        $set: Object.fromEntries(
          Object.entries(updatedFields).map(([key, value]) => [
            `employees.$.${key}`,
            value,
          ])
        ),
      },
      { new: true }
    );

    if (!updatedDoc) {
      return NextResponse.json("Employee not found", { status: 404 });
    }

    const updatedEmployee = updatedDoc.employees.find(
      (e: any) => e._id.toString() === employeeId
    );

    return NextResponse.json({ employee: updatedEmployee }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json("Internal server error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ employeeId: string }> }
) {
  const { employeeId } = await params;

  try {
    await connectDB();

    const userId = req.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const updatedDoc = await Employee.findOneAndUpdate(
      { userId },
      { $pull: { employees: { _id: employeeId } } },
      { new: true }
    );

    if (!updatedDoc) {
      return NextResponse.json("Employee not found", { status: 404 });
    }

    return NextResponse.json(
      { message: "Employee deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json("Internal server error", { status: 500 });
  }
}
