import axios from "axios";

export const fetchAnecdotes = async () => {
  return (await axios.get("http://localhost:3001/anecdotes")).data;
};
