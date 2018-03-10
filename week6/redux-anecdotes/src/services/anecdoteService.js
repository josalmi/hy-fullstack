import axios from "axios";

export const getAll = async () => {
  return (await axios.get("http://localhost:3001/anecdotes")).data;
};

export const create = async data => {
  return (await axios.post("http://localhost:3001/anecdotes", data)).data;
};

export const patch = async (id, data) => {
  return (await axios.patch(`http://localhost:3001/anecdotes/${id}`, data))
    .data;
};

export default {
  getAll,
  create,
  patch
};
