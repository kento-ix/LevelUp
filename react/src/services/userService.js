import api from "../config/api";

export const getAll = async () => {
  const res = await api.get("/users");
  return res.data;
};

export const getById = async (id) => {
  const res = await api.get(`/users/show?id=${id}`);
  return res.data;
};

export const getByName = async (searchName) => {
  const res = await api.get(`/users/searchUsername?username=${searchName}`);
  return res.data;
};

export const getProjection = async (fields) => {
  const res = await api.get(`/users/projection?fields=${fields.join(',')}`);
  return res.data;
};

export const deleteUser = async (id) => {
  const res = await api.delete(`/users/delete?id=${id}`);
  return res.data;
};

export const updateUser = async (id, username, availability) => {
  const res = await api.put(`/users/update?id=${id}`, { username, availability });
  return res.data;
};
 