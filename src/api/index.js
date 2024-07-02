import axios from "axios";

const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const request = ({ ...options }) => {
  const token = ` ${localStorage.getItem("token")}`;

  client.defaults.headers.common["authorization"] = token;

  return client(options);
};


