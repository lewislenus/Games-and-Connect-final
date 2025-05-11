import { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import { eventService } from "../api/services/eventService";
import { supabase } from "../api/supabase";
import akosomboImg1 from "../assets/akosombo/_MG_1473.jpg"; // Import image 1
import akosomboImg2 from "../assets/akosombo/_MG_2618.jpg"; // Import image 2

// Define Event interface based on the Supabase database schema
interface Event {
  id: string; // Supabase uses string UUIDs for IDs
  title: string;
  date: string;
  time_range?: string;
  location: string;
  description: string;
  image_url?: string;
  price?: number;
  capacity?: number;
  created_at?: string;
  updated_at?: string;
  status?: "draft" | "published" | "cancelled" | "completed";
  organizer_id?: string;
  // Fields for component compatibility
  isPast?: boolean;
  image?: string;
  time?: string;
  additionalInfo?: string[];
  gallery?: string[]; // Add gallery property
}

// Specify the types for the arrays to fix the "never" type error
export const upcomingEvents: Event[] = [];
export const pastEvents: Event[] = [];

const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch events from the database
  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      // Add the Akosombo event to Supabase if it doesn't exist yet
      const addAkosomboEvent = async () => {
        try {
          // Check if the event already exists to avoid duplicates
          const { data } = await supabase
            .from("events")
            .select("*")
            .eq("title", "Games Day at Akosombo");

          if (data && data.length > 0) {
            console.log("Akosombo event already exists");
            return;
          }

          // Create the new event
          const newEvent = {
            title: "Games Day at Akosombo",
            date: "2025-04-18", // ISO format for database
            time_range: "9:00 AM - 6:00 PM",
            location: "Akosombo, Eastern Region",
            description:
              "Join us for an exciting day of outdoor games and activities at the beautiful Akosombo. Enjoy team sports, water activities, and more in this scenic location.",
            image_url: "https://placehold.co/600x400?text=Akosombo+Games+Day", // Placeholder until we have the actual image
            price: 200, // Store as number in database
            capacity: 100, // Store as number in database
            status: "published",
            // Store additional info as JSON in the description or create a separate field
            // We'll handle this in the frontend display
          };

          const result = await eventService.createEvent({
            ...newEvent,
            status: "published" as
              | "draft"
              | "published"
              | "cancelled"
              | "completed",
          });
          console.log("Added Akosombo event to Supabase:", result);
        } catch (error) {
          console.error("Error adding Akosombo event:", error);
        }
      };

      // Call the function to add the event
      await addAkosomboEvent();

      // Fetch all events directly from Supabase using eventService
      try {
        console.log("Attempting to fetch events...");
        const eventsData = await eventService.getEvents();

        console.log("Raw events data from Supabase:", eventsData); // Debug: Log raw data from API

        if (!eventsData) {
          console.warn("Events data is undefined");
          setEvents([]);
          setError("No events data received");
          return;
        }

        if (eventsData.length === 0) {
          console.warn("No events found in the Supabase database");
          setEvents([]);
          return;
        }

        // Process events to match our component's expected format
        const processedEvents = eventsData.map((event) => {
          // Parse the event date and get current date for comparison
          const eventDate = new Date(event.date);
          const now = new Date();

          // Determine if event is past based on date comparison or status
          const isPastEvent = event.status === "completed" || eventDate < now;

          // Check if this is the Akosombo event and add the additionalInfo and gallery
          let additionalInfo: string[] = [];
          let galleryImages: string[] = [];
          if (event.title === "Games Day at Akosombo") {
            additionalInfo = [
              "Transportation from Accra included",
              "Lunch and refreshments provided",
              "Swimming is optional (bring swimwear if interested)",
            ];
            galleryImages = [akosomboImg1, akosomboImg2]; // Add imported images to gallery
          } else if (event.gallery && Array.isArray(event.gallery)) {
            // Handle gallery if it exists for other events (assuming it's already an array of URLs/paths)
            galleryImages = event.gallery;
          } else if (event.gallery && typeof event.gallery === "string") {
            // Basic handling if gallery is stored as JSON string in DB for other events
            try {
              galleryImages = JSON.parse(event.gallery);
            } catch (e) {
              console.error(
                "Failed to parse gallery JSON for event:",
                event.id,
                e
              );
              galleryImages = event.image_url ? [event.image_url] : []; // Fallback
            }
          } else {
            galleryImages = event.image_url ? [event.image_url] : []; // Fallback if no gallery
          }

          return {
            ...event,
            // Keep ID as string since Supabase uses string UUIDs
            id: event.id,
            price:
              typeof event.price === "number"
                ? `GHS ${event.price.toFixed(2)}`
                : "Free",
            capacity:
              typeof event.capacity === "number"
                ? `${event.capacity} participants`
                : "Unlimited",
            image:
              event.image_url || "https://placehold.co/600x400?text=No+Image",
            isPast: isPastEvent,
            additionalInfo: additionalInfo,
            gallery: galleryImages, // Assign the gallery images
            time: event.time_range || "TBA",
            description: event.description || "No description available",
          };
        });

        console.log("All processed events from Supabase:", processedEvents); // Debug: Log all processed events
        setEvents(processedEvents);

        // Clear the arrays before populating them
        upcomingEvents.length = 0;
        pastEvents.length = 0;

        processedEvents.forEach((event) => {
          if (event.isPast) {
            pastEvents.push(event);
          } else {
            upcomingEvents.push(event);
          }
        });
      } catch (error) {
        console.error("Error fetching events from Supabase:", error);
        setError("Failed to load events from database");
      } finally {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error in fetchEvents:", error);
      setError("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  // We no longer need to initialize events with sample data
  // as we're fetching directly from Supabase

  useEffect(() => {
    // Call the fetchEvents function when the component mounts
    fetchEvents();
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Events</h1>

        {/* Upcoming Events Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events
              .filter((event) => !event.isPast)
              .sort(
                (a, b) =>
                  new Date(a.date).getTime() - new Date(b.date).getTime()
              ) // Sort by date ascending (closest first)
              .map((event) => (
                <EventCard
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  date={event.date}
                  time={event.time || ""}
                  location={event.location}
                  description={event.description}
                  image={event.image || ""}
                  price={
                    typeof event.price === "string"
                      ? event.price
                      : `GHS ${event.price}`
                  }
                  capacity={
                    typeof event.capacity === "string"
                      ? event.capacity
                      : `${event.capacity} participants`
                  }
                  isPast={false}
                />
              ))}
          </div>
        </section>

        {/* Past Events Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Past Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events
              .filter((event) => event.isPast)
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              ) // Sort by date descending (most recent first)
              .map((event) => (
                <EventCard
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  date={event.date}
                  time={event.time || ""}
                  location={event.location}
                  description={event.description}
                  image={event.image || ""}
                  price={
                    typeof event.price === "string"
                      ? event.price
                      : `GHS ${event.price}`
                  }
                  capacity={
                    typeof event.capacity === "string"
                      ? event.capacity
                      : `${event.capacity} participants`
                  }
                  isPast={true}
                  gallery={event.gallery || []}
                />
              ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default EventsPage;
