import React, { useState, useEffect } from "react";
import { storageService } from "../api/services/storageService";
import { eventService } from "../api/services/eventService";
import ImageGalleryModal from "./ImageGalleryModal";
import "./GallerySection.css";

// Cloudinary gallery images
const images = [
  {
    url: "https://res.cloudinary.com/drkjnrvtu/image/upload/v1742488675/_MG_1344_y4iq2a.jpg",
    caption: "Rainbow Vibes",
    className: "col-span-1 md:col-span-2 row-span-1",
  },
  {
    url: "https://res.cloudinary.com/drkjnrvtu/image/upload/v1742488675/_MG_1414_ij80mu.jpg",
    caption: "Lavender Dreams",
    className: "col-span-2 md:col-span-3 row-span-2",
  },
  {
    url: "https://res.cloudinary.com/drkjnrvtu/image/upload/v1742488675/_MG_1424_f0harp.jpg",
    caption: "Night Lights",
    className: "col-span-1 row-span-1",
  },
  {
    url: "https://res.cloudinary.com/drkjnrvtu/image/upload/v1742488675/_MG_1679_ovnanp.jpg",
    caption: "Cosmic Blue",
    className: "col-span-1 md:col-span-2 row-span-1",
  },
  {
    url: "https://res.cloudinary.com/drkjnrvtu/image/upload/v1742488675/_MG_1623_olhksw.jpg",
    caption: "Neon Glow",
    className: "col-span-2 row-span-1",
  },
  {
    url: "https://res.cloudinary.com/drkjnrvtu/image/upload/v1742488676/_MG_1656_yoiklo.jpg",
    caption: "Purple Haze",
    className: "col-span-1 row-span-1",
  },
  {
    url: "https://res.cloudinary.com/drkjnrvtu/image/upload/v1742488676/_MG_1677_v8n5nu.jpg",
    caption: "Electric Dreams",
    className: "col-span-2 row-span-2",
  },
  {
    url: "https://res.cloudinary.com/drkjnrvtu/image/upload/v1742488675/_MG_1684_pv0ohb.jpg",
    caption: "Starlit Dance",
    className: "col-span-1 row-span-1",
  },
  {
    url: "https://res.cloudinary.com/drkjnrvtu/image/upload/v1742488676/_MG_1758_mj5kho.jpg",
    caption: "Beach Party",
    className: "col-span-1 row-span-1",
  },
  {
    url: "https://res.cloudinary.com/drkjnrvtu/image/upload/v1742488676/_MG_1776_eob5jv.jpg",
    caption: "Sunset Vibes",
    className: "col-span-1 row-span-1",
  },
  {
    url: "https://res.cloudinary.com/drkjnrvtu/image/upload/v1742488676/back_k2fwpf.jpg",
    caption: "Community Fun",
    className: "col-span-1 row-span-1",
  },
];

interface GallerySectionProps {
  eventId?: string;
  title?: string;
  subtitle?: string;
  description?: string;
}

const GallerySection: React.FC<GallerySectionProps> = ({
  eventId,
  title = "Captured Moments",
  subtitle = "Our Gallery",
  description = "Experience the magic and energy of our events through these vibrant snapshots",
}) => {
  const [eventImages, setEventImages] = useState<
    Array<{ image_url: string; id: string }>
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Fetch event images when component mounts or eventId changes
  // This component now supports the 'Gallery' column from Supabase events table
  // The Gallery column can contain a single URL string or a JSON array of URLs
  useEffect(() => {
    if (eventId) {
      fetchEventImages(eventId);
    } else {
      // If no eventId provided, use the static images array
      setEventImages(
        images.map((img, index) => ({
          id: index.toString(),
          image_url: img.url,
        }))
      );
      setIsLoading(false);
    }
  }, [eventId]);

  const fetchEventImages = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // First try to get the event details to check for Gallery column
      const eventData = await eventService.getEvent(id);

      // Check if the event has a Gallery URL
      if (eventData && eventData.Gallery) {
        let galleryUrls: string[] = [];

        // Handle different formats of Gallery data
        if (typeof eventData.Gallery === "string") {
          try {
            // Try to parse as JSON if it's a JSON string
            galleryUrls = JSON.parse(eventData.Gallery);
          } catch (e) {
            console.log(
              "Gallery is not a JSON string, treating as URL:",
              eventData.Gallery
            );
            // If not valid JSON, treat as a single URL
            galleryUrls = [eventData.Gallery];
          }
        } else if (Array.isArray(eventData.Gallery)) {
          galleryUrls = eventData.Gallery;
        }

        // Filter out any empty or invalid URLs
        galleryUrls = galleryUrls.filter(
          (url) => url && typeof url === "string" && url.trim() !== ""
        );

        if (galleryUrls.length > 0) {
          // Convert URLs to the format expected by the component
          const formattedImages = galleryUrls.map((url, index) => ({
            id: `gallery-${index}`,
            image_url: url,
          }));

          setEventImages(formattedImages);
          setError(null);
          return; // Exit early if we successfully loaded gallery images
        }
        // If we get here, the Gallery field exists but contains no valid URLs
        console.log("Gallery field exists but contains no valid URLs");
      }

      // If no Gallery data or Gallery is empty, try the event's main image
      if (eventData && eventData.image_url) {
        setEventImages([
          {
            id: "main-image",
            image_url: eventData.image_url,
          },
        ]);
        return;
      }

      // As a last resort, fallback to storage service
      const imageData = await storageService.getEventImages(id);
      if (imageData && imageData.length > 0) {
        setEventImages(imageData);
      } else {
        // If still no images, set empty array and show a message
        setEventImages([]);
        setError("No gallery images found for this event.");
      }
    } catch (err) {
      console.error("Error fetching event images:", err);
      setError("Failed to load images. Please try again later.");
      // Set empty array to prevent rendering issues
      setEventImages([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Add a retry function for loading images
  const retryLoadImages = () => {
    if (eventId) {
      fetchEventImages(eventId);
    }
  };

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsGalleryModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsGalleryModalOpen(false);
  };

  // Prepare images for the gallery modal
  const galleryImages = eventImages.map((img) =>
    img.image_url?.replace("sb://", "https://")
  );

  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-black gallery-section">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="text-primary-400 font-semibold mb-4 block">
            {subtitle}
          </span>
          <h2 className="text-4xl font-bold mb-4 text-white">{title}</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">{description}</p>
        </div>

        {/* Error is now handled in the conditional rendering below */}

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
            <p className="text-gray-300 mt-4">Loading images...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 mb-2">{error}</p>
            <p className="text-gray-300 mb-4">
              No gallery images found for this event. The event may not have a
              Gallery URL configured.
            </p>
            <button
              onClick={retryLoadImages}
              className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-full transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : eventImages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-300">
              No gallery images available for this event. The event may not have
              a Gallery URL configured in the database.
            </p>
          </div>
        ) : (
          <div className="auto-scroll-gallery">
            <div className="gallery-track">
              {/* Duplicate images for seamless looping */}
              {[...eventImages, ...eventImages].map((image, index) => (
                <div
                  key={`${image.id || index}-${index}`}
                  className="gallery-item"
                  onClick={() => handleImageClick(index % eventImages.length)}
                >
                  <img
                    src={image.image_url}
                    loading="lazy"
                    alt={`Event image ${(index % eventImages.length) + 1}`}
                    className="gallery-image"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Use the ImageGalleryModal component instead of custom modal */}
        {isGalleryModalOpen && galleryImages.length > 0 && (
          <ImageGalleryModal
            isOpen={isGalleryModalOpen}
            onClose={handleCloseModal}
            images={galleryImages}
            initialIndex={selectedImageIndex}
            title={title}
            isPastEvent={false}
          />
        )}
      </div>
    </section>
  );
};

export default GallerySection;
