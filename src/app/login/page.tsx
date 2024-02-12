"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { useUser } from "@/context/UserContext";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import steampunkHorsies from "../../../public/gpt-dalle-steampunk-horses.webp";

const Login = () => {
  const router = useRouter();
  const { user, setUser } = useUser();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Clear error messages on user typing
  useEffect(() => {
    if (loginError) setLoginError("");
  }, [usernameOrEmail, password]);

  // Handle login attempt
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoginError("");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/login`,
        { usernameOrEmail, password },
        {
          withCredentials: true,
        }
      );

      const resUser = response.data.user;
      console.log("response:", response);
      // Set user
      localStorage.setItem("user", JSON.stringify(resUser));
      setUser(resUser);

      router.push("/");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data.message) {
        setLoginError(error.response.data.message);
      } else {
        setLoginError("Login failed. Please try again.");
      }
    }
  };

  return (
    <>
      {/* Background image */}
      <div className="absolute inset-0 z-[-5] overflow-hidden">
        <Image
          src={steampunkHorsies}
          alt="Background image of mechanical horses"
          quality={100}
          fill
          sizes="100vw"
          className="opacity-15 object-cover"
        />
      </div>
      <div className="h-full flex flex-col items-center justify-center">
        <div className="w-11/12 md:w-1/2 flex flex-col items-center justify-center px-6 py-8 gap-5 rounded bg-parchment-300 dark:bg-perse-700 bg-opacity-50 dark:bg-opacity-50">
          <h1 className="text-2xl">Login</h1>
          {loginError && (
            <div className="w-full flex items-center p-2 gap-4 border-2 rounded-md bg-red-100 dark:bg-red-500 dark:bg-opacity-20 bg-opacity-50 border-red-950 text-red-100">
              <ExclamationCircleIcon className="h-10 w-10" />
              <p>{loginError}</p>
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center gap-3"
          >
            <div className="flex justify-between gap-2">
              <label htmlFor="usernameOrEmail">Username or Email: </label>
              <input
                type="text"
                value={usernameOrEmail}
                onChange={({ target }) => setUsernameOrEmail(target.value)}
                required
                className="rounded p-1 border-gray-500 border-2 bg-transparent"
                autoComplete="username"
              />
            </div>
            <div className="flex justify-between gap-2">
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                required
                className="rounded p-1 border-gray-500 border-2 bg-transparent"
                autoComplete="current-password"
              />
            </div>
            <div className="mt-4 flex justify-center">
              <button
                type="submit"
                className="border-2 border-gray-500 rounded py-1 px-2 font-bold bg-transparent hover:bg-rainbow hover:bg-opacity-50"
              >
                LOGIN
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
