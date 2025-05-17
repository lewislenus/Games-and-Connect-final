import { useEffect, useState } from 'react';
import { supabase } from '../api/supabase';
import { Session } from '@supabase/supabase-js';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  user_id: string;
  created_at: string;
}

interface EventFormData {
  title: string;
  description: string;
  date: string;
}

export const Events = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showMyEvents, setShowMyEvents] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchEvents = async (reset = false) => {
    try {
      setLoading(true);
      setError(null);
      
      if (reset) {
        setPage(0);
        setHasMore(true);
      }

      let query = supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true })
        .range(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE - 1);

      if (showMyEvents && session?.user) {
        query = query.eq('user_id', session.user.id);
      }

      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query;

      if (error) throw error;

      if (reset) {
        setEvents(data || []);
      } else {
        setEvents(prev => [...prev, ...(data || [])]);
      }
      
      setHasMore((data?.length || 0) === ITEMS_PER_PAGE);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(true);
  }, [showMyEvents, searchQuery]);

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) return;

    try {
      setLoading(true);
      const { error } = await supabase
        .from('events')
        .insert([
          {
            ...formData,
            user_id: session.user.id,
          },
        ]);

      if (error) throw error;

      setFormData({
        title: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
      });
      
      fetchEvents(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user || !isEditing) return;

    try {
      setLoading(true);
      const { error } = await supabase
        .from('events')
        .update(formData)
        .eq('id', isEditing)
        .eq('user_id', session.user.id);

      if (error) throw error;

      setIsEditing(null);
      fetchEvents(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!session?.user || !window.confirm('Are you sure you want to delete this event?')) return;

    try {
      setLoading(true);
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id)
        .eq('user_id', session.user.id);

      if (error) throw error;

      fetchEvents(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (event: Event) => {
    setIsEditing(event.id);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
    });
  };

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
        <h2 className="text-xl font-semibold mb-4">Please sign in to view events</h2>
        <button
          onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Events</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowMyEvents(!showMyEvents)}
              className={`px-4 py-2 rounded ${
                showMyEvents ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {showMyEvents ? 'My Events' : 'All Events'}
            </button>
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border rounded px-4 py-2"
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={isEditing ? handleUpdateEvent : handleCreateEvent} className="space-y-4">
          <input
            type="text"
            placeholder="Event Title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            required
            className="w-full border rounded px-4 py-2"
          />
          <textarea
            placeholder="Event Description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            required
            className="w-full border rounded px-4 py-2"
          />
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
            required
            className="w-full border rounded px-4 py-2"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {isEditing ? 'Update Event' : 'Create Event'}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={() => setIsEditing(null)}
              className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div key={event.id} className="border rounded p-4 shadow">
            <h3 className="text-xl font-semibold">{event.title}</h3>
            <p className="text-gray-600">{event.description}</p>
            <p className="text-sm text-gray-500">
              {new Date(event.date).toLocaleDateString()}
            </p>
            {session.user.id === event.user_id && (
              <div className="mt-4 space-x-2">
                <button
                  onClick={() => startEdit(event)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center my-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}

      {hasMore && !loading && (
        <button
          onClick={() => {
            setPage(prev => prev + 1);
            fetchEvents();
          }}
          className="mt-4 w-full bg-gray-100 px-4 py-2 rounded hover:bg-gray-200"
        >
          Load More
        </button>
      )}
    </div>
  );
};
