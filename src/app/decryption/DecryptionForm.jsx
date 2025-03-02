"use client";
import { useState } from "react";

export default function DecryptionForm() {
  const [image, setImage] = useState(null);
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

  return (
    <div>
      <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password (optional)" />
      <button onClick={handleDecrypt}>Decrypt</button>
      {decryptedText && <p>Decrypted Message: {decryptedText}</p>}
    </div>
  );
}
