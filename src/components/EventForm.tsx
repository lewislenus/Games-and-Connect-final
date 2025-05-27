import React, { useState, useEffect, useCallback } from "react";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { cloudinaryService } from "../api/services/cloudinaryService";

interface EventFormProps {
  onClose: () => void;
  onSave: (eventData: any, images?: File[]) => void;
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
    gallery?: string[];
    cloudinary_public_id?: string;
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
    images: [] as File[],
    image_url: event?.image_url || event?.image || "",
    capacity: event?.capacity || "",
    price: event?.price || "",
    status: event?.status || "published",
  });

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Set initial image preview if event has an image_url
  // Updated useEffect with gallery priority
  useEffect(() => {
    if (event?.gallery && event.gallery.length > 0) {
      setImagePreviews(event.gallery);
    } else if (event?.image_url) {
      setImagePreviews([event.image_url]);
    } else if (event?.cloudinary_public_id) {
      const optimizedUrl = cloudinaryService.getResponsiveImageUrl(
        event.cloudinary_public_id,
        300
      );
      setImagePreviews([optimizedUrl]);
    } else {
      setImagePreviews([]);
    }
  }, [event]);

  // Handle image file selection
  const handleImageUpload = useCallback(async (acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map((file) => {
      const previewUrl = URL.createObjectURL(file);
      return { file, previewUrl };
    });

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...acceptedFiles],
    }));
    setImagePreviews((prev) => [
      ...prev,
      ...newImages.map((img) => img.previewUrl),
    ]);
  }, []);

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

      // Call the onSave function with the event data and images
      await onSave(eventData, formData.images);
      onClose();
    } catch (error) {
      console.error("Error saving event:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-primary-900 bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-2xl my-4">
        <div className="flex justify-between items-center p-4 sm:p-6 border-b">
          <h2 className="text-lg sm:text-xl font-semibold">CREATE EVENT</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto max-h-[calc(100vh-10rem)]"
        >
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
              className="w-full p-2 border rounded text-sm md:text-base"
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
              className="w-full p-2 border rounded h-28 sm:h-32 text-sm md:text-base"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                className="w-full p-2 border rounded text-sm md:text-base"
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
                className="w-full p-2 border rounded text-sm md:text-base"
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
                className="w-full p-2 border rounded text-sm md:text-base"
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
                className="w-full p-2 border rounded text-sm md:text-base"
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
              className="w-full p-2 border rounded text-sm md:text-base"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              EVENT IMAGE
            </label>
            <div className="flex flex-col items-center space-y-3">
              {/* Image preview */}
              {imagePreviews.length > 0 ? (
                <div className="relative w-full h-40 sm:h-48 mb-2 border rounded overflow-hidden">
                  <img
                    src={imagePreviews[0]}
                    alt="Event preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreviews([]);
                      setFormData({ ...formData, images: [], image_url: "" });
                    }}
                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full touch-manipulation"
                    aria-label="Remove image"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="w-full h-40 sm:h-48 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center bg-gray-50">
                  <div className="text-center p-4">
                    <ImageIcon className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
                    <p className="mt-1 text-sm text-gray-500">
                      Upload event image
                    </p>
                  </div>
                </div>
              )}

              {/* File input */}
              <label className="w-full flex justify-center items-center px-4 py-3 sm:py-2 bg-primary-600 text-white rounded cursor-pointer hover:bg-primary-700 touch-manipulation">
                <Upload className="mr-2 h-4 w-4" />
                <span className="text-sm sm:text-base">
                  {imagePreviews.length > 0 ? "Change Image" : "Upload Image"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      handleImageUpload([...e.target.files]);
                    }
                  }}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-gray-500 text-center">
                Recommended size: 1200×800 pixels. Max size: 5MB.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 sm:py-2 border rounded text-gray-600 hover:bg-gray-50 text-sm sm:text-base touch-manipulation w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 sm:py-2 bg-primary-600 text-white rounded hover:bg-primary-700 flex items-center justify-center text-sm sm:text-base touch-manipulation w-full sm:w-auto"
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
