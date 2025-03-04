"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import router for navigation

export default function EncryptionForm() {
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");
  const [encryptedImage, setEncryptedImage] = useState(null);
  const [notification, setNotification] = useState(""); // Notification state
  const [isEncrypting, setIsEncrypting] = useState(false); // Encryption loader
  const [isSaving, setIsSaving] = useState(false); // Saving loader

  const router = useRouter(); // Initialize router

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 5000); // Hide after 5 seconds
  };

  const handleImageChange = (e) => {
    if (image) return; // Restrict multiple uploads

    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleEncrypt = async () => {
    if (!image || !text) return showNotification("⚠️ Image and text are required");

    setIsEncrypting(true); // Show loading

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = async () => {
      const response = await fetch("/api/encrypt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: reader.result, text, password }),
      });

      const data = await response.json();
      setIsEncrypting(false); // Remove loading state

      if (response.ok) {
        setEncryptedImage(data.encryptedImage);
        showNotification("✅ Image encrypted successfully!");
      } else {
        showNotification("❌ Encryption failed");
      }
    };
  };

  const handleDownload = () => {
    if (!encryptedImage) return;
    const link = document.createElement("a");
    link.href = encryptedImage;
    link.download = "encrypted_image.png";
    link.click();
    showNotification("📥 Image downloaded!");
  };

  const handleSave = async () => {
    if (!encryptedImage) return showNotification("⚠️ No encrypted image to save");

    setIsSaving(true); // Start loading state

    try {
      const response = await fetch("/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ img: encryptedImage, password }),
      });

      const responseText = await response.text();
      console.log("Raw response:", responseText);

      const data = JSON.parse(responseText);
      setIsSaving(false); // Stop loading

      if (!response.ok) {
        showNotification("❌ Failed to save image");
        return;
      }

      showNotification("✅ Image saved to gallery!");
      setTimeout(() => {
        router.push("/gallery"); // Redirect to gallery page
      }, 2000);
    } catch (error) {
      console.error("Save error:", error);
      showNotification("❌ Something went wrong. Please try again.");
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-black shadow-lg flex flex-col gap-4">
      {/* Notification */}
      {notification && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg text-center transition-opacity duration-300">
          {notification}
        </div>
      )}

      <h2 className="text-xl font-bold text-center text-[#ffffffef]">Encrypt Your Image</h2>

      {/* File Input */}
      <input
        type="file"
        accept="image/*"
        id="fileInput"
        className="hidden"
        onChange={handleImageChange}
        disabled={!!image}
      />
      <label
        htmlFor="fileInput"
        className={`cursor-pointer bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md block text-center ${
          image ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {image ? "Image Selected" : "Choose File"}
      </label>

      {/* Image Preview */}
      {previewImage && (
        <div className="flex justify-center mt-3">
          <img src={previewImage} alt="Selected" className="w-32 h-32 object-cover rounded-md border" />
        </div>
      )}

      {/* Secret Text Input */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter secret text"
        className="py-2 px-3 text-sm border border-gray-300 rounded mt-1 focus:ring focus:ring-purple-200 resize-none h-36"
      />

      {/* Password Input */}
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password (optional)"
        className="py-2 px-3 text-sm border border-gray-300 rounded mt-1 focus:ring focus:ring-purple-200"
      />

      {/* Encrypted Image Preview */}
      {encryptedImage && (
        <div className="flex justify-center mt-3">
          <img src={encryptedImage} alt="Encrypted" className="w-32 h-32 object-cover rounded-md border" />
        </div>
      )}

      {/* Buttons */}
      {!encryptedImage ? (
        <button
          onClick={handleEncrypt}
          disabled={isEncrypting}
          className={`bg-purple-600 text-white font-medium py-2 rounded-md outline-none mt-4 ${
            isEncrypting ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-700"
          }`}
        >
          {isEncrypting ? "Encrypting..." : "Encrypt"}
        </button>
      ) : (
        <div className="flex flex-col gap-3">
          <button
            onClick={handleDownload}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md outline-none"
          >
            Download
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`bg-blue-600 text-white font-medium py-2 rounded-md outline-none ${
              isSaving ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            {isSaving ? "Saving..." : "Save to Gallery"}
          </button>
        </div>
      )}
    </div>
  );
}
