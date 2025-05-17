import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
}

const ImageModal = ({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
}: ImageModalProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      // Lock body scroll when modal is open
      document.body.style.overflow = "hidden";
    } else {
      // Restore body scroll when modal is closed
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen && !isAnimating) return null;

  const handleAnimationEnd = () => {
    if (!isOpen) {
      setIsAnimating(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleBackdropClick}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-white hover:text-gray-300 transition-colors focus:outline-none"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="overflow-hidden rounded-lg bg-white">
          <img
            src={imageSrc || ""}
            alt={imageAlt}
            className="w-full h-auto max-h-[80vh] object-contain"
            onError={(e) => {
              console.error("Image failed to load:", imageSrc);
              e.currentTarget.src =
                "https://placehold.co/600x400?text=Image+Not+Available";
              // Prevent infinite error loops if placeholder also fails
              e.currentTarget.onerror = null;
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
