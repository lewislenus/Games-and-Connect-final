import api from "../config";

export interface Event {
  _id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  price: number;
  capacity: number;
  registrations: string[];
  isPast: boolean;
  createdAt: string;
  updatedAt: string;
}

export const eventService = {
  // Get all events
  getEvents: async (isPast?: boolean) => {
    const response = await api.get<{ success: boolean; data: Event[] }>(
      `/events${isPast !== undefined ? `?isPast=${isPast}` : ""}`
    );
    return response.data;
  },

  // Get single event
  getEvent: async (id: string) => {
    const response = await api.get<{ success: boolean; data: Event }>(
      `/events/${id}`
    );
    return response.data;
  },

  // Create event (admin only)
  createEvent: async (
    eventData: Omit<Event, "_id" | "registrations" | "createdAt" | "updatedAt">
  ) => {
    const response = await api.post<{ success: boolean; data: Event }>(
      "/events",
      eventData
    );
    return response.data;
  },

  // Update event (admin only)
  updateEvent: async (id: string, eventData: Partial<Event>) => {
    const response = await api.put<{ success: boolean; data: Event }>(
      `/events/${id}`,
      eventData
    );
    return response.data;
  },

  // Delete event (admin only)
  deleteEvent: async (id: string) => {
    const response = await api.delete<{ success: boolean }>(`/events/${id}`);
    return response.data;
  },

  // Register for event
  registerForEvent: async (id: string) => {
    const response = await api.post<{ success: boolean; data: Event }>(
      `/events/${id}/register`
    );
    return response.data;
  },
};
import { supabase } from '../supabase';

export const eventService = {
  async getEvents() {
    const { data, error } = await supabase.from('events').select('*');
    if (error) throw error;
    return data;
  },

  async createEvent(event) {
    const { data, error } = await supabase.from('events').insert(event).select();
    if (error) throw error;
    return data[0];
  },

  async updateEvent(id, event) {
    const { data, error } = await supabase
      .from('events')
      .update(event)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
  },

  async deleteEvent(id) {
    const { error } = await supabase.from('events').delete().eq('id', id);
    if (error) throw error;
  }
};
