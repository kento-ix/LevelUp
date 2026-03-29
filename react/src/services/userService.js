import api from "../config/api";

export const getAll = async () => {
  const res = await api.get("/users");
  return res.data;
};

export const getById = async (id) => {
  const res = await api.get(`/users/show?id=${id}`);
  return res.data;
};
 
export const searchUsername = async (username) => {
  const res = await api.get(`/users/searchUsername?username=${username}`);
  return res.data;
};