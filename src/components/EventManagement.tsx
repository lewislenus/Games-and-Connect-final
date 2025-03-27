import React, { useState, useEffect } from 'react';
import { Plus, Calendar, Users, MessageSquare, Settings } from 'lucide-react';
import EventForm from './EventForm';
import { supabase } from '../api/supabase';

export default function EventManagement() {
  const [events, setEvents] = useState([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState('active');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.from('events').select('*');
      if (error) {
        throw error;
      }
      setEvents(data);
    } catch (err) {
      setError('Failed to load events');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (eventData: any) => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('events')
        .insert([eventData]);
      if (error) {
        throw error;
      }
      await fetchEvents();
      setShowEventModal(false);
    } catch (err) {
      setError('Failed to create event');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: string, eventData: any) => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('events')
        .update(eventData)
        .eq('id', id);
      if (error) {
        throw error;
      }
      await fetchEvents();
      setShowEventModal(false);
    } catch (err) {
      setError('Failed to update event');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    try {
      setLoading(true);
      setError(null);
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);
      if (error) {
        throw error;
      }
      await fetchEvents();
    } catch (err) {
      setError('Failed to delete event');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <nav className="flex justify-between items-center px-6 py-4">
          <div className="flex items-center space-x-8">
            <div className="text-2xl font-bold text-primary-600">Events</div>
            <div className="flex items-center space-x-6">
              <button className={`px-4 py-2 ${activeFilter === 'active' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500'}`}
                onClick={() => setActiveFilter('active')}>
                ACTIVE
              </button>
              <button className={`px-4 py-2 ${activeFilter === 'draft' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500'}`}
                onClick={() => setActiveFilter('draft')}>
                DRAFT
              </button>
              <button className={`px-4 py-2 ${activeFilter === 'past' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500'}`}
                onClick={() => setActiveFilter('past')}>
                PAST
              </button>
            </div>
          </div>
          <button
            onClick={() => setShowEventModal(true)}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2 hover:bg-primary-700"
          >
            <Plus size={20} />
            <span>CREATE NEW EVENT</span>
          </button>
        </nav>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-4 gap-8">
          <div className="col-span-3">
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold">{event.title}</h3>
                      <p className="text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button onClick={() => {
                        setShowEventModal(true);
                      }} className="text-gray-500 hover:text-primary-600">Edit</button>
                      <button onClick={() => handleDelete(event.id)} className="text-gray-500 hover:text-primary-600">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-1">
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
      </div>

      {showEventModal && (
        <EventForm onClose={() => setShowEventModal(false)} onSave={handleCreate} onUpdate={handleUpdate} event={events.find(event => event.id === selectedEvent?.id)}/>
      )}
    </div>
  );
}