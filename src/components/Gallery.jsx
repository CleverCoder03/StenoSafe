"use client";
import { useEffect, useState } from "react";
import { deleteImage } from "@/lib/action"; // Import delete function

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // Store image ID for deletion
  const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch("/api/gallery");
      const data = await response.json();
      if (response.ok) setImages(data);
    };

    fetchImages();
  }, []);

  const openModal = (id) => {
    setSelectedImage(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    if (!selectedImage) return;

    const response = await deleteImage(selectedImage);

    if (response.success) {
      setImages(images.filter((img) => img._id !== selectedImage));
      // alert("Image deleted successfully!");
    } else {
      alert(response.error || "Failed to delete image.");
    }

    closeModal();
  };

  const handleDownload = async (imgUrl, imgName) => {
    try {
      const response = await fetch(imgUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = imgName || "encrypted-image.png"; // Set default name if not provided
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
      alert("Failed to download image.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-xl font-bold text-center text-white">Your Encrypted Images</h2>

      {images.length === 0 ? (
        <p className="text-center mt-4 text-white">No images found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {images.map((img) => (
            <div key={img._id} className="p-2 border rounded bg-gray-800">
              <img src={img.img} alt="Encrypted" className="w-full h-40 object-cover rounded" />
              <div className="flex justify-between mt-2 gap-2" >
                <button
                  onClick={() => openModal(img._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded text-sm w-1/2"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleDownload(img.img, `encrypted-${img._id}.png`)}
                  className="bg-purple-600 text-white px-2 py-1 rounded text-sm w-1/2"
                >
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Custom Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white text-center">
            <h3 className="text-lg font-bold">Are you sure?</h3>
            <p className="mt-2">Do you really want to delete this image?</p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 px-4 py-2 rounded text-white"
              >
                Yes, Delete
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-500 px-4 py-2 rounded text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
