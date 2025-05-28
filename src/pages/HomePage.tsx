import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { Calendar, Users, Award, ArrowRight, ArrowUpRight, Play } from "lucide-react";
import CountdownTimer from "../components/CountdownTimer";
import TeamSection from "../components/TeamSection";
import GamesSection from "../components/GamesSection";
import GallerySection from "../components/GallerySection";
import Animations from "../components/Animations";
import ImageCarousel from "../components/ImageCarousel";
import backgroundImage from "../assets/img/back.jpg";
// Import will be used when registration functionality is implemented
// import { registerEvent, registerVolunteer } from "../api/services/supabase";
import { eventService } from "../api/services/eventService";

const HomePage = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get the first upcoming event with a fallback for when events haven't loaded yet
  const nextEvent = upcomingEvents.length > 0 ? upcomingEvents[0] : null;

  // Set the target date based on the event date
  const nextEventDate = nextEvent ? new Date(nextEvent.date) : null;

  // Function to fetch events directly in the HomePage
  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const eventsData = await eventService.getEvents();
      
      if (!eventsData) {
        setUpcomingEvents([]);
        setError("No events data received");
        return;
      }

      // Process events to match our component's expected format
      const processedEvents = eventsData.map((event) => {
        // Parse the event date and get current date for comparison
        const eventDate = new Date(event.date);
        const now = new Date();

        // Determine if event is past based on date comparison or status
        const isPastEvent = event.status === "completed" || eventDate < now;

        return {
          ...event,
          id: event.id,
          price: typeof event.price === "number" ? `GHS ${event.price.toFixed(2)}` : "Free",
          capacity: typeof event.capacity === "number" ? `${event.capacity} participants` : "Unlimited",
          image: event.image_url || "https://placehold.co/600x400?text=No+Image",
          isPast: isPastEvent,
          time: event.time_range || "TBA",
          description: event.description || "No description available",
        };
      });

      // Filter to only upcoming events
      const upcoming = processedEvents.filter(event => !event.isPast);
      setUpcomingEvents(upcoming);
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  // Fetch events when component mounts
  useEffect(() => {
    fetchEvents();
  }, []);

  // Stats for display
  const stats = [
    { value: "24+", label: "Events Organized" },
    { value: "200+", label: "Active Members" },
    { value: "100%", label: "Fun Guaranteed" }
  ];

  // Note: Event and volunteer registration handlers are defined but not currently used
  // They are kept for future implementation of registration functionality

  // Cloudinary images for carousel
  const carouselImages = [
    {
      url: "https://res.cloudinary.com/drkjnrvtu/image/upload/v1742488675/_MG_1414_ij80mu.jpg",
      caption: "Lavender Dreams"
    },
    {
      url: "https://res.cloudinary.com/drkjnrvtu/image/upload/v1742488675/_MG_1679_ovnanp.jpg",
      caption: "Cosmic Blue"
    },
    {
      url: "https://res.cloudinary.com/drkjnrvtu/image/upload/v1742488675/_MG_1623_olhksw.jpg",
      caption: "Neon Glow"
    },
    {
      url: "https://res.cloudinary.com/drkjnrvtu/image/upload/v1742488676/_MG_1677_v8n5nu.jpg",
      caption: "Electric Dreams"
    },
    {
      url: "https://res.cloudinary.com/drkjnrvtu/image/upload/v1742488676/back_k2fwpf.jpg",
      caption: "Community Fun"
    }
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <Animations />
      <SEO 
        title="Games & Connect - Outdoor Games and Social Events in Ghana"
        description="Join Games & Connect for exciting outdoor games, social events, and team building activities in Ghana. Connect with like-minded individuals and explore travel adventures."
        canonical="https://gamesandconnect.com"
        keywords="outdoor games Ghana, social events in Accra, travel and adventure Ghana, young people events Ghana, Ghana community events, games and connect Ghana, fun activities Ghana, networking events Ghana, team building activities Ghana"
        schema={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Games and Connect",
          "url": "https://gamesandconnect.com",
          "logo": "https://gamesandconnect.com/logo.png",
          "description": "Community events, outdoor games, and travel adventures for young people in Ghana",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Accra",
            "addressRegion": "Greater Accra",
            "addressCountry": "Ghana"
          },
          "sameAs": [
            "https://www.instagram.com/gamesandconnect",
            "https://twitter.com/gamesandconnect"
          ]
        }}
      />
      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex flex-col justify-center py-16 md:py-24">
        {/* Image Carousel as background */}
        <div className="absolute inset-0 z-0 overflow-hidden w-full h-full">
          <ImageCarousel 
            images={carouselImages} 
            interval={6000} 
            showControls={true}
            showIndicators={true}
            overlay={true}
            animationEffect="kenBurns"
          />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 md:mb-8 leading-tight">
              Play, Travel
              <span className="block">& Connect</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 md:mb-12 text-white max-w-2xl">
            Join a growing community of young Ghanaians making memories through fun, adventure, and connection.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-12 md:mb-16">
              <Link 
                to="/events" 
                className="group flex items-center justify-center gap-2 text-base md:text-lg font-medium bg-secondary-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-secondary-600 transition-all w-full sm:w-auto"
              >
                Explore Events
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="https://chat.whatsapp.com/LT0Zolnz9fMLm7b7aKtQld"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 text-base md:text-lg font-medium border-2 border-white text-white px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-white/10 transition-all w-full sm:w-auto"
              >
                Join Community
                <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
        
        {nextEventDate && (
          <div className="max-w-4xl mx-auto mt-8 md:mt-4">
            <CountdownTimer
              targetDate={nextEventDate}
              eventTitle={`Next Event: ${nextEvent ? nextEvent.title : "No Event"}`}
              eventId={nextEvent ? nextEvent.id.toString() : "0"}
            />
          </div>
        )}
      </section>
      
      {/* Video Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience Our Community</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Watch our highlights and get a glimpse of the fun and excitement at our events
              </p>
            </div>
            
            <div className="relative overflow-hidden rounded-xl shadow-2xl aspect-video bg-black">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dvjYm18Bldw?si=s5POukWiH2mNgItI&autoplay=1&mute=1&loop=1&playlist=dvjYm18Bldw&controls=1"
                title="Games Day at Akosombo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            
            <div className="mt-8 text-center">
              <a 
                href="https://www.youtube.com/@GamesConnect-gh" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary-900 hover:text-primary-700 font-medium transition-colors"
              >
                <Play className="w-5 h-5" />
                Watch more videos on our YouTube channel
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-6 border-t-2 border-black pt-6">
              <h3 className="text-2xl font-bold mb-6">Exciting Events</h3>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                From outdoor adventures to beach parties and game nights, we
                organize diverse events that cater to various interests and create
                unforgettable experiences for our community members.
              </p>
              <div className="w-12 h-12 rounded-full bg-primary-900 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-white" />
              </div>
            </div>

            <div className="p-6 border-t-2 border-black pt-6">
              <h3 className="text-2xl font-bold mb-6">Community Building</h3>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                Join our WhatsApp community to connect with like-minded
                individuals, participate in discussions, and stay updated on
                upcoming events. We foster genuine connections in a welcoming environment.
              </p>
              <div className="w-12 h-12 rounded-full bg-primary-900 flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>

            <div className="p-6 border-t-2 border-black pt-6">
              <h3 className="text-2xl font-bold mb-6">Loyalty Program</h3>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                Our loyalty program rewards active members with exclusive
                benefits, discounts, and special access to premium events. The more
                you participate, the more rewards you unlock.
              </p>
              <div className="w-12 h-12 rounded-full bg-primary-900 flex items-center justify-center">
                <Award className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              How we organize our events
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="p-6 border-t-2 border-black pt-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Planning</h3>
                <span className="text-4xl font-light">1</span>
              </div>
              <p className="text-gray-700">
                We carefully plan each event to ensure it meets our high standards for fun, safety, and social connection.
              </p>
            </div>

            <div className="p-6 border-t-2 border-black pt-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Preparation</h3>
                <span className="text-4xl font-light">2</span>
              </div>
              <p className="text-gray-700">
                Our team prepares all necessary elements, from venue setup to activity materials, for a seamless experience.
              </p>
            </div>

            <div className="p-6 border-t-2 border-black pt-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Execution</h3>
                <span className="text-4xl font-light">3</span>
              </div>
              <p className="text-gray-700">
                On the day, our experienced facilitators ensure everyone feels welcome and activities run smoothly.
              </p>
            </div>

            <div className="p-6 border-t-2 border-black pt-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Follow-up</h3>
                <span className="text-4xl font-light">4</span>
              </div>
              <p className="text-gray-700">
                After each event, we gather feedback and maintain the connections formed to build our community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6">
                <p className="text-5xl sm:text-6xl md:text-7xl font-bold mb-3">{stat.value}</p>
                <p className="text-lg md:text-xl text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Upcoming Events
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl">
              Secure your spot at our next exciting gatherings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-3 flex justify-center py-12">
                <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : error ? (
              <div className="col-span-3 text-center py-12 text-red-500">{error}</div>
            ) : upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <div key={event.id} className="group overflow-hidden">
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-primary-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Link
                        to={`/events/${event.id}`}
                        className="bg-white text-black px-6 py-3 rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                  <div className="pt-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-bold">{event.title}</h3>
                      <span className="text-gray-600 font-medium">{event.date}</span>
                    </div>
                    <p className="text-gray-700 line-clamp-2">{event.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center col-span-3 py-12">
                <h3 className="text-2xl font-semibold mb-4">
                  No upcoming events at the moment
                </h3>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  Check back soon for new events or join our community to be
                  notified when new events are announced.
                </p>
                <a
                  href="https://chat.whatsapp.com/LT0Zolnz9fMLm7b7aKtQld"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-colors"
                >
                  Join Our Community
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            )}
          </div>

          {upcomingEvents.length > 0 && (
            <div className="mt-16 text-center">
              <Link 
                to="/events" 
                className="inline-flex items-center gap-2 text-lg font-medium border-2 border-black px-8 py-4 rounded-full hover:bg-primary-900 hover:text-white transition-colors"
              >
                View All Events
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Gallery Section */}
      <GallerySection />

      {/* Team Section - with modern styling */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our Teams
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl">
              Join one of our competitive teams and be part of the excitement.
            </p>
          </div>
          
          <TeamSection />
        </div>
      </section>

      {/* Games Collection */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Games Collection
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl">
              Explore our variety of exciting games and activities for all skill levels.
            </p>
          </div>
          
          <GamesSection />
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32">
        <div className="absolute inset-0 z-0">
          <img
            src={backgroundImage}
            alt="Friends having fun"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary-900/70"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center text-white">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Ready to Join the Fun?
          </h2>
          <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto">
            Become part of our vibrant community today and start experiencing
            the best social events in Accra.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="https://chat.whatsapp.com/LT0Zolnz9fMLm7b7aKtQld"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-lg font-medium bg-white text-black px-8 py-4 rounded-full hover:bg-gray-100 transition-all"
            >
              Join Our Community
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              to="/events"
              className="group flex items-center gap-2 text-lg font-medium border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white/10 transition-all"
            >
              Explore Events
              <ArrowUpRight className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
