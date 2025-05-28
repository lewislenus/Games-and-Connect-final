import React, { useState, useEffect, useCallback } from 'react';

interface ImageCarouselProps {
  images: {
    url: string;
    caption?: string;
  }[];
  interval?: number; // Time between slides in ms
  showControls?: boolean;
  showIndicators?: boolean;
  overlay?: boolean;
  animationEffect?: 'fade' | 'zoom' | 'slide' | 'kenBurns';
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  interval = 5000,
  showControls = true,
  showIndicators = true,
  overlay = true,
  animationEffect = 'kenBurns'
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setTimeout(() => setIsTransitioning(false), 500); // Match this with CSS transition time
  }, [images.length, isTransitioning]);

  const goToPrevious = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    setTimeout(() => setIsTransitioning(false), 500); // Match this with CSS transition time
  }, [images.length, isTransitioning]);

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  useEffect(() => {
    if (interval <= 0) return;
    
    const timer = setInterval(() => {
      goToNext();
    }, interval);

    return () => clearInterval(timer);
  }, [goToNext, interval]);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Images */}
      {images.map((image, index) => {
        // Determine animation class based on the selected effect
        const isActive = index === currentIndex;
        let animationClass = '';
        
        if (isActive) {
          switch (animationEffect) {
            case 'zoom':
              animationClass = 'animate-zoom-in';
              break;
            case 'slide':
              animationClass = 'animate-slide-right';
              break;
            case 'kenBurns':
              // Alternate between different ken burns effects
              animationClass = index % 2 === 0 ? 'animate-ken-burns-1' : 'animate-ken-burns-2';
              break;
            case 'fade':
            default:
              animationClass = 'animate-fade-in';
              break;
          }
        }
        
        return (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={image.url}
              alt={image.caption || `Slide ${index + 1}`}
              className={`w-full h-full object-cover ${isActive ? animationClass : ''}`}
            />
            {overlay && <div className="absolute inset-0 bg-black/40"></div>}
            {image.caption && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/50 text-white">
                <p className="text-center">{image.caption}</p>
              </div>
            )}
          </div>
        );
      })}

      {/* Controls */}
      {showControls && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute z-20 left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 focus:outline-none transition-colors"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute z-20 right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 focus:outline-none transition-colors"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && (
        <div className="absolute z-20 bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
