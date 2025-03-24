import api from "../config";

export interface VolunteerData {
  name: string;
  email: string;
  phone: string;
  interests: string[];
  availability: string[];
  experience: string;
  message: string;
}

export const volunteerService = {
  // Submit volunteer application
  submitApplication: async (volunteerData: VolunteerData) => {
    try {
      // Since there's no dedicated volunteer endpoint in the backend yet,
      // we'll use the users endpoint with a special flag for volunteers
      const response = await api.post<{ success: boolean; message: string }>(
        "/users/volunteer",
        volunteerData
      );
      return response.data;
    } catch (error) {
      console.error("Error submitting volunteer application:", error);
      throw error;
    }
  },
};
