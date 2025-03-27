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

import { supabase } from '../supabase';

export const eventService = {
  async getEvents() {
    const { data, error } = await supabase.from('events').select('*');
    if (error) throw error;
    return data;
  },

  async createEvent(eventData) {
    const { data, error } = await supabase
      .from('events')
      .insert([eventData])
      .select();
    if (error) throw error;
    return data[0];
  },

  async updateEvent(id, eventData) {
    const { data, error } = await supabase
      .from('events')
      .update(eventData)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
  },

  async deleteEvent(id) {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }
};