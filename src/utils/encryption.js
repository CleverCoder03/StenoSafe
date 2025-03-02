import sharp from "sharp";
import { createCipheriv, createDecipheriv, randomBytes, createHash } from "crypto";

const ALGORITHM = "aes-256-cbc";

/**
 * Derives a 32-byte key from a password.
 * If no password is given, it defaults to hashing an empty string.
 */
function deriveKey(password) {
  return createHash("sha256").update(password || "").digest();
}

/**
 * Encrypt data and embed it inside an image.
 */
export async function encryptData(imageBuffer, text, password) {
  const iv = randomBytes(16);
  const key = deriveKey(password); // Ensures same derivation for empty passwords

  const cipher = createCipheriv(ALGORITHM, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  const binaryData = Buffer.from(encrypted, "hex");
  const metadata = {
    iv: iv.toString("hex"),
    encryptedLength: binaryData.length,
  };

  const metadataBuffer = Buffer.from(JSON.stringify(metadata));

  const image = sharp(imageBuffer);
  const { width, height } = await image.metadata();
  if (!width || !height) throw new Error("Invalid image dimensions");

  return image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
    .then(({ data, info }) => {
      const pixelData = new Uint8Array(data);
      const metadataLength = metadataBuffer.length;

      // Store metadata length in the first 4 bytes
      pixelData[0] = (metadataLength >> 24) & 0xff;
      pixelData[1] = (metadataLength >> 16) & 0xff;
      pixelData[2] = (metadataLength >> 8) & 0xff;
      pixelData[3] = metadataLength & 0xff;

      // Embed metadata
      for (let i = 0; i < metadataLength; i++) {
        pixelData[i + 4] = metadataBuffer[i];
      }

      // Embed encrypted data
      for (let i = 0; i < binaryData.length; i++) {
        pixelData[i + 4 + metadataLength] = binaryData[i];
      }

      return sharp(pixelData, {
        raw: { width: info.width, height: info.height, channels: 4 },
      })
        .png()
        .toBuffer();
    });
}

/**
 * Decrypt data from an encrypted image.
 */
export async function decryptData(imageBuffer, password) {
  const image = sharp(imageBuffer);
  const { data } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  const pixelData = new Uint8Array(data);
  const metadataLength =
    (pixelData[0] << 24) | (pixelData[1] << 16) | (pixelData[2] << 8) | pixelData[3];

  const metadataBuffer = Buffer.from(pixelData.slice(4, 4 + metadataLength));
  const metadata = JSON.parse(metadataBuffer.toString());

  const encryptedData = Buffer.from(
    pixelData.slice(4 + metadataLength, 4 + metadataLength + metadata.encryptedLength)
  );

  const iv = Buffer.from(metadata.iv, "hex");
  const key = deriveKey(password); // Ensures empty password decrypts same way

  const decipher = createDecipheriv(ALGORITHM, key, iv);
  let decrypted = decipher.update(encryptedData.toString("hex"), "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}
