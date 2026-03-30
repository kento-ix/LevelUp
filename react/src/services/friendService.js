import api from "../config/api";

export const getFriendsByUserId = async (id) => {
  const res = await api.get(`/users/friends?id=${id}`);
  return res.data;
};

export const addFriendship = async (userId, friendId) => {
  const res = await api.post("/users/friends/add", { userId, friendId });
  return res.data;
};

export const countFriends = async () => {
  const res = await api.get("/users/friendcount");
  return res.data;
};