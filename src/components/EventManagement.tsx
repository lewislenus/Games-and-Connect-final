
import React, { useEffect, useState } from 'react';
import { Event, eventService } from '../api/services/eventService';
import EventForm from './EventForm';

export default function EventManagement() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await eventService.getEvents();
      setEvents(data);
    } catch (err) {
      setError('Failed to load events');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (eventData: Partial<Event>) => {
    try {
      await eventService.createEvent(eventData);
      await loadEvents();
      setIsFormOpen(false);
    } catch (err) {
      setError('Failed to create event');
      console.error(err);
    }
  };

  const handleUpdate = async (id: string, eventData: Partial<Event>) => {
    try {
      await eventService.updateEvent(id, eventData);
      await loadEvents();
      setIsFormOpen(false);
      setSelectedEvent(null);
    } catch (err) {
      setError('Failed to update event');
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    try {
      await eventService.deleteEvent(id);
      await loadEvents();
    } catch (err) {
      setError('Failed to delete event');
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Event Management</h2>
        <button
          onClick={() => {
            setSelectedEvent(null);
            setIsFormOpen(true);
          }}
          className="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600"
        >
          Create Event
        </button>
      </div>

      {isFormOpen && (
        <EventForm
          event={selectedEvent}
          onSubmit={async (data) => {
            if (selectedEvent) {
              await handleUpdate(selectedEvent.id, data);
            } else {
              await handleCreate(data);
            }
          }}
          onCancel={() => {
            setIsFormOpen(false);
            setSelectedEvent(null);
          }}
        />
      )}

      <div className="grid gap-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="border p-4 rounded-lg shadow-sm flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{event.title}</h3>
              <p className="text-sm text-gray-600">
                {new Date(event.date).toLocaleDateString()}
              </p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => {
                  setSelectedEvent(event);
                  setIsFormOpen(true);
                }}
                className="text-blue-500 hover:text-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(event.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
