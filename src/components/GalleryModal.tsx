import React from "react";
import { X } from "lucide-react";

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
}

const GalleryModal: React.FC<GalleryModalProps> = ({
  isOpen,
  onClose,
  images,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-primary-900 bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full bg-white rounded-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-4">Event Gallery</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="aspect-square relative overflow-hidden rounded-lg"
              >
                <img
                  src={image || ""}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    console.error("Gallery image failed to load:", image);
                    e.currentTarget.src =
                      "https://placehold.co/600x400?text=Image+Not+Available";
                    // Prevent infinite error loops if placeholder also fails
                    e.currentTarget.onerror = null;
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryModal;
