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

      console.log("Events fetched successfully:", data?.length || 0, "events");
      return data || [];
    } catch (error: any) {
      console.error("Error in getEvents:", error);
      throw error;
    }
  },

  async getEvent(id: string) {
    try {
      if (!id) {
        throw new Error("Event ID is required");
      }

      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(`Error fetching event with id ${id}:`, error);
        throw error;
      }

      if (!data) {
        throw new Error(`Event with id ${id} not found`);
      }

      return data;
    } catch (error: any) {
      console.error(`Error in getEvent (id: ${id}):`, error);
      throw error;
    }
  },

  async createEvent(eventData: Partial<Event>, imageFile?: File) {
    let imageUrl;
    let publicId;
    let uploadError = null;

    try {
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
        } catch (error: any) {
          console.error(
            "Cloudinary upload failed, attempting Supabase storage:",
            error
          );
          uploadError = error;
          // Fallback to Supabase storage if Cloudinary fails
          try {
            imageUrl = await storageService.uploadEventImage(imageFile);
            uploadError = null; // Clear error if Supabase upload succeeds
          } catch (storageError: any) {
            console.error(
              "Failed to upload image to Supabase storage:",
              storageError
            );
            // Combine error messages for better context
            const cloudinaryErrorMessage =
              error instanceof Error ? error.message : String(error);
            const supabaseErrorMessage =
              storageError instanceof Error
                ? storageError.message
                : String(storageError);
            throw new Error(
              `Failed to upload image. Cloudinary Error: ${cloudinaryErrorMessage}. Supabase Storage Error: ${supabaseErrorMessage}`
            );
          }
        }
      }

      // Safely remove 'status' if it does not exist in the schema
      const { status, ...eventDataWithoutStatus } = eventData;

      try {
        const { data, error } = await supabase
          .from("events")
          .insert([
            {
              ...eventDataWithoutStatus,
              image_url: imageUrl,
              cloudinary_public_id: publicId,
            },
          ])
          .select()
          .single();

        if (error) {
          // If event creation fails, cleanup uploaded image
          if (imageUrl) {
            try {
              if (publicId) {
                await cloudinaryService.deleteImage(publicId);
              } else if (imageUrl) {
                await storageService.deleteEventImage(imageUrl);
              }
            } catch (cleanupError) {
              console.error(
                "Failed to cleanup image after event creation failed:",
                cleanupError
              );
              const creationErrorMessage =
                error instanceof Error ? error.message : String(error);
              const cleanupErrorMessage =
                cleanupError instanceof Error
                  ? cleanupError.message
                  : String(cleanupError);
              throw new Error(
                `Event creation failed: ${creationErrorMessage}. Image cleanup also failed: ${cleanupErrorMessage}`
              );
            }
          }
          throw error;
        }

        // If we had a Cloudinary error but Supabase succeeded, include warning
        if (uploadError) {
          return {
            ...data,
            warning:
              "Event created with Supabase storage after Cloudinary failure",
          };
        }

        return data;
      } catch (dbError) {
        // Handle database errors
        console.error("Database error in createEvent:", dbError);

        // Cleanup any uploaded image if database operation failed
        if (imageUrl) {
          try {
            if (publicId) {
              await cloudinaryService.deleteImage(publicId);
            } else if (imageUrl) {
              await storageService.deleteEventImage(imageUrl);
            }
          } catch (cleanupError: any) {
            console.error(
              "Failed to cleanup image after database error:",
              cleanupError
            );
            // Continue with the original error
          }
        }

        throw dbError;
      }
    } catch (error: any) {
      console.error("Error in createEvent:", error);
      throw error;
    }
  },

  async updateEvent(id: string, eventData: Partial<Event>, imageFile?: File) {
    let imageUrl = eventData.image_url;
    let publicId;
    let oldImageUrl;
    let oldPublicId;
    let uploadError = null;
    let deletionErrors = [];
    let newImageUploaded = false;

    try {
      // Get the current event to check for existing Cloudinary image
      const currentEvent = await this.getEvent(id);
      if (!currentEvent) throw new Error(`Event with id ${id} not found`);

      oldImageUrl = currentEvent.image_url;
      oldPublicId = currentEvent.cloudinary_public_id;

      if (imageFile) {
        try {
          // Upload new image to Cloudinary first before deleting old one
          const uploadResult = await cloudinaryService.uploadImage(
            imageFile,
            "events"
          );
          imageUrl = uploadResult.secure_url;
          publicId = uploadResult.public_id;
          newImageUploaded = true;

          // Only delete old image after successful upload
          try {
            if (oldPublicId) {
              await cloudinaryService.deleteImage(oldPublicId);
            } else if (oldImageUrl) {
              await storageService.deleteEventImage(oldImageUrl);
            }
          } catch (deleteError) {
            console.error("Failed to delete old image:", deleteError);
            deletionErrors.push({
              type: oldPublicId ? "cloudinary" : "supabase",
              error: deleteError,
            });
            // Continue with update even if old image deletion fails
          }
        } catch (error) {
          console.error(
            "Cloudinary operation failed, attempting Supabase storage:",
            error
          );
          uploadError = error;
          try {
            // Try Supabase storage
            imageUrl = await storageService.uploadEventImage(imageFile);
            uploadError = null; // Clear error if Supabase upload succeeds
            newImageUploaded = true;

            // Only delete old image after successful upload
            try {
              if (oldPublicId) {
                await cloudinaryService.deleteImage(oldPublicId);
              } else if (oldImageUrl) {
                await storageService.deleteEventImage(oldImageUrl);
              }
            } catch (deleteError) {
              console.error("Failed to delete old image:", deleteError);
              deletionErrors.push({
                type: oldPublicId ? "cloudinary" : "supabase",
                error: deleteError,
              });
            }
          } catch (storageError) {
            console.error(
              "Failed to upload image to Supabase storage:",
              storageError
            );
            // Combine error messages for better context
            const cloudinaryErrorMessage =
              error instanceof Error ? error.message : String(error);
            const supabaseErrorMessage =
              storageError instanceof Error
                ? storageError.message
                : String(storageError);
            throw new Error(
              `Failed to upload image. Cloudinary Error: ${cloudinaryErrorMessage}. Supabase Storage Error: ${supabaseErrorMessage}`
            );
          }
        }
      }

      try {
        // Prepare the update payload
        const updatePayload: Partial<Event> = {
          ...eventData,
          image_url: imageUrl, // This will be the new URL if uploaded, otherwise the one from eventData
        };

        // Explicitly manage cloudinary_public_id based on upload outcome
        if (newImageUploaded) {
          if (publicId) {
            // New image uploaded to Cloudinary
            updatePayload.cloudinary_public_id = publicId;
          } else {
            // New image uploaded to Supabase (fallback or primary)
            updatePayload.cloudinary_public_id = undefined; // Clear Cloudinary ID if Supabase was used
          }
        } else {
          // No new image uploaded. Handle cloudinary_public_id based on eventData.
          if ("image_url" in eventData && eventData.image_url === null) {
            // If image_url is explicitly set to null, clear cloudinary_public_id
            updatePayload.cloudinary_public_id = undefined;
          } else if (!("cloudinary_public_id" in eventData)) {
            // If image_url is not being cleared AND cloudinary_public_id is not explicitly set in eventData,
            // retain the existing oldPublicId.
            updatePayload.cloudinary_public_id = oldPublicId;
          }
          // If cloudinary_public_id *is* explicitly provided in eventData (e.g., null or a specific value),
          // it's already handled by the spread operator `...eventData` above, so no explicit action needed here.
        }

        const { data, error } = await supabase
          .from("events")
          .update(updatePayload)
          .eq("id", id)
          .select()
          .single();

        if (error) {
          // If update fails and we uploaded a new image, try to delete the NEW image
          if (newImageUploaded) {
            console.warn(
              `Database update failed for event ${id}. Attempting to clean up newly uploaded image.`
            );
            try {
              if (publicId) {
                await cloudinaryService.deleteImage(publicId);
                console.log(`Cleaned up new Cloudinary image ${publicId}`);
              } else if (imageUrl && imageUrl !== oldImageUrl) {
                // Check if imageUrl is defined and different from old one before deleting from Supabase
                await storageService.deleteEventImage(imageUrl);
                console.log(`Cleaned up new Supabase image ${imageUrl}`);
              }
              // Note: We don't attempt to restore the old image here as it might have been deleted.
            } catch (cleanupError) {
              console.error(
                `Failed to cleanup new image (${
                  publicId || imageUrl
                }) after update failed for event ${id}:`,
                cleanupError
              );
              // Combine error messages for better context
              const updateErrorMessage =
                error instanceof Error ? error.message : String(error);
              const cleanupErrorMessage =
                cleanupError instanceof Error
                  ? cleanupError.message
                  : String(cleanupError);
              throw new Error(
                `Event update failed: ${updateErrorMessage}. Subsequent image cleanup also failed: ${cleanupErrorMessage}`
              );
            }
          }
          throw error; // Re-throw the original database update error
        }

        // Return success with any warnings
        const response = { ...data };
        if (uploadError) {
          response.warning =
            "Event updated with Supabase storage after Cloudinary failure";
        }
        if (deletionErrors.length > 0) {
          response.deletionWarnings = deletionErrors;
        }
        return response;
      } catch (dbError) {
        // Handle database errors
        console.error("Database error in updateEvent:", dbError);

        // Cleanup any newly uploaded image if database operation failed
        if (newImageUploaded) {
          try {
            if (publicId) {
              await cloudinaryService.deleteImage(publicId);
            } else if (imageUrl && imageUrl !== oldImageUrl) {
              await storageService.deleteEventImage(imageUrl);
            }
          } catch (cleanupError: any) {
            console.error(
              "Failed to cleanup image after database error:",
              cleanupError
            );
            // Continue with the original error
          }
        }

        throw dbError;
      }
    } catch (error: any) {
      console.error("Error in updateEvent:", error);
      throw error;
    }
  },

  async deleteEvent(id: string) {
    let event: Event | null = null;
    let fetchError: any = null;

    try {
      // First, get the event details
      const { data: fetchedEvent, error: fetchErr } = await supabase
        .from("events")
        .select("id, image_url, cloudinary_public_id") // Select only needed fields
        .eq("id", id)
        .single();

      event = fetchedEvent as Event | null;
      fetchError = fetchErr;

      if (fetchError) {
        // Handle case where event fetch fails (e.g., RLS policy)
        console.error(`Error fetching event ${id} for deletion:`, fetchError);
        // If it's a 'not found' type error (PGRST116), treat it as event not found
        if (fetchError.code === "PGRST116") {
          throw new Error(`Event with id ${id} not found for deletion.`);
        }
        // Incorporate fetchError details into the message
        const errorMessage = `Failed to fetch event ${id} for deletion. Original error: ${
          fetchError instanceof Error ? fetchError.message : String(fetchError)
        }`;
        throw new Error(errorMessage);
      }

      if (!event) {
        // Should be caught by PGRST116, but double-check
        throw new Error(`Event with id ${id} not found.`);
      }

      let imageErrors: Array<{
        type: string;
        message: string;
        error: any;
        path?: string;
        eventId?: string;
      }> = [];
      let mainImageDeleted = false;
      let galleryImagesDeleted = false;

      // --- Attempt to delete images first ---

      // Delete main event image (Cloudinary or Supabase)
      if (event.cloudinary_public_id) {
        try {
          console.log(
            `Attempting to delete Cloudinary image: ${event.cloudinary_public_id}`
          );
          await cloudinaryService.deleteImage(event.cloudinary_public_id);
          mainImageDeleted = true;
          console.log(
            `Successfully deleted Cloudinary image: ${event.cloudinary_public_id}`
          );
        } catch (error: any) {
          console.error(
            `Error deleting image ${event.cloudinary_public_id} from Cloudinary:`,
            error
          );
          imageErrors.push({
            type: "cloudinary",
            message: `Failed to delete main image from Cloudinary`,
            error,
            path: event.cloudinary_public_id,
          });
        }
      } else if (event.image_url) {
        try {
          console.log(
            `Attempting to delete Supabase image: ${event.image_url}`
          );
          await storageService.deleteEventImage(event.image_url);
          mainImageDeleted = true;
          console.log(
            `Successfully deleted Supabase image: ${event.image_url}`
          );
        } catch (error: any) {
          console.error(
            `Error deleting image ${event.image_url} from Supabase storage:`,
            error
          );
          imageErrors.push({
            type: "supabase",
            message: `Failed to delete main image from Supabase storage`,
            error,
            path: event.image_url,
          });
        }
      }

      // Delete all associated event gallery images (assuming this function exists and handles its errors)
      try {
        console.log(`Attempting to delete gallery images for event: ${id}`);
        // Assuming deleteEventAllImages returns status or throws on error
        await storageService.deleteEventAllImages(id);
        galleryImagesDeleted = true;
        console.log(`Successfully deleted gallery images for event: ${id}`);
      } catch (error: any) {
        console.error(
          `Error deleting event gallery images for event ${id}:`,
          error
        );
        imageErrors.push({
          type: "gallery",
          message: "Failed to delete gallery images",
          error,
          eventId: id,
        });
      }

      // --- Attempt to delete the event record ---
      let deleteError: any = null;
      try {
        const { error: dbDeleteError } = await supabase
          .from("events")
          .delete()
          .eq("id", id);

        deleteError = dbDeleteError;

        if (deleteError) {
          console.error(
            `Error deleting event record ${id} from database:`,
            deleteError
          );
          // Throw a specific error indicating DB deletion failure but potential partial image cleanup
          const errorDetails = {
            message: `Failed to delete event record ${id}, but image cleanup was attempted.`,
            cause: deleteError,
            context: {
              mainImageAttempted: !!(
                event.cloudinary_public_id || event.image_url
              ),
              mainImageDeleted,
              galleryImagesAttempted: true, // Assuming we always attempt this
              galleryImagesDeleted,
              imageErrors,
            },
          };
          throw Object.assign(new Error(errorDetails.message), {
            name: "EventDeletionError",
            details: errorDetails,
            stack: new Error().stack,
          });
        }

        // --- Success Case ---
        console.log(`Successfully deleted event record ${id}`);
        return {
          success: true,
          id,
          mainImageDeleted: mainImageDeleted, // Reflects actual deletion status
          galleryImagesDeleted: galleryImagesDeleted, // Reflects actual deletion status
          // Include image errors only if they occurred
          ...(imageErrors.length > 0 && { imageErrors }),
        };
      } catch (dbOrCombinedError: any) {
        // This catches the specific error thrown above if DB delete fails,
        // or any other unexpected error during the DB delete attempt.
        console.error(
          `Database error or combined error during event ${id} deletion:`,
          dbOrCombinedError
        );
        // Re-throw the caught error, which now contains detailed context
        throw dbOrCombinedError;
      }
    } catch (error: any) {
      // Catch errors from fetching, image deletion attempts prior to DB delete, or the final re-thrown error
      console.error(`Overall error in deleteEvent for id ${id}:`, error);
      // Ensure the error is propagated
      throw error;
    }
  },
  async registerForEvent(eventId: string, userId: string) {
    try {
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

      if (error) {
        console.error("Error registering for event:", error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error(
        `Error in registerForEvent (eventId: ${eventId}, userId: ${userId}):`,
        error
      );
      throw error;
    }
  },

  async getEventRegistrations(eventId: string) {
    try {
      if (!eventId) {
        throw new Error("Event ID is required");
      }

      const { data, error } = await supabase
        .from("event_registrations")
        .select(
          `
          *,
          profiles:user_id(*)
        `
        )
        .eq("event_id", eventId);

      if (error) {
        console.error("Error fetching event registrations:", error);
        throw error;
      }

      return data || [];
    } catch (error: any) {
      console.error(
        `Error in getEventRegistrations (eventId: ${eventId}):`,
        error
      );
      throw error;
    }
  },
};
