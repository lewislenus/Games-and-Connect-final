import React, { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import "./GallerySection.css";

// Import gallery images
import img1344 from "../assets/img/_MG_1344.jpg";
import img1414 from "../assets/img/_MG_1414.jpg";
import img1424 from "../assets/img/_MG_1424.jpg";
import img1614 from "../assets/img/_MG_1614.jpg";
import img1623 from "../assets/img/_MG_1623.jpg";
import img1656 from "../assets/img/_MG_1656.jpg";
import img1677 from "../assets/img/_MG_1677.jpg";
import img1679 from "../assets/img/_MG_1679.jpg";

const images = [
  {
    url: img1344,
    caption: "Rainbow Vibes",
    className: "col-span-1 md:col-span-2 row-span-1",
  },
  {
    url: img1414,
    caption: "Lavender Dreams",
    className: "col-span-2 md:col-span-3 row-span-2",
  },
  {
    url: img1424,
    caption: "Night Lights",
    className: "col-span-1 row-span-1",
  },
  {
    url: img1614,
    caption: "Cosmic Blue",
    className: "col-span-1 md:col-span-2 row-span-1",
  },
  {
    url: img1623,
    caption: "Neon Glow",
    className: "col-span-2 row-span-1",
  },
  {
    url: img1656,
    caption: "Purple Haze",
    className: "col-span-1 row-span-1",
  },
  {
    url: img1677,
    caption: "Electric Dreams",
    className: "col-span-2 row-span-2",
  },
  {
    url: img1679,
    caption: "Starlit Dance",
    className: "col-span-1 row-span-1",
  },
];

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handlePrevImage = useCallback(() => {
    if (selectedImage !== null) {
      setSelectedImage(
        selectedImage === 0 ? images.length - 1 : selectedImage - 1
      );
    }
  }, [selectedImage]);

  const handleNextImage = useCallback(() => {
    if (selectedImage !== null) {
      setSelectedImage(
        selectedImage === images.length - 1 ? 0 : selectedImage + 1
      );
    }
  }, [selectedImage]);

  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage !== null) {
        if (e.key === "ArrowLeft") {
          handlePrevImage();
        } else if (e.key === "ArrowRight") {
          handleNextImage();
        } else if (e.key === "Escape") {
          handleCloseModal();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, handlePrevImage, handleNextImage]);

  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="text-primary-400 font-semibold mb-4 block">
            Our Gallery
          </span>
          <h2 className="text-4xl font-bold mb-4 text-white">
            Captured Moments
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Experience the magic and energy of our events through these vibrant
            snapshots
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[200px]">
          {images.map((image, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl ${image.className} cursor-pointer`}
              onClick={() => handleImageClick(index)}
            >
              <img
                src={image.url}
                srcSet={image.srcSet}
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
                alt={image.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          ))}
        </div>

        {selectedImage !== null && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
            onClick={handleModalClick}
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-white hover:text-primary-400 transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-primary-400 transition-colors"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-primary-400 transition-colors"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
            <div className="max-w-7xl max-h-[90vh] w-full h-full relative">
              <img
                src={images[selectedImage].url}
                alt={images[selectedImage].caption}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;
