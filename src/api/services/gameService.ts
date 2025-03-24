import api from "../config";

export interface Game {
  _id: string;
  name: string;
  image: string;
  skillLevel: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export const gameService = {
  // Get all games
  getGames: async () => {
    const response = await api.get<{ success: boolean; data: Game[] }>(
      "/games"
    );
    return response.data;
  },

  // Get single game
  getGame: async (id: string) => {
    const response = await api.get<{ success: boolean; data: Game }>(
      `/games/${id}`
    );
    return response.data;
  },

  // Create game (admin only)
  createGame: async (
    gameData: Omit<Game, "_id" | "createdAt" | "updatedAt">
  ) => {
    const response = await api.post<{ success: boolean; data: Game }>(
      "/games",
      gameData
    );
    return response.data;
  },

  // Update game (admin only)
  updateGame: async (id: string, gameData: Partial<Game>) => {
    const response = await api.put<{ success: boolean; data: Game }>(
      `/games/${id}`,
      gameData
    );
    return response.data;
  },

  // Delete game (admin only)
  deleteGame: async (id: string) => {
    const response = await api.delete<{ success: boolean }>(`/games/${id}`);
    return response.data;
  },
};
