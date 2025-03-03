import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/utils";
import { EncryptedData } from "@/lib/models";
import { auth } from "@/lib/auth";

export async function GET(req) {
  try {
    await connectToDB();
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const images = await EncryptedData.find({ userId: session.user.id }).sort({ createdAt: -1 });

    return NextResponse.json(images, { status: 200 });
  } catch (error) {
    console.error("Error fetching images:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
