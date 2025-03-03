"use client";
import { useState } from "react";

export default function DecryptionForm() {
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [password, setPassword] = useState("");
  const [decryptedText, setDecryptedText] = useState("");

  const handleDecrypt = async () => {
    if (!image) return alert("Please select an encrypted image");

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = async () => {
      const response = await fetch("/api/decrypt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: reader.result, password }),
      });

      const data = await response.json();
      if (response.ok) setDecryptedText(data.decryptedText);
      else alert(data.error);
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
    <div className="max-w-md mx-auto p-6 bg-black shadow-lg flex flex-col gap-4 ">
      <h2 className="text-xl font-bold text-center text-[#ffffffef]">Decrypt Your Image</h2>
      <input 
        type="file" 
        accept="image/*" 
        id="fileInput" 
        className="hidden" 
        onChange={handleImageChange} 
      />
      <label
        htmlFor="fileInput"
        className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md block text-center"
      >
        Choose File
      </label>
      {previewImage && (
        <div className="flex justify-center mt-3">
          <img src={previewImage} alt="Selected" className="w-32 h-32 object-cover rounded-md border" />
        </div>
      )}
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password (optional)"
        className="py-2 px-3 text-sm border border-gray-300 rounded mt-1 focus:ring focus:ring-purple-200"
      />
      <button
        onClick={handleDecrypt}
        className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-md outline-none mt-4"
      >
        Decrypt
      </button>
      {decryptedText && (
        <p className="text-center text-white bg-gray-800 p-3 rounded-lg mt-4">
          Decrypted Message: {decryptedText}
        </p>
      )}
    </div>
  );
}