"use client";
import { useState } from "react";

export default function EncryptionForm() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");
  const [encryptedImage, setEncryptedImage] = useState(null);

  const handleEncrypt = async () => {
    if (!image || !text) return alert("Image and text are required");

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = async () => {
      const response = await fetch("/api/encrypt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: reader.result, text, password }),
      });

      const data = await response.json();
      if (response.ok) setEncryptedImage(data.encryptedImage);
      else alert(data.error);
    };
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter secret text" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password (optional)" />
      <button onClick={handleEncrypt}>Encrypt</button>
      {encryptedImage && <img src={encryptedImage} alt="Encrypted" />}
    </div>
  );
}
