import type { LoginPayload, RegisterPayload } from "../@types/accessPayload";
import api from "./axios";

export default class AuthApi {
  static register = async (payload: RegisterPayload) => {
    const res = await api.post(
      import.meta.env.VITE_API_URL + "/register",
      payload,
    );

    return res.data;
  };

  static login = async (payload: LoginPayload) => {
    api.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${payload.accessToken}`;

        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  };
}
