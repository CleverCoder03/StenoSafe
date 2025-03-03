import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/utils";
import { EncryptedData } from "@/lib/models";
import { auth } from "@/lib/auth"; // Ensure authentication
import { nanoid } from "nanoid";

export async function POST(req) {
  try {
    await connectToDB();
    const session = await auth(); // Get logged-in user session

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { img, password } = body;

    if (!img) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    const newEncryptedImage = new EncryptedData({
      img,
      password: password || null,
      userId: session.user.id,
      slug: nanoid(10),
    });

    await newEncryptedImage.save();
    return NextResponse.json({ message: "Image saved successfully!" }, { status: 201 });
  } catch (error) {
    console.error("Error saving image:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
