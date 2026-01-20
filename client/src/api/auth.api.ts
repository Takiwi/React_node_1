import type { LoginPayload, RegisterPayload } from "../@types/accessPayload";
import type { ApiResponse } from "../@types/api";
import api from "./axios";
class AuthApi {
  API_URL = import.meta.env.VITE_API_URL;

  register = async (payload: RegisterPayload) => {
    const res = await api.post(this.API_URL + "/register", payload);

    return res.data;
  };

  login = async (payload: LoginPayload) => {
    const res = await api.post<ApiResponse>(this.API_URL + "/login", payload);

    return res.data;
  };

  auth = async (accessToken: string) => {
    const res = await api.post(this.API_URL + "/me", accessToken);

    return res.data;
  };
}

export default new AuthApi();
