import { supabase } from "../supabase";

export const storageService = {
  async uploadEventImage(file: File, eventId?: string) {
    const fileExt = file.name.split(".").pop();
    // Include eventId in the file path if provided
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = eventId ? `events/${eventId}/${fileName}` : `${fileName}`;

    const { data, error } = await supabase.storage
      .from("event-assets")
      .upload(filePath, file);

    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabase.storage.from("event-assets").getPublicUrl(filePath);

    // If eventId is provided, associate this image with the event in the database
    if (eventId) {
      const { error: dbError } = await supabase.from("event_images").insert({
        event_id: eventId,
        image_url: publicUrl,
        file_path: filePath,
      });

      if (dbError) {
        console.error("Error associating image with event:", dbError);
        // Consider deleting the uploaded file if DB association fails
        await this.deleteEventImage(publicUrl);
        throw dbError;
      }
    }

    return publicUrl;
  },

  async getEventImages(eventId: string) {
    try {
      const { data, error } = await supabase
        .from("event_images")
        .select("*")
        .eq("event_id", eventId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase error fetching event images:", error);
        throw new Error(`Failed to fetch images: ${error.message}`);
      }

      return data || [];
    } catch (err) {
      console.error("Error in getEventImages:", err);
      throw err;
    }
  },

  async deleteEventImage(url: string) {
    const fileName = url.split("/").pop();
    if (!fileName) return;

    // First try to remove from database if it exists
    const { error: dbError } = await supabase
      .from("event_images")
      .delete()
      .eq("image_url", url);

    // Then remove the file from storage
    const { error } = await supabase.storage
      .from("event-assets")
      .remove([fileName]);

    if (error) throw error;
  },

  async deleteEventAllImages(eventId: string) {
    // Get all images for this event
    const { data, error } = await supabase
      .from("event_images")
      .select("file_path")
      .eq("event_id", eventId);

    if (error) throw error;

    if (data && data.length > 0) {
      // Delete all files from storage
      const filePaths = data.map((item) => item.file_path);
      const { error: storageError } = await supabase.storage
        .from("event-assets")
        .remove(filePaths);

      if (storageError) console.error("Error deleting files:", storageError);

      // Delete all records from database
      const { error: dbError } = await supabase
        .from("event_images")
        .delete()
        .eq("event_id", eventId);

      if (dbError) throw dbError;
    }

    return true;
  },
};
