import { supabase } from "../supabase";

export interface VolunteerRegistration {
  id?: string;
  full_name: string;
  email: string;
  phone: string;
  interests?: string[];
  availability?: string[];
  experience?: string;
  message?: string;
  created_at?: string;
}

export interface Event {
  id?: string;
  title: string;
  description: string;
  date: string;
  location: string;
  capacity?: number;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

export const registrationService = {
  async createVolunteerRegistration(data: VolunteerRegistration) {
    const { data: registration, error } = await supabase
      .from("volunteer_registrations")
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return registration;
  },

  async getVolunteerRegistrations() {
    const { data, error } = await supabase
      .from("volunteer_registrations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  async createEventRegistration(
    eventId: string,
    userId: string,
    details: any = {}
  ) {
    const { data, error } = await supabase
      .from("event_registrations")
      .insert([
        {
          event_id: eventId,
          user_id: userId,
          ...details,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getEventRegistrations(eventId: string) {
    const { data, error } = await supabase
      .from("event_registrations")
      .select(
        `
        *,
        profiles:user_id(*)
      `
      )
      .eq("event_id", eventId);

    if (error) throw error;
    return data;
  },

  async createEvent(data: Event) {
    const { data: event, error } = await supabase
      .from("events")
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return event;
  },

  async getEvents() {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: true });

    if (error) throw error;
    return data;
  },

  async getEventById(eventId: string) {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", eventId)
      .single();

    if (error) throw error;
    return data;
  },

  async updateEvent(eventId: string, updates: Partial<Event>) {
    const { data, error } = await supabase
      .from("events")
      .update(updates)
      .eq("id", eventId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteEvent(eventId: string) {
    const { error } = await supabase.from("events").delete().eq("id", eventId);

    if (error) throw error;
    return true;
  },
};
