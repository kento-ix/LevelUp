import api from "../config/api";

export const getAllCommunities = async () => {
    const res = await api.get(`/community`);
    return res.data;
};

export const getCommunitiesByUserId = async (id) => {
  const res = await api.get(`/community/getByUser?id=${id}`);
  return res.data;
};

export const getDivisionUsers = async () => {
  const res = await api.get(`/community/division`);
  return res.data;
};

