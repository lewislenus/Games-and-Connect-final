import React from "react";
import { Users, Trophy, Target } from "lucide-react";

// Import team images
import redImg from "../assets/img/red.jpg";
import greenImg from "../assets/img/green.jpg";
import blueImg from "../assets/img/blue.jpg";
import whiteImg from "../assets/img/white.jpg";

const TeamSection = () => {
  return (
    <section className="bg-white py-16 w-full">
      <div className="w-full">
        <div className="text-center mb-12">
          <span className="text-primary-400 font-semibold mb-4 block">
            Our Teams
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet Our Competitive Teams
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Join one of our four dynamic teams and compete in our exciting
            events and challenges
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full max-w-none">
          {/* Team Red */}
          <div
            className="team-section-card p-6 hover:shadow-lg transition-all duration-300 relative overflow-hidden aspect-[4/3] flex flex-col justify-end"
            style={{
              backgroundImage: `url(${redImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Dark overlay - reduced opacity by 50% */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/30 to-black/35 z-0"></div>
            <div className="relative z-10 text-left">
              <h3 className="text-2xl font-bold mb-2 text-white">Team Red</h3>
              <p className="text-white mb-4">
                Known for their fierce competitiveness and team spirit
              </p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-white mr-2" />
                  <p className="text-white text-sm">25 Active Members</p>
                </div>
                <div className="flex items-center">
                  <Trophy className="h-4 w-4 text-white mr-2" />
                  <p className="text-white text-sm">12 Event Victories</p>
                </div>
                <div className="flex items-center">
                  <Target className="h-4 w-4 text-white mr-2" />
                  <p className="text-white text-sm">
                    Specializes in Strategy Games
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Team Green */}
          <div
            className="team-section-card p-6 hover:shadow-lg transition-all duration-300 relative overflow-hidden aspect-[4/3] flex flex-col justify-end"
            style={{
              backgroundImage: `url(${greenImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Dark overlay - reduced opacity by 50% */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/30 to-black/35 z-0"></div>
            <div className="relative z-10 text-left">
              <h3 className="text-2xl font-bold mb-2 text-white">Team Green</h3>
              <p className="text-white mb-4">
                Champions of outdoor activities and nature challenges
              </p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-white mr-2" />
                  <p className="text-white text-sm">28 Active Members</p>
                </div>
                <div className="flex items-center">
                  <Trophy className="h-4 w-4 text-white mr-2" />
                  <p className="text-white text-sm">15 Event Victories</p>
                </div>
                <div className="flex items-center">
                  <Target className="h-4 w-4 text-white mr-2" />
                  <p className="text-white text-sm">
                    Specializes in Outdoor Challenges
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Team Blue */}
          <div
            className="team-section-card p-6 hover:shadow-lg transition-all duration-300 relative overflow-hidden aspect-[4/3] flex flex-col justify-end"
            style={{
              backgroundImage: `url(${blueImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Dark overlay - reduced opacity by 50% */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/30 to-black/35 z-0"></div>
            <div className="relative z-10 text-left">
              <h3 className="text-2xl font-bold mb-2 text-white">Team Blue</h3>
              <p className="text-white mb-4">
                Masters of trivia and intellectual challenges
              </p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-white mr-2" />
                  <p className="text-white text-sm">22 Active Members</p>
                </div>
                <div className="flex items-center">
                  <Trophy className="h-4 w-4 text-white mr-2" />
                  <p className="text-white text-sm">10 Event Victories</p>
                </div>
                <div className="flex items-center">
                  <Target className="h-4 w-4 text-white mr-2" />
                  <p className="text-white text-sm">
                    Specializes in Trivia Competitions
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Team White */}
          <div
            className="team-section-card p-6 hover:shadow-lg transition-all duration-300 relative overflow-hidden aspect-[4/3] flex flex-col justify-end"
            style={{
              backgroundImage: `url(${whiteImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Dark overlay - reduced opacity by 50% */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/30 to-black/35 z-0"></div>
            <div className="relative z-10 text-left">
              <h3 className="text-2xl font-bold mb-2 text-white">Team White</h3>
              <p className="text-white mb-4">
                All-rounders who excel in diverse challenges
              </p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-white mr-2" />
                  <p className="text-white text-sm">20 Active Members</p>
                </div>
                <div className="flex items-center">
                  <Trophy className="h-4 w-4 text-white mr-2" />
                  <p className="text-white text-sm">8 Event Victories</p>
                </div>
                <div className="flex items-center">
                  <Target className="h-4 w-4 text-white mr-2" />
                  <p className="text-white text-sm">
                    Specializes in Team Building
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
