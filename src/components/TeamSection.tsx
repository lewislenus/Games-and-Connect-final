import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const TeamSection = () => {
  const teams = [
    {
      id: "red",
      name: "Team Red",
      image: "https://res.cloudinary.com/drkjnrvtu/image/upload/v1746915399/_MG_2393_cv5xbp.jpg",
      description: "Known for their fierce competitiveness and team spirit",
    },
    {
      id: "green",
      name: "Team Green",
      image: "https://res.cloudinary.com/drkjnrvtu/image/upload/v1746915398/_MG_2403_hknyss.jpg",
      description: "Champions of outdoor activities and nature challenges",
    },
    {
      id: "blue",
      name: "Team Blue",
      image: "https://res.cloudinary.com/drkjnrvtu/image/upload/v1746918906/_MG_2027_oblrvo.jpg",
      description: "Masters of trivia and intellectual challenges",
    },
    {
      id: "yellow",
      name: "Team Yellow",
      image: "https://res.cloudinary.com/drkjnrvtu/image/upload/v1746915401/_MG_2185_rqpdrv.jpg",
      description: "All-rounders who excel in diverse challenges",
    },
  ];

  return (
    <section className="w-full bg-white py-16 md:py-24">
      {/* Mobile Title - Only visible on small screens */}
      <div className="md:hidden text-center mb-8 px-4">
        <h2 className="text-3xl font-bold mb-3">Our Teams</h2>
        <p className="text-gray-700">Explore our competitive teams</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-4 sm:gap-6 px-4 sm:px-6">
        {teams.map((team) => (
          <Link
            key={team.id}
            to={`/team/${team.id}`}
            className="group relative overflow-hidden aspect-square flex flex-col justify-end touch-manipulation"
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-105"
              style={{ backgroundImage: `url(${team.image})` }}
            ></div>
            
            {/* Light Overlay - Always visible on mobile, only on hover for desktop */}
            <div className="absolute inset-0 bg-black/10 md:opacity-0 md:transition-opacity md:duration-500 md:group-hover:opacity-100 z-0"></div>
            
            {/* Content - Always visible on mobile, only on hover for desktop */}
            <div className="relative z-10 p-4 sm:p-6 md:p-8 bg-white/90 m-3 sm:m-4 md:m-6 md:transition-all md:duration-500 md:opacity-0 md:group-hover:opacity-100 md:group-hover:translate-y-[-10px]">
              <h3 className="text-xl sm:text-2xl font-medium mb-1 sm:mb-2 text-[#0a1a2f]">{team.name}</h3>
              
              <div className="flex items-center text-[#0a1a2f] transform md:transition-all md:duration-500">
                <span className="mr-2 font-medium text-sm sm:text-base">View Team</span>
                <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
