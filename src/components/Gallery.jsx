"use client";
import { useEffect, useState } from "react";

export default function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch("/api/gallery");
      const data = await response.json();
      if (response.ok) setImages(data);
    };

    fetchImages();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-xl font-bold text-center text-white">Your Encrypted Images</h2>
      {images.length === 0 ? (
        <p className="text-center mt-4 text-white">No images found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {images.map((img) => (
            <div key={img._id} className="p-2 border rounded">
              <img src={img.img} alt="Encrypted" className="w-full h-40 object-cover rounded" />
              {/* <p className="text-xs text-center mt-2 ">{img.slug}</p> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
