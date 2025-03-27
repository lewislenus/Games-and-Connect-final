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

  async createEvent(event: any) {
    const { data, error } = await supabase.from('events').insert(event);
    if (error) throw error;
    return data;
  },

  async updateEvent(id: string, event: any) {
    const { data, error } = await supabase
      .from('events')
      .update(event)
      .eq('id', id);
    if (error) throw error;
    return data;
  },

  async deleteEvent(id: string) {
    const { error } = await supabase.from('events').delete().eq('id', id);
    if (error) throw error;
    return true;
  }
};