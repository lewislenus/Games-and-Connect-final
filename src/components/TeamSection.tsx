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
    <section className="w-full bg-white py-24">

      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6 px-6">
        {teams.map((team) => (
          <Link
            key={team.id}
            to={`/team/${team.id}`}
            className="group relative overflow-hidden aspect-square flex flex-col justify-end"
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-105"
              style={{ backgroundImage: `url(${team.image})` }}
            ></div>
            
            {/* Light Overlay on Hover */}
            <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-0"></div>
            
            {/* Content - Only visible on hover */}
            <div className="relative z-10 p-8 md:p-10 bg-white/90 m-6 transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:translate-y-[-10px]">
              <h3 className="text-2xl font-medium mb-2 text-[#0a1a2f]">{team.name}</h3>
              
              <div className="flex items-center text-[#0a1a2f] transform transition-all duration-500">
                <span className="mr-2 font-medium">View Team</span>
                <ArrowUpRight className="h-5 w-5" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
