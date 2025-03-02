import { encryptData } from "@/utils/encryption";

export async function POST(req) {
  try {
    const { image, text, password } = await req.json();
    if (!image || !text) return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });

    const buffer = Buffer.from(image.split(",")[1], "base64");
    const encryptedImage = await encryptData(buffer, text, password);

    return new Response(
      JSON.stringify({ encryptedImage: `data:image/png;base64,${encryptedImage.toString("base64")}` }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Encryption failed" }), { status: 500 });
  }
}
