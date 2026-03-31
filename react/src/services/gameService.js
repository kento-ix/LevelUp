import api from "../config/api";

export const getGameStats = async () => {
  const res = await api.get(`/games/stats`);
  return res.data;
};
