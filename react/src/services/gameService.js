import api from "../config/api";

export const getAll = async () => {
  const res = await api.get(`/games`);
  return res.data;
};


export const getGameStats = async () => {
  const res = await api.get(`/games/stats`);
  return res.data;
};
