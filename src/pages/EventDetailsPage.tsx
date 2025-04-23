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
// Remove hardcoded event imports
// import { upcomingEvents } from "./EventsPage";
import { useAuth } from "../hooks/useAuth";
import NotificationPopup from "../components/NotificationPopup";
import useNotification from "../hooks/useNotification";
import ImageGalleryModal from "../components/ImageGalleryModal";
import { eventService } from "../api/services/eventService"; // Import eventService
import { cloudinaryService } from "../api/services/cloudinaryService"; // Import cloudinaryService

// Import event images (keep for fallback/local testing if needed, but prioritize fetched data)
import beachImg from "../assets/img/beach.jpg";
import aburiImg from "../assets/img/Aburi.jpg";

// Define Event interface (consider moving to a shared types file)
interface Event {
  id: number | string; // Allow both number (local) and string (DB)
  title: string;
  date: string;
  time?: string;
  location: string;
  description: string;
  image?: string; // Can be URL string or imported image variable
  price?: string | number; // Allow number from DB
  capacity?: string | number; // Allow number from DB
  additionalInfo?: string[];
  isPast?: boolean;
  gallery?: string[]; // Array of image URLs or imported variables
  // Add fields from DB
  image_url?: string;
  cloudinary_public_id?: string; // Added for Cloudinary integration
  time_range?: string;
  status?: string;
}

// Combine upcoming and past events for the details page
interface RegistrationDetails {
  full_name: string;
  email: string;
  phone_number: string;
  number_of_participants: number;
  location: string;
  special_requests: string;
}

const EventDetailsPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null); // State for fetched event
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const { user } = useAuth();
  const { notification, showSuccess, showError, showInfo, closeNotification } =
    useNotification();

  // Add state for form fields
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    number_of_participants: 1,
    special_requests: "",
    location: "", // Added location field
    willPay: "pay_later", // Changed to string type with default value
  });

  // Fetch event data when component mounts or eventId changes
  useEffect(() => {
    const fetchEventDetails = async () => {
      if (!eventId) {
        setError("Event ID is missing.");
        setLoading(false);
        navigate("/events"); // Redirect if no ID
        return;
      }

      setLoading(true);
      setError(null);
      try {
        console.log(`Fetching event with ID: ${eventId}`);
        const fetchedEvent = await eventService.getEvent(eventId);
        console.log("Fetched event data:", fetchedEvent);

        if (!fetchedEvent) {
          setError("Event not found.");
          setLoading(false);
          navigate("/events"); // Redirect if event not found
          return;
        }

        // Process fetched event data
        const now = new Date();
        const eventDate = new Date(fetchedEvent.date);
        const isPastEvent =
          fetchedEvent.status === "completed" || eventDate < now;

        // Format price and capacity (similar to EventsPage)
        const formattedPrice =
          typeof fetchedEvent.price === "number"
            ? `GHS ${fetchedEvent.price.toFixed(2)}`
            : fetchedEvent.price || "Free"; // Handle null/undefined price

        const formattedCapacity =
          typeof fetchedEvent.capacity === "number"
            ? `${fetchedEvent.capacity} participants`
            : fetchedEvent.capacity || "Unlimited"; // Handle null/undefined capacity

        // TODO: Handle gallery data if it exists in the fetchedEvent structure
        // Assuming gallery might be a JSON string or array in the DB
        let galleryImages: string[] = [];
        if (fetchedEvent.gallery) {
          if (typeof fetchedEvent.gallery === "string") {
            try {
              galleryImages = JSON.parse(fetchedEvent.gallery);
            } catch (e) {
              console.error("Failed to parse gallery JSON:", e);
              // Use fallback if parsing fails
              galleryImages = fetchedEvent.image_url
                ? [fetchedEvent.image_url]
                : [];
            }
          } else if (Array.isArray(fetchedEvent.gallery)) {
            galleryImages = fetchedEvent.gallery;
          }
        } else if (fetchedEvent.image_url) {
          galleryImages = [fetchedEvent.image_url]; // Use main image if no gallery
        }

        // Prepare optimized image URLs using Cloudinary if available
        let mainImageUrl = fetchedEvent.image_url || beachImg;
        let optimizedGalleryImages = [...galleryImages]; // Create a copy to modify

        // If we have a Cloudinary public_id, use it to generate optimized URLs
        if (fetchedEvent.cloudinary_public_id) {
          // Generate responsive main image URL
          mainImageUrl = cloudinaryService.getResponsiveImageUrl(
            fetchedEvent.cloudinary_public_id,
            1200 // Optimal width for hero image
          );

          // Update gallery images if they're from the same Cloudinary source
          if (
            galleryImages.length === 1 &&
            galleryImages[0] === fetchedEvent.image_url
          ) {
            // If gallery only contains the main image, optimize it
            optimizedGalleryImages = [
              cloudinaryService.getResponsiveImageUrl(
                fetchedEvent.cloudinary_public_id,
                800
              ),
            ];
          }
        }

        setEvent({
          ...fetchedEvent,
          id: fetchedEvent.id, // Ensure ID is correctly passed
          image: mainImageUrl, // Use optimized image URL
          isPast: isPastEvent,
          price: formattedPrice,
          capacity: formattedCapacity,
          time: fetchedEvent.time_range || fetchedEvent.time || "TBA", // Use time_range or time
          gallery: optimizedGalleryImages, // Use processed gallery images
          // Add any other necessary transformations
        });
      } catch (err: any) {
        console.error("Error fetching event details:", err);
        setError("Failed to load event details. " + err.message);
        // Optionally navigate away or show a prominent error message
        // navigate("/events");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId, navigate]);

  // Remove redundant useEffect for checking event existence (handled in fetch)
  /*
  useEffect(() => {
    if (!event && eventId) {
      navigate("/events");
    }
  }, [event, eventId, navigate]);
  */

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event) {
      showError("Event data is not loaded yet.");
      return;
    }
    try {
      // Direct registration without login requirement
      let registrationData: any = {
        event_id: event.id, // Use the ID from the fetched event state
        full_name: formData.full_name,
        email: formData.email,
        phone_number: formData.phone_number,
        number_of_participants: Number(formData.number_of_participants),
        special_requests: formData.special_requests,
        status: "pending",
        payment_status: "pending",
        payment_preference: formData.willPay, // Use the willPay value directly
        location: formData.location, // Include location in registration data
      };

      // Insert the registration data
      const { data, error } = await supabase
        .from("event_registrations")
        .insert([registrationData])
        .select()
        .single();

      if (error) {
        // Check if it's a unique constraint violation (user already registered)
        if (error.code === "23505") {
          // Consider checking by email AND event_id for non-logged-in users
          showError(
            "An registration with this email already exists for this event."
          );
          return; // Prevent further execution
        }
        throw error;
      }

      showSuccess(
        "Registration submitted successfully! We'll send you a confirmation email shortly."
      );
      setFormData({
        // Reset form
        full_name: "",
        email: "",
        phone_number: "",
        number_of_participants: 1,
        special_requests: "",
        location: "",
        willPay: "pay_later", // Reset to default
      });
    } catch (error: any) {
      console.error("Registration error:", error);
      showError(
        error.message || "Failed to submit registration. Please try again."
      );
    }
  };

  // Loading and Error states
  if (loading) {
    return <div className="text-center py-16">Loading event details...</div>;
  }

  if (error) {
    return <div className="text-center py-16 text-red-600">Error: {error}</div>;
  }

  if (!event) {
    // This case should ideally be handled by the redirect in useEffect,
    // but added as a safeguard.
    return <div className="text-center py-16">Event not found.</div>;
  }

  // The rest of the component remains largely the same,
  // using the 'event' state variable fetched dynamically.

  return (
    <div>
      {/* Notification Popup */}
      <NotificationPopup
        type={notification.type}
        message={notification.message}
        isOpen={notification.isOpen}
        onClose={closeNotification}
        autoClose={true}
        autoCloseTime={5000}
      />

      {/* Image Gallery Modal */}
      {isGalleryOpen && event && (
        <ImageGalleryModal
          isOpen={isGalleryOpen}
          onClose={() => setIsGalleryOpen(false)}
          images={event.gallery || (event.image ? [event.image] : [])}
          title={event.title}
          isPastEvent={event.isPast}
          eventDate={event.date}
          eventLocation={event.location}
        />
      )}
      {/* Hero Section with Event Image */}
      <div className="relative h-[50vh] w-full overflow-hidden cursor-pointer group">
        {event.image && ( // Check if image exists before rendering
          <img
            src={event.image} // Using Cloudinary optimized image URL
            alt={event.title}
            loading="eager" // Load hero image immediately
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onClick={() => {
              // Only open gallery if images are available
              if ((event.gallery && event.gallery.length > 0) || event.image) {
                setIsGalleryOpen(true);
              }
            }}
          />
        )}
        {event.isPast && (
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
                        {/* Format date for better readability */}
                        <p>
                          {new Date(event.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Clock className="h-5 w-5 mr-3 text-primary-600 mt-0.5" />
                      <div>
                        <h3 className="font-semibold">Time</h3>
                        <p>{event.time || "N/A"}</p>{" "}
                        {/* Display time or time_range */}
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

                {/* Keep Additional Info section if applicable */}
                {/* This might need adjustment based on how additional info is stored/fetched */}
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

              {/* Event cover image - Keep this section */}
              {event.image && (
                <div
                  className="mb-6 overflow-hidden rounded-lg cursor-pointer w-full md:w-[500px] h-auto md:h-[500px] mx-auto group"
                  onClick={() => {
                    // Only open gallery if images are available
                    if (
                      (event.gallery && event.gallery.length > 0) ||
                      event.image
                    ) {
                      setIsGalleryOpen(true);
                    }
                  }}
                >
                  <img
                    src={
                      event.cloudinary_public_id
                        ? cloudinaryService.getResponsiveImageUrl(
                            event.cloudinary_public_id,
                            500,
                            500
                          )
                        : event.image
                    }
                    alt={event.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-opacity duration-300">
                    <span className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View Gallery
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Right side - Registration form or Past Event Info */}
            <div className="w-full md:w-2/5">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
                {/* Check if the event is NOT a past event */}
                {!event.isPast ? (
                  // Display Registration Form for upcoming events
                  <div>
                    <h3 className="text-2xl font-bold mb-6 text-center">
                      Register for This Event
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Form fields remain the same */}
                      {/* Full Name Input */}
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
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleInputChange}
                            required
                            className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                            placeholder="Your full name"
                          />
                        </div>
                      </div>

                      {/* Email Input */}
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

                      {/* Phone Number Input */}
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
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleInputChange}
                            className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                            placeholder="+233 XX XXX XXXX"
                          />
                        </div>
                      </div>

                      {/* Number of Participants Input */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Number of Participants *
                        </label>
                        <select
                          name="number_of_participants"
                          value={formData.number_of_participants}
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

                      {/* Location Input */}
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

                      {/* Special Requests Input */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Special Requests
                        </label>
                        <textarea
                          name="special_requests"
                          value={formData.special_requests}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                          placeholder="Any special requirements or notes"
                        ></textarea>
                      </div>

                      {/* Payment Preference Section */}
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                          Payment Preference
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
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="willPay"
                              value="pay_now"
                              checked={formData.willPay === "pay_now"}
                              onChange={handleInputChange}
                              className="form-radio h-4 w-4 text-primary-500"
                            />
                            <span className="ml-2">Pay Now</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="willPay"
                              value="pay_later"
                              checked={formData.willPay === "pay_later"}
                              onChange={handleInputChange}
                              className="form-radio h-4 w-4 text-primary-500"
                            />
                            <span className="ml-2">Pay Later</span>
                          </label>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                          MTN Mobile Money: 059 859 9616
                        </p>
                        <p className="text-sm text-gray-600">
                          (Mainstream House)
                        </p>
                      </div>

                      {/* Submit Button */}
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
                        Privacy Policy.
                      </p>
                    </form>
                  </div>
                ) : (
                  // Display Past Event Info
                  <div className="text-center p-6 bg-gray-100 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">
                      Event Concluded
                    </h3>
                    <p className="text-gray-600 mb-4">
                      This event has already taken place. Registration is
                      closed.
                    </p>
                    {/* Conditionally render gallery button */}
                    {(event.gallery && event.gallery.length > 0) ||
                    event.image ? (
                      <button
                        onClick={() => setIsGalleryOpen(true)}
                        className="btn btn-secondary py-2 px-4"
                      >
                        View Gallery
                      </button>
                    ) : (
                      <p className="text-gray-500 text-sm">
                        No gallery available for this event.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery Modal */}
      {isGalleryOpen && event && (
        <ImageGalleryModal
          isOpen={isGalleryOpen}
          onClose={() => setIsGalleryOpen(false)}
          images={
            // Ensure a valid array is always passed
            Array.isArray(event.gallery) && event.gallery.length > 0
              ? event.gallery // Use gallery if available and not empty
              : event.image // Check if single image exists
              ? [event.image] // Use single image in an array if gallery is missing/empty
              : [] // Default to empty array if no gallery and no single image
          }
          title={event.title} // Use title prop for the modal header
        />
      )}
    </div>
  );
};

export default EventDetailsPage;
