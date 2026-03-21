import api from "../config/api";

export const getAll = async () => {
  const res = await api.get("/users");
  return res.data;
};
