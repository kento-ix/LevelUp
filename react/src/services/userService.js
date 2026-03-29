import api from "../config/api";

export const getAll = async () => {
  const res = await api.get("/users");
  return res.data;
};

export const getById = async (id) => {
  const res = await api.get(`/users/show?id=${id}`);
  return res.data;
};
 
export const createUser = async (email, username, password) => {
  const res = await api.post("/users/create", {
    email,
    username,
    password
  });
  return res.data;
};

export const projection = async (fields) => {
  const res = await api.get(`/users/projection?fields=${fields.join(',')}`);
  return res.data;
};