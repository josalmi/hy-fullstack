import axios from "axios";
const baseUrl = "/api/blogs";

let bearerToken;

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async blog => {
  const response = await axios.post(baseUrl, blog, {
    headers: { Authorization: bearerToken }
  });
  return response.data;
};

const setToken = token => {
  bearerToken = `bearer ${token}`;
};

export default { getAll, create, setToken };
