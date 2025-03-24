import React, { useState } from "react";
import { Calendar, Filter } from "lucide-react";
import EventCard from "../components/EventCard";

// Import local images
import akosomboImg from "../assets/img/Akosombo.jpg";
import beachImg from "../assets/img/beach.jpg";
import aburiImg from "../assets/img/Aburi.jpg";
import triviaImg from "../assets/img/_MG_1656.jpg"; // Using an existing image for trivia

// Updated event data with local images
// Export upcomingEvents so it can be imported in HomePage
export const upcomingEvents = [
  {
    id: 1,
    title: "Games Day at Akosombo",
    date: "May 15, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "Akosombo, Eastern Region",
    description:
      "A full day of outdoor games, team challenges, and networking by the Volta Lake. Includes transportation, meals, and all game equipment.",
    image: akosomboImg,
    price: "GHS 250 per person",
    capacity: "50 participants",
    additionalInfo: [
      "Transportation from Accra included",
      "Breakfast and lunch provided",
      "Bring comfortable clothes and shoes",
      "Swimming is optional (bring swimwear if interested)",
    ],
  },
  {
    id: 2,
    title: "Night Games & Beach Party",
    date: "June 2, 2025",
    time: "4:00 PM - 10:00 PM",
    location: "Labadi Beach, Accra",
    description:
      "Enjoy an evening of games followed by a lively beach party with music and bonfire. Includes beach games, networking, and refreshments.",
    image: beachImg,
    price: "GHS 200 per person",
    capacity: "80 participants",
    additionalInfo: [
      "Beach entrance fees included",
      "Dinner and refreshments provided",
      "Live DJ and bonfire experience",
      "Bring a change of clothes",
    ],
  },
  {
    id: 3,
    title: "Trivia Friday Special",
    date: "May 28, 2025",
    time: "6:00 PM - 9:00 PM",
    location: "The Loft, Osu, Accra",
    description:
      "Test your knowledge in our special edition trivia night with amazing prizes. Categories include general knowledge, pop culture, sports, and Ghana-specific trivia.",
    image: triviaImg,
    price: "GHS 100 per person",
    capacity: "60 participants",
    additionalInfo: [
      "Teams of 4-6 people",
      "Food and drinks available for purchase",
      "Cash prizes for winning teams",
      "Pre-registration required",
    ],
  },
];

const pastEvents = [
  {
    id: 101,
    title: "Beach Day & Games",
    date: "April 10, 2025",
    time: "10:00 AM - 5:00 PM",
    location: "Labadi Beach, Accra",
    description:
      "A day of fun beach games, swimming, and networking at Labadi Beach. The event included volleyball, tug of war, and sand castle building competitions with prizes for winners.",
    image: beachImg,
    price: "GHS 150 per person",
    capacity: "75 participants",
    additionalInfo: [
      "Beach entrance fees included",
      "Lunch and refreshments provided",
      "Professional photography services available",
    ],
    isPast: true,
  },
  {
    id: 102,
    title: "Aburi Botanical Gardens Hike",
    date: "March 25, 2025",
    time: "9:00 AM - 4:00 PM",
    location: "Aburi Botanical Gardens",
    description:
      "A refreshing hike through the beautiful Aburi Botanical Gardens followed by a picnic lunch and team-building activities. Participants enjoyed the serene environment and made new connections.",
    image: aburiImg,
    price: "GHS 180 per person",
    capacity: "40 participants",
    additionalInfo: [
      "Transportation from Accra included",
      "Guided tour of the gardens",
      "Picnic lunch and refreshments provided",
      "Comfortable walking shoes recommended",
    ],
    isPast: true,
  },
];

const EventsPage = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    type: "all",
    month: "all",
  });

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  const handleFilterChange = (category: string, value: string) => {
    setFilters({
      ...filters,
      [category]: value,
    });
  };

  // In a real app, you would filter the events based on the selected filters
  // For this demo, we'll just show all events

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 bg-primary-700">
        <div className="container-custom text-white">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">Our Events</h1>
            <p className="text-xl mb-0">
              Discover and join our exciting events happening in and around
              Accra. From outdoor adventures to social gatherings, there's
              something for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Events Navigation */}
      <section className="bg-white border-b">
        <div className="container-custom py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-4 md:mb-0">
              <button
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === "upcoming"
                    ? "bg-primary-100 text-primary-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("upcoming")}
              >
                Upcoming Events
              </button>
              <button
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === "past"
                    ? "bg-primary-100 text-primary-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("past")}
              >
                Past Events
              </button>
            </div>

            <button
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200"
              onClick={toggleFilter}
            >
              <Filter className="h-4 w-4" />
              <span>Filter Events</span>
            </button>
          </div>

          {/* Filter Panel */}
          {filterOpen && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Type
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={filters.type}
                    onChange={(e) => handleFilterChange("type", e.target.value)}
                  >
                    <option value="all">All Types</option>
                    <option value="games">Games</option>
                    <option value="travel">Travel</option>
                    <option value="social">Social</option>
                    <option value="trivia">Trivia</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Month
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={filters.month}
                    onChange={(e) =>
                      handleFilterChange("month", e.target.value)
                    }
                  >
                    <option value="all">All Months</option>
                    <option value="may">May 2025</option>
                    <option value="april">April 2025</option>
                    <option value="march">March 2025</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                  onClick={() => setFilterOpen(false)}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Events Listing */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          {activeTab === "upcoming" ? (
            <>
              <div className="flex items-center mb-8">
                <Calendar className="h-6 w-6 text-primary-600 mr-2" />
                <h2 className="text-2xl font-bold">Upcoming Events</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingEvents.map((event) => (
                  <div key={event.id}>
                    <EventCard
                      id={event.id}
                      title={event.title}
                      date={event.date}
                      time={event.time}
                      location={event.location}
                      description={event.description}
                      image={event.image}
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center mb-8">
                <Calendar className="h-6 w-6 text-primary-600 mr-2" />
                <h2 className="text-2xl font-bold">Past Events</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pastEvents.map((event) => (
                  <div key={event.id}>
                    <EventCard
                      id={event.id}
                      title={event.title}
                      date={event.date}
                      time={event.time}
                      location={event.location}
                      description={event.description}
                      image={event.image}
                      isPast={true}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <p className="text-gray-600 mb-4">
                  Looking for older events? Check out our complete archive.
                </p>
                <button className="btn btn-outline">View Event Archive</button>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default EventsPage;
