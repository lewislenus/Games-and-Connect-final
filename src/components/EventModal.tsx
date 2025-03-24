import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  X,
  Calendar,
  MapPin,
  Clock,
  Users,
  DollarSign,
  Info,
  Mail,
  User,
  Phone,
} from "lucide-react";

interface EventModalProps {
  event: {
    id: number;
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    image: string;
    price?: string;
    capacity?: string;
    additionalInfo?: string[];
    isPast?: boolean;
  } | null;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ event, onClose }) => {
  if (!event) return null;

  // Add state for form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    participants: 1,
    specialRequests: "",
  });

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log("Form submitted:", formData);
    alert("Registration submitted successfully!");
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      participants: 1,
      specialRequests: "",
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center overflow-y-auto p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row">
        {/* Close button - now positioned absolutely in the top-right corner */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white hover:bg-gray-100 z-10"
          aria-label="Close"
        >
          <X className="h-6 w-6 text-gray-800" />
        </button>

        {/* Left side - Event details */}
        <div className="w-full md:w-3/5 overflow-y-auto">
          {/* Event image */}
          <div className="relative h-64 md:h-80 overflow-hidden">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            {event.isPast && (
              <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full">
                Past Event
              </div>
            )}
          </div>

          {/* Event details */}
          <div className="p-6">
            <h2 className="text-3xl font-bold mb-4">{event.title}</h2>

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
        </div>

        {/* Right side - Registration form */}
        <div className="w-full md:w-2/5 bg-gray-50 p-6 overflow-y-auto">
          {!event.isPast ? (
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
                    Special Requests or Comments
                  </label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Any dietary restrictions, accessibility needs, or other requests?"
                  ></textarea>
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
                  By registering, you agree to our Terms of Service and Privacy
                  Policy. Fields marked with * are required.
                </p>
              </form>
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold mb-4">Past Event</h3>
              <p className="text-gray-600 mb-6">
                This event has already taken place. Check out our gallery for
                photos or browse upcoming events.
              </p>
              <button className="btn btn-outline w-full mb-4">
                View Gallery
              </button>
              <Link to="/events" className="btn btn-primary w-full">
                See Upcoming Events
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventModal;
