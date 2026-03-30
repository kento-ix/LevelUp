import api from "../config/api";

export const getAllGames = async () => {
  const res = await api.get("/games");
  return res.data;
};

export const getGameCount = async () => {
  const res = await api.get("/games/count");
  return res.data;
};

export const getRecentlyPublished = async () => {
  const res = await api.get("/games/recent");
  return res.data;
};