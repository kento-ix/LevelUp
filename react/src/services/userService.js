import api from "../config/api";

export const getAll = async () => {
  const response = await api.get("/users");
  return response.data;
};
