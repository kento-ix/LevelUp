import api from "../config/api";

export const getAll = async () => {
  const res = await api.get("/posts");
  return res.data;
};

export const getByCommunityID = async (id) => {
  const res = await api.get(`/posts/byCommunity?id=${id}`);
  return res.data;
};
