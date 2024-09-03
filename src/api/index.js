import axios from "axios";
import { token } from "../services/userState.service";

const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const request = ({ ...options }) => {
  client.defaults.headers.common["authorization"] = token;

  return client(options);
};
