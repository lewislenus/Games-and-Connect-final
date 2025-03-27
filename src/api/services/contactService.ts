
import { supabase } from '../supabase';

export const contactService = {
  async getMessages() {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async createMessage(message) {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert(message)
      .select();
    if (error) throw error;
    return data[0];
  }
};
