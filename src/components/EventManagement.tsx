import React, { useState, useEffect } from "react";
import { Plus, Calendar, Users, MessageSquare, Settings } from "lucide-react";
import EventForm from "./EventForm";
import { supabase } from "../api/supabase";
import { upcomingEvents, pastEvents } from "../pages/EventsPage";
import { eventService } from "../api/services/eventService";

// Define Event interface to match your database schema
interface Event {
  id: string | number;
  title: string;
  description: string;
  date: string;
  time?: string;
  location: string;
  image?: string;
  image_url?: string;
  capacity: number | string;
  price: number | string;
  isPast?: boolean;
  status?: string;
  time_range?: string;
}

export default function EventManagement() {
  const [events, setEvents] = useState<Event[]>([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState("active");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const filteredEvents = events.filter((event) => {
    if (activeFilter === "active")
      return !event.isPast && event.status !== "draft";
    if (activeFilter === "draft") return event.status === "draft";
    if (activeFilter === "past")
      return event.isPast || event.status === "completed";
    return true; // For 'all' filter
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await eventService.getEvents();
      console.log("Events fetched from service:", data);

      if (!data || data.length === 0) {
        console.log(
          "No events found in database, initializing with static data..."
        );
        await initializeWithStaticData();
        // After initializing, fetch again
        const refreshedData = await eventService.getEvents();
        setEvents(refreshedData || []);
      } else {
        // Add the isPast property based on date or status
        const processedEvents = data.map((event: any) => ({
          ...event,
          isPast:
            event.status === "completed" || new Date(event.date) < new Date(),
          image: event.image_url || event.image,
        }));
        setEvents(processedEvents);
      }
    } catch (err) {
      setError("Failed to load events");
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  };

  const initializeWithStaticData = async () => {
    try {
      console.log("Initializing database with static events data...");
      const combinedEvents = [...upcomingEvents, ...pastEvents];

      for (const event of combinedEvents) {
        // Check if this event already exists in the database
        const { data } = await supabase
          .from("events")
          .select("*")
          .eq("title", event.title)
          .single();

        if (!data) {
          // Convert the event format to match our database schema
          const newEvent = {
            title: event.title,
            description: event.description,
            date: new Date(event.date).toISOString(),
            location: event.location,
            image_url: event.image,
            capacity: parseCapacity(event.capacity),
            price: parsePrice(event.price),
            status: event.isPast ? "completed" : "published",
          };

          console.log("Inserting event:", newEvent);
          const { error } = await supabase.from("events").insert([newEvent]);

          if (error) {
            console.error("Error inserting event:", error);
          }
        }
      }
    } catch (error) {
      console.error("Error in initializeWithStaticData:", error);
    }
  };

  // Helper function to safely parse capacity values
  const parseCapacity = (capacity: any): number => {
    try {
      if (typeof capacity === "number") return capacity;
      if (!capacity) return 0;

      if (typeof capacity === "string") {
        // Extract only numbers from the string
        const numericString = capacity.replace(/[^0-9]/g, "");
        const numericValue = parseInt(numericString, 10);
        return !isNaN(numericValue) ? numericValue : 0;
      }
      return 0;
    } catch (err) {
      console.error("Error parsing capacity:", err);
      return 0;
    }
  };

  // Helper function to safely parse price values
  const parsePrice = (price: any): number => {
    try {
      if (typeof price === "number") return price;
      if (!price) return 0;

      if (typeof price === "string") {
        // Extract numbers and decimal point from the string
        const numericString = price.replace(/[^0-9.]/g, "");
        const numericValue = parseFloat(numericString);
        return !isNaN(numericValue) ? numericValue : 0;
      }
      return 0;
    } catch (err) {
      console.error("Error parsing price:", err);
      return 0;
    }
  };

  const handleCreate = async (eventData: any) => {
    try {
      setLoading(true);
      setError(null);

      // Format data for the database
      const formattedData = {
        ...eventData,
        // Ensure date is in ISO format
        date: new Date(eventData.date).toISOString(),
        // Handle image/image_url
        image_url: eventData.image || eventData.image_url,
        // Convert capacity and price to numbers if they're strings
        capacity: parseCapacity(eventData.capacity),
        price: parsePrice(eventData.price),
        // Set initial status
        status: "published",
      };

      const { data, error } = await supabase
        .from("events")
        .insert([formattedData])
        .select();

      if (error) {
        throw error;
      }

      console.log("Event created successfully:", data);
      await fetchEvents();
      setShowEventModal(false);
    } catch (err) {
      setError("Failed to create event");
      console.error("Error creating event:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: string | number, eventData: any) => {
    try {
      setLoading(true);
      setError(null);

      // Format data for update
      const formattedData = {
        ...eventData,
        date: new Date(eventData.date).toISOString(),
        // Convert capacity and price to numbers if they're strings
        capacity: parseCapacity(eventData.capacity),
        price: parsePrice(eventData.price),
      };

      const { data, error } = await supabase
        .from("events")
        .update(formattedData)
        .eq("id", id)
        .select();

      if (error) {
        throw error;
      }

      console.log("Event updated successfully:", data);
      setSelectedEvent(null);
      await fetchEvents();
      setShowEventModal(false);
    } catch (err) {
      setError("Failed to update event");
      console.error("Error updating event:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      setLoading(true);
      setError(null);
      const { error } = await supabase.from("events").delete().eq("id", id);
      if (error) {
        throw error;
      }
      console.log("Event deleted successfully");
      await fetchEvents();
    } catch (err) {
      setError("Failed to delete event");
      console.error("Error deleting event:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && events.length === 0)
    return (
      <div className="flex justify-center items-center h-64">
        Loading events...
      </div>
    );
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <nav className="flex justify-between items-center px-6 py-4">
          <div className="flex items-center space-x-8">
            <div className="text-2xl font-bold text-primary-600">Events</div>
            <div className="flex items-center space-x-6">
              <button
                className={`px-4 py-2 ${
                  activeFilter === "active"
                    ? "text-primary-600 border-b-2 border-primary-600"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveFilter("active")}
              >
                ACTIVE
              </button>
              <button
                className={`px-4 py-2 ${
                  activeFilter === "draft"
                    ? "text-primary-600 border-b-2 border-primary-600"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveFilter("draft")}
              >
                DRAFT
              </button>
              <button
                className={`px-4 py-2 ${
                  activeFilter === "past"
                    ? "text-primary-600 border-b-2 border-primary-600"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveFilter("past")}
              >
                PAST
              </button>
            </div>
          </div>
          <button
            onClick={() => {
              setSelectedEvent(null); // Reset selected event when creating new
              setShowEventModal(true);
            }}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2 hover:bg-primary-700"
          >
            <Plus size={20} />
            <span>CREATE NEW EVENT</span>
          </button>
        </nav>
      </header>

      <div className="container mx-auto px-6 py-8">
        {filteredEvents.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">No events found</h3>
            <p className="text-gray-600 mb-6">
              {activeFilter === "active"
                ? "There are no active events at the moment."
                : activeFilter === "draft"
                ? "There are no draft events at the moment."
                : "There are no past events at the moment."}
            </p>
            <button
              onClick={() => {
                setSelectedEvent(null);
                setShowEventModal(true);
              }}
              className="bg-primary-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2 hover:bg-primary-700 mx-auto"
            >
              <Plus size={20} />
              <span>CREATE NEW EVENT</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <div className="space-y-4">
                {filteredEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white rounded-lg shadow p-6"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex gap-4">
                        {(event.image || event.image_url) && (
                          <img
                            src={event.image || event.image_url}
                            alt={event.title}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        )}
                        <div>
                          <h3 className="text-lg font-semibold">
                            {event.title}
                          </h3>
                          <p className="text-gray-500">
                            {new Date(event.date).toLocaleDateString()}{" "}
                            {event.time ? `• ${event.time}` : ""}
                          </p>
                          <p className="text-gray-500">{event.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => {
                            setSelectedEvent(event);
                            setShowEventModal(true);
                          }}
                          className="text-gray-500 hover:text-primary-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="text-gray-500 hover:text-primary-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-semibold mb-4">TOP SPONSORS</h3>
                <div className="flex flex-wrap gap-2">
                  {/* Add sponsor avatars here */}
                </div>

                <h3 className="font-semibold mt-6 mb-4">CATEGORIES</h3>
                <div className="space-y-2">
                  <div className="text-gray-600">All Categories</div>
                  <div className="text-gray-600">Music</div>
                  <div className="text-gray-600">Sports</div>
                  <div className="text-gray-600">Arts</div>
                  <div className="text-gray-600">Business</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {showEventModal && (
        <EventForm
          onClose={() => {
            setShowEventModal(false);
            setSelectedEvent(null);
          }}
          onSave={
            selectedEvent
              ? (data) => handleUpdate(selectedEvent.id, data)
              : handleCreate
          }
          event={selectedEvent || undefined}
        />
      )}
    </div>
  );
}
