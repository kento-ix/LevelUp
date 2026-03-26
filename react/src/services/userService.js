import api from "../config/api";

export const getAll = async () => {
  const res = await api.get("/users");
  return res.data;
};

export const getById = async (id) => {
  const res = await api.get(`/users/show?id=${id}`);
  return res.data;
};
 
export const searchEmail = async (email) => {
  const res = await api.get(`/users/searchEmail?email=${email}`);
  return res.data;
};