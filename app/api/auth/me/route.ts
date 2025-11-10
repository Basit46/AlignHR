import { NextResponse } from "next/server";
import User from "@/models/User";
import { connectDB } from "@/utils/connectDB";
import { verifyToken } from "@/lib/jwt";

export async function GET(req: Request) {
  try {
    await connectDB();

    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1]!;
    const payload = verifyToken(token) as { sub: string };

    const user = await User.findById(payload.sub).select("-password").lean();

    if (!user) {
      return NextResponse.json({ user: null }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ user: null }, { status: 500 });
  }
}
