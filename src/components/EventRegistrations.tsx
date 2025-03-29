
import { useState, useEffect } from 'react';
import { eventService } from '../api/services/eventService';

export default function EventRegistrations({ eventId }) {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const data = await eventService.getEventRegistrations(eventId);
        setRegistrations(data);
      } catch (error) {
        console.error('Error fetching registrations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, [eventId]);

  if (loading) return <div>Loading registrations...</div>;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Registrations</h3>
      <div className="divide-y">
        {registrations.map((registration) => (
          <div key={registration.id} className="py-3">
            <p className="font-medium">{registration.profiles?.full_name}</p>
            <p className="text-sm text-gray-500">Status: {registration.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
