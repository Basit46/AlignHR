import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectDB } from "@/utils/connectDB";
import Notification from "@/models/Notification";

export async function POST(req: Request) {
  try {
    const { email, password, fullName, orgName } = await req.json();

    if (!email || !password || !fullName || !orgName) {
      return NextResponse.json(
        { error: "Form details required" },
        { status: 400 }
      );
    }

    await connectDB();

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing)
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 409 }
      );

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      email: email.toLowerCase().trim(),
      password: hashed,
      fullName,
      orgName,
    });

    await Notification.create({
      userId: user?._id,
      type: "welcome",
      title: "Welcome to AlignHR",
      message:
        "Your AlignHR admin workspace is ready. Start managing employees and tracking operations.",
    });

    return NextResponse.json(
      { user: { id: user._id?.toString(), email: user.email } },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
