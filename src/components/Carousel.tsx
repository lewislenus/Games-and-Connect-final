import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Import header images
import img1 from "../assets/header/_MG_1424.jpg";
import img2 from "../assets/header/_MG_1758.jpg";
import img3 from "../assets/header/_MG_6671.jpg";
import img4 from "../assets/header/_MG_6773.jpg";

interface CarouselProps {
  className?: string;
}

const images = [img1, img2, img3, img4];

const Carousel: React.FC<CarouselProps> = ({ className = "" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, []);

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    if (isAutoPlaying) {
      intervalId = setInterval(nextSlide, 5000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isAutoPlaying, nextSlide]);

  return (
    <div
      className={`fixed inset-0 w-full h-screen overflow-hidden ${className}`}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Add dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70 z-10"></div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <motion.img
            src={images[currentIndex]}
            srcSet={imageSrcSets[currentIndex]}
            sizes="100vw"
            loading={currentIndex === 0 ? 'eager' : 'lazy'}
            alt={`Slide ${currentIndex + 1}`}
            className="w-full h-full object-cover"
            initial={{ filter: "blur(8px)", scale: 1.2 }}
            animate={{ filter: "blur(0px)", scale: 1.05 }}
            transition={{
              duration: 0.8,
              scale: {
                duration: 6,
                ease: "easeOut",
                repeat: Infinity,
                repeatType: "reverse",
              },
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* <div className="absolute inset-0 bg-gradient-to-r from-primary-900/70 to-secondary-900/50 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Welcome to Games Day</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Join us for an exciting day of gaming, competition, and community!
          </p>
        </div>
      </div> */}

      <motion.button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/30 text-white hover:bg-white/50"
        aria-label="Previous slide"
        whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.5)" }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <ChevronLeft className="h-6 w-6" />
      </motion.button>

      <motion.button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/30 text-white hover:bg-white/50"
        aria-label="Next slide"
        whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.5)" }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <ChevronRight className="h-6 w-6" />
      </motion.button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 0.9 }}
            animate={index === currentIndex ? { scale: 1.2 } : { scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
