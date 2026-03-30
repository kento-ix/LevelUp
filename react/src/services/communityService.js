import api from "../config/api";

export const getAllCommunities = async () => {
  const res = await api.get("/communities");
  return res.data;
};

export const getCommunitiesByUser = async (id) => {
  const res = await api.get(`/communities/user?id=${id}`);
  return res.data;
};

export const division = async () => {
  const res = await api.get("/communities/division");
  return res.data;
};