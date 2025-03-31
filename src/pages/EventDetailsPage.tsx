import React, { useState, useEffect } from "react";
import { supabase } from "../api/supabase";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  DollarSign,
  Info,
  Mail,
  User,
  Phone,
  ArrowLeft,
  X,
} from "lucide-react";
import { upcomingEvents } from "./EventsPage";

// Import event images
import beachImg from "../assets/img/beach.jpg";
import aburiImg from "../assets/img/Aburi.jpg";

// Combine upcoming and past events for the details page
const EventDetailsPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [isGalleryOpen, setIsGalleryOpen] = useState(false); // Added gallery modal state
  // Add state for form fields
  const [formData, setFormData] = useState({

  const [showThankYouModal, setShowThankYouModal] = useState(false);

    name: "",
    email: "",
    phone: "",
    participants: 1,
    specialRequests: "",
    location: "", // Added location field
  });

  // Import past events from EventsPage
  // This is a simplified approach - in a real app, you might fetch this data from an API
  const pastEvents = [
    {
      id: 101,
      title: "Beach Day & Games",
      date: "January 04, 2025",
      time: "10:00 AM - 5:00 PM",
      location: "Bojo Beach, Accra",
      description:
        "A day of fun beach games, swimming, and networking at Labadi Beach. The event included volleyball, tug of war, and sand castle building competitions with prizes for winners.",
      image: beachImg,
      price: "GHS 250 per person",
      capacity: "75 participants",
      additionalInfo: [
        "Beach entrance fees included",
        "Lunch and refreshments provided",
        "Professional photography services available",
      ],
      isPast: true,
      gallery: [beachImg, aburiImg], // Added gallery images
    },
    {
      id: 102,
      title: "Aburi Botanical Gardens Hike",
      date: "November 25, 2024",
      time: "9:00 AM - 4:00 PM",
      location: "Aburi Botanical Gardens",
      description:
        "A refreshing hike through the beautiful Aburi Botanical Gardens followed by a picnic lunch and team-building activities. Participants enjoyed the serene environment and made new connections.",
      image: aburiImg,
      price: "GHS 300 per person",
      capacity: "40 participants",
      additionalInfo: [
        "Transportation from Accra included",
        "Guided tour of the gardens",
        "Picnic lunch and refreshments provided",
        "Comfortable walking shoes recommended",
      ],
      isPast: true,
      gallery: [aburiImg, beachImg], // Added gallery images
    },
  ];

  // Combine all events
  const allEvents = [...upcomingEvents, ...pastEvents];

  // Find the event with the matching ID
  const event = allEvents.find((e) => e.id === parseInt(eventId || "0"));

  // Redirect to events page if event not found
  useEffect(() => {
    if (!event && eventId) {
      navigate("/events");
    }
  }, [event, eventId, navigate]);

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('event_registrations')
        .insert([{
          event_id: eventId,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          participants: Number(formData.participants),
          special_requests: formData.specialRequests,
          location: formData.location,
          status: 'pending'
        }])
        .select()
        .single();

      if (error) throw error;

      setShowThankYouModal(true);
      setTimeout(() => setShowThankYouModal(false), 3000);
      setFormData({
        name: "",
        email: "",
        phone: "",
        participants: 1,
        specialRequests: "",
        location: "",
      });
    } catch (error) {
      console.error("Registration error:", error);
      alert("Failed to submit registration. Please try again.");
    }
  };

  if (!event) return null;

  return (
    <div>
      {/* Hero Section with Event Image */}
      <div className="relative h-[50vh] w-full overflow-hidden cursor-pointer group">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onClick={() => {
            setIsGalleryOpen(true); // Open gallery modal
          }}
        />
        {"isPast" in event && (
          <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full z-10">
            Past Event
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end group-hover:bg-opacity-30 transition-opacity">
          <div className="container-custom text-white pb-8">
            <Link
              to="/events"
              className="inline-flex items-center text-white mb-4 hover:text-primary-200 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Events
            </Link>
            <h1 className="text-4xl font-bold">{event.title}</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="section">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left side - Event details */}
            <div className="w-full md:w-3/5">
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 mr-3 text-primary-600 mt-0.5" />
                      <div>
                        <h3 className="font-semibold">Date</h3>
                        <p>{event.date}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Clock className="h-5 w-5 mr-3 text-primary-600 mt-0.5" />
                      <div>
                        <h3 className="font-semibold">Time</h3>
                        <p>{event.time}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 mr-3 text-primary-600 mt-0.5" />
                      <div>
                        <h3 className="font-semibold">Location</h3>
                        <p>{event.location}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {event.price && (
                      <div className="flex items-start">
                        <DollarSign className="h-5 w-5 mr-3 text-primary-600 mt-0.5" />
                        <div>
                          <h3 className="font-semibold">Price</h3>
                          <p>{event.price}</p>
                        </div>
                      </div>
                    )}

                    {event.capacity && (
                      <div className="flex items-start">
                        <Users className="h-5 w-5 mr-3 text-primary-600 mt-0.5" />
                        <div>
                          <h3 className="font-semibold">Capacity</h3>
                          <p>{event.capacity}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3">About This Event</h3>
                  <p className="text-gray-700 whitespace-pre-line">
                    {event.description}
                  </p>
                </div>

                {event.additionalInfo && event.additionalInfo.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-3">
                      Additional Information
                    </h3>
                    <ul className="space-y-2">
                      {event.additionalInfo.map((info, index) => (
                        <li key={index} className="flex items-start">
                          <Info className="h-5 w-5 mr-3 text-primary-600 mt-0.5" />
                          <span>{info}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Event cover image moved above map */}
              <div
                className="mb-6 overflow-hidden rounded-lg cursor-pointer w-[500px] h-[500px] mx-auto"
                onClick={() => {
                  setIsGalleryOpen(true); // Open gallery modal
                }}
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Right side - Registration form */}
            <div className="w-full md:w-2/5">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
                {!("isPast" in event) ? (
                  <div>
                    <h3 className="text-2xl font-bold mb-6 text-center">
                      Register for This Event
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                            placeholder="Your full name"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                            placeholder="+233 XX XXX XXXX"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Number of Participants *
                        </label>
                        <select
                          name="participants"
                          value={formData.participants}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <option key={num} value={num}>
                              {num} {num === 1 ? "person" : "people"}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Your Location *
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                          placeholder="Your current location"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Special Requests
                        </label>
                        <textarea
                          name="specialRequests"
                          value={formData.specialRequests}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                          placeholder="Any special requirements or notes"
                        ></textarea>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                          Payment Details
                          <svg
                            className="w-4 h-4 text-green-500 ml-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        </h4>
                        <p className="text-sm text-gray-600">
                          MTN Mobile Money: 059 859 9616
                        </p>
                        <p className="text-sm text-gray-600">
                          (Mainstream House)
                        </p>
                      </div>

                      <div className="pt-4">
                        <button
                          type="submit"
                          className="w-full btn btn-primary py-3 text-lg font-semibold"
                        >
                          Complete Registration
                        </button>
                      </div>

                      <p className="text-sm text-gray-500 mt-4">
                        By registering, you agree to our Terms of Service and
                        Privacy Policy. Fields marked with * are required.
                      </p>
                    </form>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-2xl font-bold mb-4">Past Event</h3>
                    <p className="text-gray-600 mb-6">
                      This event has already taken place. Check out our upcoming
                      events.
                    </p>
                    <Link to="/events" className="btn btn-primary w-full">
                      See Upcoming Events
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Modal */}
      {isGalleryOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative bg-white rounded-lg shadow-lg p-4 w-96">
            <button
              className="absolute top-2 right-2"
              onClick={() => setIsGalleryOpen(false)}
            >
              <X size={20} />
            </button>
            <div className="grid grid-cols-2 gap-4">
              {event.gallery.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Gallery Image ${index + 1}`}
                  className="w-full h-auto object-cover"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetailsPage;


      {/* Thank You Modal */}
      {showThankYouModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
            <p className="text-gray-600">
              Your registration has been submitted successfully. We'll send you a confirmation email shortly.
            </p>
          </div>
        </div>
      )}
