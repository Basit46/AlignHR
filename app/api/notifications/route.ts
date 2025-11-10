export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/connectDB";
import Notification from "@/models/Notification";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const userId = req.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const notifications = await Notification.find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ notifications }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json("Server error", { status: 500 });
  }
}

// Mark all user notifications as read
export async function PUT(req: NextRequest) {
  try {
    await connectDB();

    const userId = req.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    // Update all unread notifications in one query
    const result = await Notification.updateMany(
      { userId, isRead: false },
      { $set: { isRead: true } }
    );

    return NextResponse.json(
      {
        modifiedCount: result.modifiedCount,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json("Server error", { status: 500 });
  }
}
