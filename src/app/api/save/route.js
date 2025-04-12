import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/utils";
import { EncryptedData } from "@/lib/models";
import { auth } from "@/lib/auth";
import mongoose from "mongoose";
import { nanoid } from "nanoid";

export async function POST(req) {
  try {
    await connectToDB();
    const session = await auth();

    console.log("User session:", session); // Debugging

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Ensure userId is a valid MongoDB ObjectId
    const userId = session.user.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const { img, password } = await req.json();

    console.log("Received request body:", { img, password }); // Debugging

    if (!img) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    const newEncryptedImage = new EncryptedData({
      img,
      password: password || null,
      userId: new mongoose.Types.ObjectId(userId),
      slug: nanoid(10),
    });

    console.log("Saving to DB:", newEncryptedImage); // Debugging
    await newEncryptedImage.save();

    return NextResponse.json({ message: "Image saved successfully!" }, { status: 201 });
  } catch (error) {
    console.error("Error saving image:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
