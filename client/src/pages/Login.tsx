import { Link, useNavigate } from "react-router-dom";
import banner from "../assets/images/banner.jpg";
import type { LoginPayload } from "../@types/accessPayload";
import AuthApi from "../api/auth.api";
import { useState } from "react";
import type { ApiErrorResponse } from "../@types/api";
import type { AxiosError } from "axios";

export default function Login() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const raw = Object.fromEntries(formData.entries());

    const payload: LoginPayload = {
      email: raw.email as string,
      password: raw.password as string,
    };

    try {
      const res = await AuthApi.login(payload);

      localStorage.setItem("accessToken", res.metadata.tokens.accessToken);
      localStorage.setItem("refreshToken", res.metadata.tokens.refreshToken);

      navigate("/");
    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>;

      setError(error.response?.data.message || "Lỗi không xác định");
    }
  };

  return (
    <>
      <div className="grid grid-cols-2">
        <div className="flex flex-col content-center items-center justify-center">
          <h1 className="text-3xl font-semibold mb-6">Login</h1>

          {error && <h1 className="text-red-600 text-xl">{error}</h1>}

          <form
            action="/login"
            method="post"
            className="flex flex-col gap-2 p-6 w-100"
            onSubmit={handlerSubmit}
          >
            <div>
              <label htmlFor="email" className="font-medium">
                Email
              </label>{" "}
              <br />
              <input
                type="email"
                name="email"
                id="email"
                className="border rounded-md mt-1 w-full p-1 pl-3 outline-none"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="font-medium">
                Password
              </label>{" "}
              <br />
              <input
                type="password"
                name="password"
                id="password"
                className="border rounded-md mt-1 w-full p-1 pl-3 outline-none"
                placeholder="Enter your password"
              />
            </div>

            <button
              className="bg-blue-600 text-white font-semibold border rounded-md py-2 text-xl cursor-pointer mt-2"
              type="submit"
            >
              Sign in
            </button>
          </form>

          <div>
            Don't have an account?
            <Link to="/register" className="underline">
              Register
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <img src={banner} alt="test" className="object-cover h-screen " />
        </div>
      </div>
    </>
  );
}
