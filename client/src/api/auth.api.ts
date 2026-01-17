import type { LoginPayload, RegisterPayload } from "../@types/accessPayload";
import { ROUTES } from "../routes/routes.constant";
import api from "./axios";

export default class AuthApi {
  static register = async (payload: RegisterPayload) => {
    return await fetch(ROUTES.REGISTER, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(payload),
    });
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
