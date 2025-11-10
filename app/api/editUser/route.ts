export const runtime = "nodejs";

import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/connectDB";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const userId = req.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const { fullName, orgName, email } = await req.json();

    if (!fullName || !orgName || !email) {
      return NextResponse.json("Incomplete request body", { status: 400 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json("User not found", { status: 404 });
    }

    user.fullName = fullName;
    user.orgName = orgName;
    user.email = email.toLowerCase().trim();

    await user.save();

    const safeUser = await User.findById(userId).select("-password").lean();

    return NextResponse.json({ user: safeUser }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json("Server error", { status: 500 });
  }
}
