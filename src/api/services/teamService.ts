import api from "../config";

export interface Team {
  _id: string;
  name: string;
  color: string;
  image: string;
  description: string;
  specialization: string;
  createdAt: string;
  updatedAt: string;
}

export const teamService = {
  // Get all teams
  getTeams: async () => {
    const response = await api.get<{ success: boolean; data: Team[] }>(
      "/teams"
    );
    return response.data;
  },

  // Get single team
  getTeam: async (id: string) => {
    const response = await api.get<{ success: boolean; data: Team }>(
      `/teams/${id}`
    );
    return response.data;
  },

  // Create team (admin only)
  createTeam: async (
    teamData: Omit<Team, "_id" | "createdAt" | "updatedAt">
  ) => {
    const response = await api.post<{ success: boolean; data: Team }>(
      "/teams",
      teamData
    );
    return response.data;
  },

  // Update team (admin only)
  updateTeam: async (id: string, teamData: Partial<Team>) => {
    const response = await api.put<{ success: boolean; data: Team }>(
      `/teams/${id}`,
      teamData
    );
    return response.data;
  },

  // Delete team (admin only)
  deleteTeam: async (id: string) => {
    const response = await api.delete<{ success: boolean }>(`/teams/${id}`);
    return response.data;
  },
};
