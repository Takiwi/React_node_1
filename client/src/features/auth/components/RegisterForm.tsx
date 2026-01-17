import type { RegisterPayload } from "../../../@types/accessPayload";
import banner from "../../../assets/images/banner.jpg";
import AccessService from "../services/access.service";

export function RegisterForm() {
  const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const raw = Object.fromEntries(formData.entries());

    const payload: RegisterPayload = {
      username: raw.username as string,
      email: raw.email as string,
      password: raw.password as string,
    };

    AccessService.signup(payload);
  };

  return (
    <>
      <div className="grid grid-cols-2">
        <div className="flex flex-col content-center items-center justify-center">
          <h1 className="text-3xl font-semibold mb-6">Register</h1>

          <form
            action="/signup"
            method="post"
            className="flex flex-col gap-2 p-6 w-100"
            onSubmit={handlerSubmit}
          >
            <div>
              <label htmlFor="username" className="font-medium">
                Name
              </label>
              <br />
              <input
                type="text"
                name="username"
                id="username"
                className="border rounded-md mt-1 w-full p-1 pl-3 outline-none"
                placeholder="Enter your name"
              />
            </div>

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
              Sign up
            </button>
          </form>

          <div>
            Have a account?
            <a href="/login" className="underline">
              Login
            </a>
          </div>
        </div>

        <div className="flex justify-center">
          <img src={banner} alt="test" className="object-cover h-screen " />
        </div>
      </div>
    </>
  );
}
