import { supabase } from "../supabase";
import { storageService } from "./storageService";
import { cloudinaryService } from "./cloudinaryService";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  end_date?: string;
  location: string;
  image_url?: string;
  cloudinary_public_id?: string; // Added for Cloudinary integration
  capacity?: number;
  price?: number;
  status?: "draft" | "published" | "cancelled" | "completed";
  organizer_id?: string;
  created_at?: string;
  updated_at?: string;
}

export const eventService = {
  async getEvents() {
    try {
      console.log("Fetching events from Supabase...");
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });

      if (error) {
        console.error("Supabase error fetching events:", error);
        throw error;
      }

      console.log("Events fetched successfully:", data);
      return data;
    } catch (error) {
      console.error("Error in getEvents:", error);
      throw error;
    }
  },

  async getEvent(id: string) {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  async createEvent(eventData: Partial<Event>, imageFile?: File) {
    let imageUrl;
    let publicId;

    if (imageFile) {
      try {
        // Upload to Cloudinary instead of Supabase storage
        const uploadResult = await cloudinaryService.uploadImage(
          imageFile,
          "events"
        );
        imageUrl = uploadResult.secure_url;
        publicId = uploadResult.public_id;
        console.log("Image uploaded to Cloudinary:", uploadResult);
      } catch (error) {
        console.error(
          "Cloudinary upload failed, falling back to Supabase storage:",
          error
        );
        // Fallback to Supabase storage if Cloudinary fails
        imageUrl = await storageService.uploadEventImage(imageFile);
      }
    }

    // Remove 'status' if it does not exist in the schema
    const { status, ...eventDataWithoutStatus } = eventData;
    const { data, error } = await supabase
      .from("events")
      .insert([
        {
          ...eventDataWithoutStatus,
          image_url: imageUrl,
          cloudinary_public_id: publicId, // Store the Cloudinary public_id for future reference
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateEvent(id: string, eventData: Partial<Event>, imageFile?: File) {
    let imageUrl = eventData.image_url;
    let publicId;

    // Get the current event to check for existing Cloudinary image
    const currentEvent = await this.getEvent(id);
    const currentPublicId = currentEvent?.cloudinary_public_id;

    if (imageFile) {
      try {
        // Delete old image from Cloudinary if it exists
        if (currentPublicId) {
          await cloudinaryService.deleteImage(currentPublicId);
        } else if (imageUrl) {
          // If we have a URL but no public_id, try to extract it
          const extractedPublicId =
            cloudinaryService.getPublicIdFromUrl(imageUrl);
          if (extractedPublicId) {
            await cloudinaryService.deleteImage(extractedPublicId);
          } else {
            // Fallback to Supabase storage deletion
            await storageService.deleteEventImage(imageUrl);
          }
        }

        // Upload new image to Cloudinary
        const uploadResult = await cloudinaryService.uploadImage(
          imageFile,
          "events"
        );
        imageUrl = uploadResult.secure_url;
        publicId = uploadResult.public_id;
      } catch (error) {
        console.error(
          "Cloudinary operation failed, falling back to Supabase storage:",
          error
        );
        // Fallback to Supabase storage
        if (imageUrl) {
          await storageService.deleteEventImage(imageUrl);
        }
        imageUrl = await storageService.uploadEventImage(imageFile);
      }
    }

    const { data, error } = await supabase
      .from("events")
      .update({
        ...eventData,
        image_url: imageUrl,
        cloudinary_public_id: publicId || currentPublicId, // Keep existing public_id if not uploading new image
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteEvent(id: string) {
    const event = await this.getEvent(id);

    if (event) {
      // Try to delete from Cloudinary first
      if (event.cloudinary_public_id) {
        try {
          await cloudinaryService.deleteImage(event.cloudinary_public_id);
        } catch (error) {
          console.error("Failed to delete image from Cloudinary:", error);
        }
      } else if (event.image_url) {
        // Try to extract public_id from URL
        const publicId = cloudinaryService.getPublicIdFromUrl(event.image_url);
        if (publicId) {
          try {
            await cloudinaryService.deleteImage(publicId);
          } catch (error) {
            console.error(
              "Failed to delete image from Cloudinary using extracted public_id:",
              error
            );
          }
        }

        // Fallback to Supabase storage
        try {
          await storageService.deleteEventImage(event.image_url);
        } catch (error) {
          console.error("Failed to delete image from Supabase storage:", error);
        }
      }
    }

    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) throw error;
  },
  async registerForEvent(eventId: string, userId: string) {
    const { data, error } = await supabase
      .from("event_registrations")
      .insert([
        {
          event_id: eventId,
          user_id: userId,
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
};
