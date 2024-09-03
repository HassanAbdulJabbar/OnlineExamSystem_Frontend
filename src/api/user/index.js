import { request } from "..";
import { endpoints } from "../../endpoints/endpoints";

export async function register(userData) {
  return await request({
    url: endpoints.auth.signin,
    method: "post",
    data: userData,
  });
}
