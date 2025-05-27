import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Clock } from "lucide-react";
import AnimatedLink from "./AnimatedLink";
import ImageGalleryModal from "./ImageGalleryModal";

interface EventCardProps {
  id?: string | number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  price?: string;
  capacity?: string;
  isPast?: boolean;
  gallery?: string[]; // Add gallery prop
}

const EventCard: React.FC<EventCardProps> = ({
  id,
  title,
  date,
  time,
  location,
  description,
  image,
  price,
  capacity,
  isPast = false,
  gallery = [],
}) => {
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Prepare the gallery images array
  const galleryImages = gallery.length > 0 ? gallery : [image];

  // Function to move to the next image
  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Setup auto-scrolling effect
  useEffect(() => {
    if (isAutoScrolling && galleryImages.length > 1) {
      autoScrollTimerRef.current = setInterval(() => {
        goToNextImage();
      }, 3000); // Change image every 3 seconds
    }

    return () => {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current);
        autoScrollTimerRef.current = null;
      }
    };
  }, [isAutoScrolling, galleryImages.length]);
  return (
    <div className="card group h-full flex flex-col shadow-sm hover:shadow-md transition-shadow duration-300 rounded-lg overflow-hidden">
      {/* Card image with overlay */}
      <div
        className="relative mb-3 sm:mb-4 overflow-hidden cursor-pointer"
        onClick={() => {
          if (galleryImages.length > 1) {
            setIsAutoScrolling(false);
            setIsGalleryModalOpen(true);
          }
        }}
        onMouseEnter={() => setIsAutoScrolling(false)}
        onMouseLeave={() => setIsAutoScrolling(true)}
      >
        <img
          src={galleryImages[currentImageIndex]}
          alt={title}
          className="w-full h-40 sm:h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/600x400?text=No+Image";
            console.log(`Image failed to load for event: ${title}`);
          }}
        />

        {/* Image navigation dots for gallery */}
        {galleryImages.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-1">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                  setIsAutoScrolling(false);
                  setTimeout(() => setIsAutoScrolling(true), 5000);
                }}
                className={`h-2 w-2 rounded-full ${
                  currentImageIndex === index ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
        {isPast ? (
          <div className="absolute inset-0 bg-primary-900 bg-opacity-60 flex items-center justify-center">
            <span className="text-white text-sm sm:text-lg font-semibold px-3 py-1.5 sm:px-4 sm:py-2 bg-primary-600 rounded">
              Past Event
            </span>
          </div>
        ) : (
          <div className="absolute top-2 right-2">
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Upcoming
            </span>
          </div>
        )}
      </div>
      <div
        className={`p-3 sm:p-4 flex-grow flex flex-col ${
          isPast ? "bg-gray-50" : "bg-white"
        }`}
      >
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg sm:text-xl font-bold line-clamp-2">{title}</h3>
          {/* Status indicator */}
          <span
            className={`text-xs font-medium px-2 py-1 rounded ${
              isPast
                ? "bg-gray-200 text-gray-700"
                : "bg-green-100 text-green-800"
            }`}
          >
            {isPast ? "Past" : "Upcoming"}
          </span>
        </div>
        <div className="mb-4 space-y-2 text-gray-600">
          <div className="flex items-center">
            <Calendar
              className={`h-4 w-4 mr-2 flex-shrink-0 ${
                isPast ? "text-gray-500" : "text-primary-600"
              }`}
            />
            <span className="text-xs sm:text-sm">{date}</span>
          </div>
          <div className="flex items-center">
            <Clock
              className={`h-4 w-4 mr-2 flex-shrink-0 ${
                isPast ? "text-gray-500" : "text-primary-600"
              }`}
            />
            <span className="text-xs sm:text-sm">{time}</span>
          </div>
          <div className="flex items-center">
            <MapPin
              className={`h-4 w-4 mr-2 flex-shrink-0 ${
                isPast ? "text-gray-500" : "text-primary-600"
              }`}
            />
            <span className="text-xs sm:text-sm truncate">{location}</span>
          </div>
          {price && (
            <div className="flex items-center">
              <span
                className={`font-semibold text-xs sm:text-sm ${
                  isPast ? "text-gray-600" : "text-primary-600"
                }`}
              >
                {price}
              </span>
            </div>
          )}
          {capacity && (
            <div className="flex items-center text-xs sm:text-sm">
              <span>{capacity}</span>
            </div>
          )}
        </div>
        <p className="text-gray-700 mb-4 flex-grow text-xs sm:text-sm line-clamp-3">
          {description}
        </p>
        <div className="flex flex-col space-y-2 mt-auto">
          {!isPast ? (
            <AnimatedLink
              to={id ? `/events/${id}` : "/events"}
              className="btn btn-primary w-full text-center py-2 text-sm"
            >
              View Details
            </AnimatedLink>
          ) : (
            <>
              <Link
                to={id ? `/events/${id}` : "/events"}
                className="btn btn-outline w-full text-center py-2 text-sm"
              >
                View Details
              </Link>
              {/* View Gallery button removed */}
            </>
          )}
        </div>

        {/* Gallery Modal */}
        {isGalleryModalOpen && (
          <ImageGalleryModal
            isOpen={isGalleryModalOpen}
            onClose={() => {
              setIsGalleryModalOpen(false);
              setIsAutoScrolling(true);
            }}
            images={galleryImages}
            initialIndex={currentImageIndex}
            title={title}
            isPastEvent={isPast}
            eventDate={date}
            eventLocation={location}
          />
        )}
      </div>
    </div>
  );
};

export default EventCard;
