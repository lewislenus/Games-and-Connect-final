import { supabase } from '../supabase';
import { storageService } from './storageService';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  end_date?: string;
  location: string;
  image_url?: string;
  capacity?: number;
  price?: number;
  status?: 'draft' | 'published' | 'cancelled' | 'completed';
  organizer_id?: string;
  created_at?: string;
  updated_at?: string;
}

export const eventService = {
  async getEvents() {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });

    if (error) throw error;
    return data;
  },

  async getEvent(id: string) {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async createEvent(eventData: Partial<Event>, imageFile?: File) {
    let imageUrl;
    if (imageFile) {
      imageUrl = await storageService.uploadEventImage(imageFile);
    }
    const { data, error } = await supabase
      .from('events')
      .insert([{ ...eventData, image_url: imageUrl }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateEvent(id: string, eventData: Partial<Event>, imageFile?: File) {
    let imageUrl = eventData.image_url;
    if (imageFile) {
      if (imageUrl) {
        await storageService.deleteEventImage(imageUrl);
      }
      imageUrl = await storageService.uploadEventImage(imageFile);
    }
    const { data, error } = await supabase
      .from('events')
      .update({ ...eventData, image_url: imageUrl })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteEvent(id: string) {
    const event = await this.getEvent(id); // Use the new getEvent function
    if (event?.image_url) {
      await storageService.deleteEventImage(event.image_url);
    }
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
  async registerForEvent(eventId: string, userId: string) {
    const { data, error } = await supabase
      .from('event_registrations')
      .insert([{
        event_id: eventId,
        user_id: userId,
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getEventRegistrations(eventId: string) {
    const { data, error } = await supabase
      .from('event_registrations')
      .select(`
        *,
        profiles:user_id(*)
      `)
      .eq('event_id', eventId);

    if (error) throw error;
    return data;
  }
};