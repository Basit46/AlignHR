import Employee from "@/models/Employee";
import { connectDB } from "@/utils/connectDB";
import { Groq } from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function GET(req: Request) {
  try {
    await connectDB();

    const userId = req.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    let employeeDoc = await Employee.findOne({ userId });

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `
                    You are a insight generator for an organisation.
                    Here is the organisation's employees (JSON): ${JSON.stringify(
                      employeeDoc.employees || []
                    )}

                    Return the insight **only in simple Markdown**.

                    Allowed:
                    - normal sentences
                    - paragraph spacing
                    - simple bullet points ("-")

                    Not allowed:
                    - tables
                    - code blocks
                    - numbered lists

                    All salary values are in ₦.
                `,
        },
      ],
      model: "openai/gpt-oss-20b",
      temperature: 1,
      max_completion_tokens: 8192,
      top_p: 1,
      stream: false,
      reasoning_effort: "medium",
    });

    return NextResponse.json({
      summary: chatCompletion.choices[0]?.message?.content || "",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
