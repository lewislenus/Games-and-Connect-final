import React, { useEffect, useRef } from "react";

// Import game images from games folder
import archeryImg from "../assets/img/games/Archery.jpg";
import cardsImg from "../assets/img/games/cards.jpg";
import cupGamesImg from "../assets/img/games/cup games.jpg";
import dartImg from "../assets/img/games/dart.jpg";
import footballImg from "../assets/img/games/football.jpg";
import limboImg from "../assets/img/games/limbo.jpg";
import shootingRangeImg from "../assets/img/games/shooting range.jpg";
import unoImg from "../assets/img/games/uno.jpg";
import volleyImg from "../assets/img/games/volley.jpg";

const games = [
  { name: "Archery", image: archeryImg, id: 1, skillLevel: "Intermediate" },
  { name: "Cards", image: cardsImg, id: 2, skillLevel: "Beginner" },
  { name: "Cup Games", image: cupGamesImg, id: 3, skillLevel: "Beginner" },
  { name: "Dart", image: dartImg, id: 4, skillLevel: "Beginner" },
  { name: "Football", image: footballImg, id: 5, skillLevel: "Intermediate" },
  { name: "Limbo", image: limboImg, id: 6, skillLevel: "Beginner" },
  {
    name: "Shooting Range",
    image: shootingRangeImg,
    id: 7,
    skillLevel: "Intermediate",
  },
  { name: "Uno", image: unoImg, id: 8, skillLevel: "Beginner" },
  { name: "Volleyball", image: volleyImg, id: 9, skillLevel: "Intermediate" },
];

// Use all games since we're now using actual game images
const gameItems = games;

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
