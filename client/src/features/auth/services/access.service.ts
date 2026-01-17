import type { RegisterPayload } from "../../../@types/accessPayload";

export default class AccessService {
  static signup = async (payload: RegisterPayload) => {
    return fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  };
}
