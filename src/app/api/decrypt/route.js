import { decryptData } from "@/utils/steganography";

export async function POST(req) {
  try {
    const { image, password } = await req.json();
    if (!image) return new Response(JSON.stringify({ error: "Image is required" }), { status: 400 });

    const buffer = Buffer.from(image.split(",")[1], "base64");
    const decryptedText = await decryptData(buffer, password);

    return new Response(JSON.stringify({ decryptedText }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Decryption failed" }), { status: 500 });
  }
}
