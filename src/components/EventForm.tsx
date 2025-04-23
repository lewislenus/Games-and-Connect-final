import React, { useState, useEffect } from "react";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { supabase } from "../api/supabase";
import { cloudinaryService } from "../api/services/cloudinaryService";

interface EventFormProps {
  onClose: () => void;
  onSave: (eventData: any) => void;
  event?: {
    id?: string | number;
    title?: string;
    description?: string;
    date?: string;
    time?: string;
    location?: string;
    image?: string;
    image_url?: string;
    capacity?: number | string;
    price?: number | string;
    status?: string;
  };
}

export default function EventForm({ onClose, onSave, event }: EventFormProps) {
  const [formData, setFormData] = useState({
    title: event?.title || "",
    description: event?.description || "",
    date: event?.date ? new Date(event.date).toISOString().split("T")[0] : "",
    time: event?.time || "",
    duration: "",
    location: event?.location || "",
    image: null as File | null,
    image_url: event?.image_url || event?.image || "",
    capacity: event?.capacity || "",
    price: event?.price || "",
    status: event?.status || "published",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Set initial image preview if event has an image_url
  useEffect(() => {
    if (event?.image_url) {
      setImagePreview(event.image_url);
    } else if (event?.cloudinary_public_id) {
      // Generate optimized preview if we have a Cloudinary public_id
      const optimizedUrl = cloudinaryService.getResponsiveImageUrl(
        event.cloudinary_public_id,
        300 // Preview size
      );
      setImagePreview(optimizedUrl);
    }
  }, [event]);

  // Handle image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Update form data with the selected file
    setFormData({ ...formData, image: file });

    // Create a preview URL for the selected image
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      // Prepare the event data
      const eventData = {
        title: formData.title,
        description: formData.description,
        date: `${formData.date}T${formData.time || "00:00"}`,
        location: formData.location,
        image_url: formData.image_url,
        capacity: formData.capacity,
        price: formData.price,
        status: formData.status,
      };

      // Call the onSave function with the event data and image file
      await onSave(eventData, formData.image);
      onClose();
    } catch (error) {
      console.error("Error saving event:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">CREATE EVENT</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              TITLE
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              DESCRIPTION
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full p-2 border rounded h-32"
              required
            />
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                DATE
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                TIME
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CAPACITY
              </label>
              <input
                type="text"
                value={formData.capacity}
                onChange={(e) =>
                  setFormData({ ...formData, capacity: e.target.value })
                }
                className="w-full p-2 border rounded"
                placeholder="e.g. 50 participants"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PRICE
              </label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-full p-2 border rounded"
                placeholder="e.g. GHS 250"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              LOCATION
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              EVENT IMAGE
            </label>
            <div className="flex flex-col items-center space-y-2">
              {/* Image preview */}
              {imagePreview ? (
                <div className="relative w-full h-48 mb-2 border rounded overflow-hidden">
                  <img
                    src={imagePreview}
                    alt="Event preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setFormData({ ...formData, image: null, image_url: "" });
                    }}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center bg-gray-50">
                  <div className="text-center p-4">
                    <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-1 text-sm text-gray-500">
                      Upload event image
                    </p>
                  </div>
                </div>
              )}

              {/* File input */}
              <label className="w-full flex justify-center items-center px-4 py-2 bg-primary-600 text-white rounded cursor-pointer hover:bg-primary-700">
                <Upload className="mr-2 h-4 w-4" />
                {imagePreview ? "Change Image" : "Upload Image"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-gray-500 text-center">
                Recommended size: 1200×800 pixels. Max size: 5MB.
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border rounded text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 flex items-center justify-center"
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {event ? "Updating..." : "Creating..."}
                </>
              ) : (
                <>{event ? "Update Event" : "Create Event"}</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
