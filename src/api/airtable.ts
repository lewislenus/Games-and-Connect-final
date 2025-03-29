
import Airtable from 'airtable';

const base = new Airtable({ apiKey: import.meta.env.VITE_AIRTABLE_API_KEY })
  .base(import.meta.env.VITE_AIRTABLE_BASE_ID);

export const submitRegistration = async (formData: {
  name: string;
  email: string;
  phone: string;
  participants: number;
  specialRequests?: string;
  location: string;
  eventId: string;
  eventName: string;
}) => {
  try {
    const record = await base('Event Registrations').create([
      {
        fields: {
          Name: formData.name,
          Email: formData.email,
          Phone: formData.phone,
          'Number of Participants': formData.participants,
          'Special Requests': formData.specialRequests || '',
          Location: formData.location,
          'Event ID': formData.eventId,
          'Event Name': formData.eventName
        }
      }
    ]);
    return record;
  } catch (error) {
    console.error('Error submitting to Airtable:', error);
    throw error;
  }
};
