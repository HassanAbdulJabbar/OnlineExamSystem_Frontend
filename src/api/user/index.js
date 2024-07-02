import { request } from "./index.js";

export async function register(userData) {
  return await request({
    url: "/users/register",
    method: "post",
    data: userData,
  });
}
