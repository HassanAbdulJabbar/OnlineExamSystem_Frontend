import { request } from "..";

export async function register(userData) {
  return await request({
    url: "/users/register",
    method: "post",
    data: userData,
  });
}
