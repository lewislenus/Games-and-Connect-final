import React, { useState, useEffect, useRef, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Helmet } from "react-helmet-async";

interface ImageGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  title: string;
  initialIndex?: number;
  isPastEvent?: boolean;
  eventDate?: string;
  eventLocation?: string;
}

const ImageGalleryModal: React.FC<ImageGalleryModalProps> = ({
  isOpen,
  onClose,
  images,
  title,
  initialIndex = 0,
  isPastEvent,
  eventDate,
  eventLocation,
}) => {
  // Filter out any null, undefined or empty string image URLs
  const validImages = images.filter((img) => img && img.trim() !== "");

  // Use a safe initial index that's within bounds of the filtered array
  const safeInitialIndex =
    validImages.length > 0
      ? initialIndex < validImages.length
        ? initialIndex
        : 0
      : 0;

  const [currentImageIndex, setCurrentImageIndex] = useState(safeInitialIndex);
  const modalRef = useRef<HTMLDivElement>(null);

  const handlePrevImage = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? validImages.length - 1 : prev - 1
    );
  }, [validImages.length]);

  const handleNextImage = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === validImages.length - 1 ? 0 : prev + 1
    );
  }, [validImages.length]);

  // Effect to handle keyboard events globally
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyboardNavigation = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrevImage();
      } else if (e.key === "ArrowRight") {
        handleNextImage();
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyboardNavigation);
    return () => {
      window.removeEventListener("keydown", handleKeyboardNavigation);
    };
  }, [isOpen, onClose, handlePrevImage, handleNextImage]);

  if (!isOpen) return null;

  // Handle click outside to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    // Close only if clicking directly on the backdrop (not on the modal content)
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-primary-900 bg-opacity-90 z-50 flex items-center justify-center p-0"
      onClick={handleBackdropClick}
    >
      {isOpen && validImages.length > 0 && (
        <Helmet>
          <meta property="og:title" content={`${title} - Photo Gallery`} />
          <meta
            property="og:description"
            content={
              isPastEvent
                ? `Photos from our ${title} event held on ${eventDate} at ${eventLocation}`
                : `Photo gallery for ${title}`
            }
          />
          <meta property="og:image" content={validImages[currentImageIndex]} />
          <meta property="og:type" content="article" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={`${title} - Photo Gallery`} />
          <meta
            name="twitter:description"
            content={
              isPastEvent
                ? `Photos from our ${title} event held on ${eventDate} at ${eventLocation}`
                : `Photo gallery for ${title}`
            }
          />
          <meta name="twitter:image" content={validImages[currentImageIndex]} />
        </Helmet>
      )}
      <div
        ref={modalRef}
        className="relative bg-white rounded-lg shadow-lg w-[95vw] h-[95vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="p-3 sm:p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate">
            {title} - Photo Gallery
          </h2>
          <button
            className="text-gray-600 hover:text-gray-900 transition-colors p-2 touch-manipulation"
            onClick={onClose}
            aria-label="Close gallery"
          >
            <X size={24} />
          </button>
        </div>

        {/* Main content */}
        <div className="flex flex-col md:flex-row h-[80vh] md:h-[85vh] overflow-hidden">
          {/* Large image view */}
          <div className="relative flex-grow flex items-center justify-center bg-gray-100 p-0 overflow-hidden">
            {validImages.length > 0 ? (
              <div className="relative w-full h-full flex items-center justify-center overflow-auto">
                <img
                  src={validImages[currentImageIndex] || ""}
                  alt={`${title} - Gallery Image ${currentImageIndex + 1}`}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    width: "auto",
                    height: "auto",
                    objectFit: "contain",
                    display: "block",
                    margin: "0 auto",
                  }}
                  loading="lazy"
                  onError={(e) => {
                    console.error(
                      "Image failed to load:",
                      validImages[currentImageIndex]
                    );
                    e.currentTarget.src =
                      "https://placehold.co/600x400?text=Image+Not+Available";
                    // Prevent infinite error loops if placeholder also fails
                    e.currentTarget.onerror = null;
                  }}
                />

                {/* Navigation buttons - larger touch targets for mobile */}
                {validImages.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-2 p-2 sm:p-3 rounded-full bg-primary-900 bg-opacity-50 text-white hover:bg-opacity-70 transition-all touch-manipulation"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={20} className="sm:h-6 sm:w-6" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-2 p-2 sm:p-3 rounded-full bg-primary-900 bg-opacity-50 text-white hover:bg-opacity-70 transition-all touch-manipulation"
                      aria-label="Next image"
                    >
                      <ChevronRight size={20} className="sm:h-6 sm:w-6" />
                    </button>
                  </>
                )}

                {/* Image counter */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-primary-900 bg-opacity-50 text-white px-3 py-1 rounded-full text-xs sm:text-sm">
                  {currentImageIndex + 1} / {validImages.length}
                </div>
              </div>
            ) : (
              <div className="text-gray-500 italic text-sm sm:text-base">
                No images available
              </div>
            )}
          </div>

          {/* Thumbnails sidebar - horizontal on mobile, vertical on desktop */}
          <div className="w-full h-20 md:h-auto md:w-[15%] border-t md:border-t-0 md:border-l border-gray-200 overflow-x-auto md:overflow-y-auto md:overflow-x-hidden p-1">
            <div className="flex md:flex-col gap-1">
              {validImages.map((img, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 cursor-pointer rounded-md overflow-hidden border-2 ${
                    currentImageIndex === index
                      ? "border-primary-500"
                      : "border-transparent"
                  } h-[60px] md:h-[80px]`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img
                    src={img || ""}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      console.error("Thumbnail failed to load:", img);
                      e.currentTarget.src =
                        "https://placehold.co/200x200?text=Thumbnail";
                      // Prevent infinite error loops if placeholder also fails
                      e.currentTarget.onerror = null;
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer with event info for past events */}
        {isPastEvent && (
          <div className="p-3 sm:p-4 border-t border-gray-200 bg-gray-50">
            <p className="text-gray-700 text-sm sm:text-base">
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
