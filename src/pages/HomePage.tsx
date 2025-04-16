import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Users, Award } from "lucide-react";
import CountdownTimer from "../components/CountdownTimer";
import Carousel from "../components/Carousel";
import TeamSection from "../components/TeamSection";
import GamesSection from "../components/GamesSection";
// Import upcomingEvents from EventsPage
import { upcomingEvents } from "./EventsPage";
import backgroundImage from "../assets/img/back.jpg";

const HomePage = () => {
  // Get the first upcoming event with a fallback for when events haven't loaded yet
  const nextEvent = upcomingEvents[0] || {
    id: 0,
    title: "Upcoming Event",
    date: "2025-04-18",
    description: "Details coming soon",
    location: "Accra",
    image_url: "https://placehold.co/600x400?text=Coming+Soon",
    price: 0,
    capacity: 100,
    time_range: "9:00 AM - 12:00 PM",
  };
  // Set the target date based on the event date
  const nextEventDate = new Date(nextEvent.date || "2025-04-18T00:00:00");

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <Carousel className="absolute inset-0 z-0" />

        <div className="container-custom relative z-10 text-white">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Unleash the Fun.
              <br />
              Make New Connections.
            </h1>
            <p className="text-xl mb-8 text-gray-100">
              Step into a world of excitement, laughter, and unforgettable
              moments. Whether it's outdoor games, travel adventures, trivia
              nights, or beach parties, we've got something for everyone in
              Accra.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/events" className="btn btn-primary">
                Explore Events
              </Link>
              <a
                href="https://chat.whatsapp.com/LT0Zolnz9fMLm7b7aKtQld"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                Join Our Community
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-0 right-0 z-10">
          <div className="container-custom">
            <CountdownTimer
              targetDate={nextEventDate}
              eventTitle={`Next Event: ${nextEvent.title}`}
              eventId={nextEvent.id.toString()}
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              About Games & Connect
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We are a vibrant community dedicated to bringing people together
              through fun, interactive experiences in and around Accra, Ghana.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-6 text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Exciting Events</h3>
              <p className="text-gray-600">
                From outdoor adventures to beach parties and game nights, we
                organize diverse events that cater to various interests.
              </p>
            </div>

            <div className="card p-6 text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Vibrant Community</h3>
              <p className="text-gray-600">
                Join our WhatsApp community to connect with like-minded
                individuals, participate in discussions, and stay updated on
                upcoming events.
              </p>
            </div>

            <div className="card p-6 text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Loyalty Rewards</h3>
              <p className="text-gray-600">
                Our loyalty program rewards active members with exclusive
                benefits, discounts, and special access to premium events.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="section bg-gray-100">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Events
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Check out our most popular upcoming events and secure your spot
              today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Map through upcomingEvents from EventsPage instead of hardcoded events */}
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <div key={event.id} className="card overflow-hidden group">
                  <div className="relative overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {event.id === "1" && (
                      <div className="absolute top-0 right-0 bg-primary-600 text-white px-3 py-1 m-2 rounded-full text-sm font-semibold">
                        Popular
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-primary-600 font-semibold">
                        {event.date}
                      </span>
                      <Link
                        to={`/events/${event.id}`}
                        className="btn btn-primary py-2"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="card overflow-hidden group col-span-1 md:col-span-3 text-center p-8">
                <h3 className="text-xl font-bold mb-2">
                  No upcoming events at the moment
                </h3>
                <p className="text-gray-600 mb-4">
                  Check back soon for new events or join our community to be
                  notified.
                </p>
                <div className="flex justify-center">
                  <a
                    href="https://chat.whatsapp.com/LT0Zolnz9fMLm7b7aKtQld"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary py-2"
                  >
                    Join Community
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="text-center mt-12">
            <Link to="/events" className="btn btn-outline">
              View All Events
            </Link>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <TeamSection />

      {/* Games Section */}
      <GamesSection />

      {/* Testimonials Section */}
      <section className="section bg-primary-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Community Says
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Hear from members who have experienced our events and community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-6">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                  alt="Testimonial"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold">Akosua Mensah</h4>
                  <p className="text-gray-600 text-sm">Community Member</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Games & Connect has transformed my social life in Accra. I've
                made amazing friends and experienced adventures I never would
                have on my own. The beach party last month was unforgettable!"
              </p>
            </div>

            <div className="card p-6">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                  alt="Testimonial"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold">Kwame Osei</h4>
                  <p className="text-gray-600 text-sm">Regular Participant</p>
                </div>
              </div>
              <p className="text-gray-700">
                "The trivia nights are my favorite! The organizers put so much
                thought into creating engaging questions and the atmosphere is
                always electric. I look forward to it every week."
              </p>
            </div>

            <div className="card p-6">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                  alt="Testimonial"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold">Ama Darko</h4>
                  <p className="text-gray-600 text-sm">Volunteer</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Volunteering with Games & Connect has been rewarding. The team
                is passionate about creating meaningful experiences, and I'm
                proud to be part of such a positive community."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 z-0">
          <img
            src={backgroundImage}
            alt="Friends having fun"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 to-secondary-900/80"></div>
        </div>

        <div className="container-custom relative z-10 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Join the Fun?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Become part of our vibrant community today and start experiencing
            the best social events in Accra.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://chat.whatsapp.com/LT0Zolnz9fMLm7b7aKtQld"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Join Our Community
            </a>
            <Link
              to="/events"
              className="btn btn-outline border-white text-white hover:bg-white hover:text-primary-700"
            >
              Explore Events
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
