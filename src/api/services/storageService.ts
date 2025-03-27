
import { supabase } from '../supabase';

export const storageService = {
  async uploadEventImage(file: File) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data, error } = await supabase.storage
      .from('event-assets')
      .upload(filePath, file);

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('event-assets')
      .getPublicUrl(filePath);

    return publicUrl;
  },

  async deleteEventImage(url: string) {
    const fileName = url.split('/').pop();
    if (!fileName) return;

    const { error } = await supabase.storage
      .from('event-assets')
      .remove([fileName]);

    if (error) throw error;
  }
};
