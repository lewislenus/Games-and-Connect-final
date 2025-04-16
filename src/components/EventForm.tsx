import React, { useState } from "react";
import { X } from "lucide-react";
import { supabase } from "../api/supabase";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

      // Call the onSave function with the event data
      await onSave(eventData);
      onClose();
    } catch (error) {
      console.error("Error saving event:", error);
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
              className="px-6 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
            >
              {event ? "Update Event" : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
