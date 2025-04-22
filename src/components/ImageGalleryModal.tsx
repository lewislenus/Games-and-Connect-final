import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  title: string;
  isPastEvent?: boolean;
  eventDate?: string;
  eventLocation?: string;
}

const ImageGalleryModal: React.FC<ImageGalleryModalProps> = ({
  isOpen,
  onClose,
  images,
  title,
  isPastEvent,
  eventDate,
  eventLocation,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen) return null;

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      handlePrevImage();
    } else if (e.key === "ArrowRight") {
      handleNextImage();
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-5xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {title} - Photo Gallery
          </h2>
          <button
            className="text-gray-600 hover:text-gray-900 transition-colors"
            onClick={onClose}
          >
            <X size={24} />
          </button>
        </div>

        {/* Main content */}
        <div className="flex flex-col md:flex-row h-[70vh]">
          {/* Large image view */}
          <div className="relative flex-grow flex items-center justify-center bg-gray-100 p-4">
            {images.length > 0 ? (
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={images[currentImageIndex]}
                  alt={`${title} - Gallery Image ${currentImageIndex + 1}`}
                  className="max-h-full max-w-full object-contain"
                />

                {/* Navigation buttons */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-2 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-2 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}

                {/* Image counter */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </div>
            ) : (
              <div className="text-gray-500 italic">No images available</div>
            )}
          </div>

          {/* Thumbnails sidebar */}
          <div className="w-full md:w-1/4 md:min-w-[200px] border-t md:border-t-0 md:border-l border-gray-200 overflow-y-auto p-2">
            <div className="grid grid-cols-2 gap-2">
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`cursor-pointer rounded-md overflow-hidden border-2 ${
                    currentImageIndex === index
                      ? "border-primary-500"
                      : "border-transparent"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer with event info for past events */}
        {isPastEvent && (
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <p className="text-gray-700">
              These photos were captured during our {title} event held on{" "}
              {eventDate} at {eventLocation}. Thank you to all participants who
              made this event memorable!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGalleryModal;
