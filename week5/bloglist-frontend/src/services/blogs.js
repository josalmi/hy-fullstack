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

const update = async ({ _id, user: { _id: user }, ...blog }) => {
  const response = await axios.put(
    `${baseUrl}/${_id}`,
    {
      ...blog,
      user
    },
    {
      headers: { Authorization: bearerToken }
    }
  );
  return response.data;
};

const setToken = token => {
  bearerToken = `bearer ${token}`;
};

export default { getAll, create, update, setToken };
