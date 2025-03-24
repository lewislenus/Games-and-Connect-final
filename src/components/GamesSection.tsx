import React, { useEffect, useRef } from "react";

// Import game images
import beachImg from "../assets/img/beach.jpg"; // Using available images as placeholders
import aburiImg from "../assets/img/Aburi.jpg";
import akosomboImg from "../assets/img/Akosombo.jpg";
import mg1344Img from "../assets/img/_MG_1344.jpg";
import mg1414Img from "../assets/img/_MG_1414.jpg";
import mg1424Img from "../assets/img/_MG_1424.jpg";
import mg1614Img from "../assets/img/_MG_1614.jpg";
import mg1623Img from "../assets/img/_MG_1623.jpg";
import mg1656Img from "../assets/img/_MG_1656.jpg";
import mg1677Img from "../assets/img/_MG_1677.jpg";
import mg1679Img from "../assets/img/_MG_1679.jpg";

const games = [
  { name: "Air Max", image: beachImg, id: 1, skillLevel: "Beginner" },
  { name: "Blazer", image: aburiImg, id: 2, skillLevel: "Intermediate" },
  { name: "Air Jordan 1", image: akosomboImg, id: 3, skillLevel: "Advanced" },
  { name: "Dunk", image: mg1344Img, id: 4, skillLevel: "Beginner" },
  { name: "Air Force 1", image: mg1414Img, id: 5, skillLevel: "Intermediate" },
  { name: "Football", image: mg1424Img, id: 6, skillLevel: "Intermediate" },
  { name: "Dart", image: mg1614Img, id: 7, skillLevel: "Beginner" },
  { name: "Limbo", image: mg1623Img, id: 8, skillLevel: "Beginner" },
  { name: "Table Tennis", image: mg1656Img, id: 9, skillLevel: "Intermediate" },
  { name: "Swimming", image: mg1677Img, id: 10, skillLevel: "Advanced" },
  { name: "Jenga", image: mg1679Img, id: 11, skillLevel: "Beginner" },
  { name: "Uno", image: mg1424Img, id: 12, skillLevel: "Beginner" },
  { name: "Cards", image: mg1614Img, id: 13, skillLevel: "Beginner" },
  { name: "Sack Race", image: mg1623Img, id: 14, skillLevel: "Beginner" },
  {
    name: "Shooting Range",
    image: mg1656Img,
    id: 15,
    skillLevel: "Intermediate",
  },
];

// Filter to show only games (not shoes)
const gameItems = games.filter((game) => game.id >= 6);

const GamesSection: React.FC = () => {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const scrollSpeed = 1; // pixels per interval
  const scrollInterval = 30; // milliseconds
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isHovering = useRef(false);

  // Function to handle automatic scrolling
  const startAutoScroll = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }

    autoScrollRef.current = setInterval(() => {
      if (scrollContainer.current && !isHovering.current) {
        // Check if we've reached the end, if so, reset to beginning
        if (
          scrollContainer.current.scrollLeft +
            scrollContainer.current.clientWidth >=
          scrollContainer.current.scrollWidth
        ) {
          scrollContainer.current.scrollLeft = 0;
        } else {
          scrollContainer.current.scrollLeft += scrollSpeed;
        }
      }
    }, scrollInterval);
  };

  // Set up auto-scrolling when component mounts
  useEffect(() => {
    startAutoScroll();

    // Clean up interval on unmount
    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, []);

  // Handle mouse events to pause scrolling when hovering
  const handleMouseEnter = () => {
    isHovering.current = true;
  };

  const handleMouseLeave = () => {
    isHovering.current = false;
  };

  return (
    <section className="bg-black py-16 w-full">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Our Games Collection
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Explore our variety of exciting games and activities for all skill
            levels
          </p>
        </div>

        <div className="relative overflow-hidden">
          {/* Games carousel with auto-scroll */}
          <div
            ref={scrollContainer}
            className="flex overflow-x-auto pb-8 hide-scrollbar gap-6"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {gameItems.map((game, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-64 md:w-72 transition-transform duration-300 hover:scale-105 relative"
              >
                {index === 2 && (
                  <div className="absolute top-2 right-2 z-10 text-xs bg-white text-black px-2 py-1 rounded-full">
                    Featured
                  </div>
                )}
                <div className="bg-black overflow-hidden border border-gray-800 rounded-lg">
                  <div className="h-56 overflow-hidden flex items-center justify-center p-4">
                    <img
                      src={game.image}
                      alt={game.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-white text-lg font-bold mb-2">
                      {game.name}
                    </h3>
                    <div
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        game.skillLevel === "Beginner"
                          ? "bg-green-500 text-white"
                          : game.skillLevel === "Intermediate"
                          ? "bg-yellow-500 text-black"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {game.skillLevel}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default GamesSection;
