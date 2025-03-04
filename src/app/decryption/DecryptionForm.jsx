"use client";
import { useState } from "react";

export default function DecryptionForm() {
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [password, setPassword] = useState("");
  const [decryptedText, setDecryptedText] = useState("");
  const [notification, setNotification] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 2000);
  };

  const handleDecrypt = async () => {
    if (!image) return showNotification("⚠️ Please select an encrypted image");

    setLoading(true); // Start loading

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = async () => {
      try {
        const response = await fetch("/api/decrypt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: reader.result, password }),
        });

        const data = await response.json();
        if (response.ok) {
          setDecryptedText(data.decryptedText);
          showNotification("✅ Decryption successful!");
        } else {
          showNotification("❌ Incorrect password or invalid image");
        }
      } catch (error) {
        showNotification("❌ Something went wrong. Try again!");
      } finally {
        setLoading(false); // Stop loading
      }
    };
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
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

      <h2 className="text-xl font-bold text-center text-[#ffffffef]">Decrypt Your Image</h2>

      {/* File Input */}
      <input
        type="file"
        accept="image/*"
        id="fileInput"
        className="hidden"
        onChange={handleImageChange}
        disabled={!!image || loading}
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

      {/* Password Input */}
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password (optional)"
        className="py-2 px-3 text-sm border border-gray-300 rounded mt-1 focus:ring focus:ring-purple-200"
        disabled={loading}
      />

      {/* Decrypt Button */}
      <button
        onClick={handleDecrypt}
        className={`bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-md outline-none mt-4 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Decrypting..." : "Decrypt"}
      </button>

      {/* Decrypted Text Output */}
      {decryptedText && (
        <p className="text-center text-white bg-gray-800 p-3 rounded-lg mt-4">
          Decrypted Message: {decryptedText}
        </p>
      )}
    </div>
  );
}
