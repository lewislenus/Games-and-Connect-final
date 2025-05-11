import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Users, Trophy, Target, ArrowRight } from "lucide-react";
import ImageModal from "../components/ImageModal";

// Import gallery images
const galleryImages = {
  red: [
    "https://res.cloudinary.com/drkjnrvtu/image/upload/v1746915399/_MG_2393_cv5xbp.jpg",
    "https://res.cloudinary.com/drkjnrvtu/image/upload/v1746918852/_MG_2075_i2peyk.jpg",
    "https://res.cloudinary.com/drkjnrvtu/image/upload/v1746915388/_MG_2318_kszvtt.jpg"
  ],
  green: [
    "https://res.cloudinary.com/drkjnrvtu/image/upload/v1746915398/_MG_2403_hknyss.jpg",
    "https://res.cloudinary.com/drkjnrvtu/image/upload/v1746915399/_MG_2214_zq4dzb.jpg",
    "https://res.cloudinary.com/drkjnrvtu/image/upload/v1746915389/_MG_2356_nlkxwl.jpg",
    "https://res.cloudinary.com/drkjnrvtu/image/upload/v1746915382/_MG_2210_swxpme.jpg",
    "https://res.cloudinary.com/drkjnrvtu/image/upload/v1746918852/_MG_2336_mxnylu.jpg"
  ],
  blue: [
    "https://res.cloudinary.com/drkjnrvtu/image/upload/v1746918906/_MG_2027_oblrvo.jpg",
    "https://res.cloudinary.com/drkjnrvtu/image/upload/v1746915400/_MG_2284_njl6kn.jpg",
    "https://res.cloudinary.com/drkjnrvtu/image/upload/v1746915395/_MG_2305_z4ozhb.jpg",
    "https://res.cloudinary.com/drkjnrvtu/image/upload/v1746915383/_MG_2106_epgam5.jpg"
  ],
  yellow: [
    "https://res.cloudinary.com/drkjnrvtu/image/upload/v1746915401/_MG_2185_rqpdrv.jpg",
    "https://res.cloudinary.com/drkjnrvtu/image/upload/v1746915388/_MG_2118_gi8okx.jpg",
    "https://res.cloudinary.com/drkjnrvtu/image/upload/v1746915393/_MG_2181_oohsbh.jpg"
  ]
};

// Team data
const teamsData = {
  red: {
    name: "Team Red",
    image: "https://res.cloudinary.com/drkjnrvtu/image/upload/v1746915399/_MG_2393_cv5xbp.jpg",
    description: "Known for their fierce competitiveness and team spirit",
    longDescription: "Team Red is the oldest team in our community, established when Games & Connect first began. They are known for their strategic approach to games and challenges, always analyzing and planning their moves carefully. The team has a strong sense of camaraderie and supports each other through every competition.",
    members: 25,
    victories: 12,
    specialty: "Strategy Games",
    achievements: [
      "First place in the 2024 Strategy Tournament",
      "Second place in the Annual Games Challenge",
      "Most Valuable Team award in 2023"
    ],
    upcomingEvents: [
      {
        name: "Summer Strategy Showdown",
        date: "June 15, 2025",
        location: "Central Park"
      },
      {
        name: "Team Red vs Team Blue Challenge",
        date: "July 8, 2025",
        location: "Community Center"
      }
    ],
    teamLead: "Sarah Johnson"
  },
  green: {
    name: "Team Green",
    image: "https://res.cloudinary.com/drkjnrvtu/image/upload/v1746915398/_MG_2403_hknyss.jpg",
    description: "Champions of outdoor activities and nature challenges",
    longDescription: "Team Green specializes in outdoor activities and environmental challenges. They excel in games that require physical endurance and a connection with nature. The team promotes eco-friendly practices and often organizes clean-up events alongside their competitive activities.",
    members: 28,
    victories: 15,
    specialty: "Outdoor Challenges",
    achievements: [
      "Champions of the Wilderness Challenge 2024",
      "First place in the Eco-Friendly Games Tournament",
      "Community Service Award for environmental initiatives"
    ],
    upcomingEvents: [
      {
        name: "Forest Navigation Challenge",
        date: "May 28, 2025",
        location: "Redwood Forest"
      },
      {
        name: "Beach Clean-up Competition",
        date: "June 22, 2025",
        location: "Sunset Beach"
      }
    ],
    teamLead: "Michael Chen"
  },
  blue: {
    name: "Team Blue",
    image: "https://res.cloudinary.com/drkjnrvtu/image/upload/v1746918906/_MG_2027_oblrvo.jpg",
    description: "Masters of trivia and intellectual challenges",
    longDescription: "Team Blue is comprised of knowledge enthusiasts who excel in trivia and intellectual challenges. They are known for their extensive knowledge across various subjects and their ability to think quickly under pressure. The team regularly hosts study sessions and knowledge-sharing events.",
    members: 22,
    victories: 10,
    specialty: "Trivia Competitions",
    achievements: [
      "Champions of the Annual Knowledge Bowl",
      "First place in the City-wide Trivia Competition",
      "Academic Excellence Award 2024"
    ],
    upcomingEvents: [
      {
        name: "Science Trivia Night",
        date: "June 5, 2025",
        location: "Public Library"
      },
      {
        name: "History Challenge",
        date: "July 12, 2025",
        location: "History Museum"
      }
    ],
    teamLead: "David Rodriguez"
  },
  yellow: {
    name: "Team Yellow",
    image: "https://res.cloudinary.com/drkjnrvtu/image/upload/v1746915401/_MG_2185_rqpdrv.jpg",
    description: "All-rounders who excel in diverse challenges",
    longDescription: "Team Yellow is the most versatile team in our community, with members who have diverse skills and interests. They can adapt to any type of challenge and are known for their creativity and problem-solving abilities. The team embraces diversity and welcomes members from all backgrounds.",
    members: 20,
    victories: 8,
    specialty: "Team Building",
    achievements: [
      "Most Versatile Team Award 2024",
      "Second place in the Multi-Discipline Challenge",
      "Community Integration Award for diversity initiatives"
    ],
    upcomingEvents: [
      {
        name: "Mixed Skills Tournament",
        date: "June 18, 2025",
        location: "Community Center"
      },
      {
        name: "Creative Problem-Solving Challenge",
        date: "July 25, 2025",
        location: "Innovation Hub"
      }
    ],
    teamLead: "Emma Wilson"
  }
};

const TeamDetailsPage = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const [team, setTeam] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading data
    setLoading(true);
    
    if (teamId && teamsData[teamId as keyof typeof teamsData]) {
      setTeam(teamsData[teamId as keyof typeof teamsData]);
    }
    
    setLoading(false);
  }, [teamId]);
  
  const openImageModal = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0a1a2f]"></div>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-4">Team Not Found</h2>
        <p className="mb-8">The team you're looking for doesn't exist.</p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 bg-[#0a1a2f] text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-[70vh] flex items-end"
        style={{
          backgroundImage: `url(${team.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/70"></div>
        
        <div className="container mx-auto px-6 relative z-10 pb-16">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-white mb-8 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{team.name}</h1>
          <p className="text-xl text-white max-w-2xl">{team.description}</p>
          
          <div className="flex flex-wrap gap-6 mt-8">
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Users className="h-5 w-5 text-white mr-2" />
              <p className="text-white">{team.members} Members</p>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Trophy className="h-5 w-5 text-white mr-2" />
              <p className="text-white">{team.victories} Victories</p>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Target className="h-5 w-5 text-white mr-2" />
              <p className="text-white">{team.specialty}</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">About {team.name}</h2>
            <p className="text-lg text-gray-700 mb-12 leading-relaxed">{team.longDescription}</p>
            
            <div className="border-t border-gray-200 pt-12">
              <h3 className="text-2xl font-bold mb-6">Team Lead</h3>
              <p className="text-lg">{team.teamLead}</p>
            </div>
            
            <div className="border-t border-gray-200 pt-12 mt-12">
              <h3 className="text-2xl font-bold mb-6">Key Achievements</h3>
              <ul className="space-y-4">
                {team.achievements.map((achievement: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-[#0a1a2f] mt-2 mr-3"></span>
                    <span className="text-lg">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Gallery Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">Team Gallery</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teamId && galleryImages[teamId as keyof typeof galleryImages]?.map((image, index) => (
                <div 
                  key={index} 
                  className="overflow-hidden rounded-lg aspect-[4/3] group cursor-pointer relative"
                  onClick={() => openImageModal(image)}
                >
                  <img 
                    src={image} 
                    alt={`${team.name} gallery image ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/90 rounded-full p-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0a1a2f]"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path><path d="M11 8v6"></path><path d="M8 11h6"></path></svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal
          isOpen={!!selectedImage}
          onClose={closeImageModal}
          imageSrc={selectedImage}
          imageAlt={`${team?.name} gallery image`}
        />
      )}

      {/* Join Team Section */}
      <section className="py-20 bg-[#0a1a2f] text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join {team.name}</h2>
            <p className="text-lg mb-12 max-w-2xl mx-auto">
              Interested in becoming a part of our team? We're always looking for enthusiastic new members to join our community.
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-2 bg-white text-[#0a1a2f] px-8 py-4 rounded-full hover:bg-gray-100 transition-all"
            >
              Contact Us
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamDetailsPage;
