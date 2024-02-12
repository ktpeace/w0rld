"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { useUser } from "@/context/UserContext";
import { pwnedPassword } from "hibp";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import steampunkHorsies from "../../../public/gpt-dalle-steampunk-horses.webp";

const CreateAccount = () => {
  const router = useRouter();
  const { user, setUser } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const [userExists, setUserExists] = useState("");
  const [invalidInputs, setInvalidInputs] = useState("");

  const handleLogout = () => {
    setUser("");
    setUsername("");
    setPassword("");
    setPassword2("");
    setEmail("");
    localStorage.clear();
  };

  useEffect(() => {
    if (invalidInputs.length > 0) setInvalidInputs("");
  }, [username, password, password2, email]);

  const validateUsername = () => {
    if (username.length < 4 || username.length > 20) {
      setInvalidInputs("Username must be 4-20 characters.");
      return false;
    }
    return true;
  };

  const validateEmail = () => {
    if (email.length < 3) {
      setInvalidInputs("Email must be at least 3 characters.");
      return false;
    }
    if (
      !String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setInvalidInputs("Invalid email format.");
      return false;
    }
    return true;
  };

  const validatePassword = async () => {
    if (password !== password2) {
      setInvalidInputs("Them thur passwords don't match, girlfriend.");
      return false;
    }
    if (password.length < 8) {
      setInvalidInputs("Password must be at least 8 characters.");
      return false;
    }
    if (password === username) {
      setInvalidInputs(
        "Please don't make your password the same as your username. Do have an apple for your horse. 🍎"
      );
      return false;
    }

    try {
      const numPwns = await pwnedPassword(password);
      if (numPwns) {
        setInvalidInputs(
          "This password exists in password breach databases.\nPet the horsey to learn how to make a great password that is easy to remember."
        );
        return false;
      } else {
        return true;
      }
    } catch (err) {
      console.log("Error checking password.");
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Clear form/errors
    setUserExists("");
    setInvalidInputs("");
    // Validate inputs
    const isValidPassword = await validatePassword();
    if (!isValidPassword || !validateEmail() || !validateUsername()) return;
    // Objectify inputs and send to server
    const userDeets = { username, password, password2, email };
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/create`,
        userDeets
      );
      // Handle any server rejections
      if (response.data.emailExists) {
        setUserExists("An account exists with this email.");
      } else if (response.data.usernameExists) {
        setUserExists("This username is taken.");
        // Login user
      } else {
        setUsername("");
        setPassword("");
        setEmail("");
        router.push("/login");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data.message) {
        setInvalidInputs(error.response.data.message);
      } else {
        setInvalidInputs(`Error: ${error}`);
      }
    }
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = loggedInUser;
      setUser(foundUser);
      setUsername(foundUser);
    }
  }, []);

  // if there's a user show the message below
  if (user) {
    return (
      <div className="h-full flex-grow flex flex-col items-center justify-center px-6 py-8 gap-5 dark:text-dark">
        {/* Background image */}
        <div className="absolute inset-0 z-[-5] overflow-hidden">
          <Image
            src={steampunkHorsies}
            alt="Background image of mechanical horses"
            quality={100}
            fill
            sizes="100vw"
            className="opacity-10 object-cover"
          />
        </div>
        <div>{user} is logged in</div>
        <button onClick={handleLogout} className="border rounded p-2">
          Log Out
        </button>
      </div>
    );
  }

  // if there's no user, show CreateAccount form
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
      <div className="h-full flex flex-col items-center justify-center ">
        <div className="w-11/12 md:w-1/2 flex flex-col items-center justify-center px-6 py-8 gap-5 rounded bg-parchment-300 dark:bg-perse-700 bg-opacity-50 dark:bg-opacity-50">
          <h1 className="text-2xl">Create Account</h1>
          {userExists.length > 1 && <p>{userExists}</p>}
          {invalidInputs.length > 1 && (
            <div className="w-full flex items-center p-2 gap-4 border-2 rounded-md bg-red-100 dark:bg-red-500 dark:bg-opacity-20 bg-opacity-50 border-red-950 text-red-100">
              <ExclamationCircleIcon className="h-10 w-10" />
              <p>{invalidInputs}</p>
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center gap-3"
          >
            <div className="flex justify-between gap-2">
              <label htmlFor="username">Username: </label>
              <input
                type="text"
                value={username}
                className="rounded p-1 border-gray-500 border-2 bg-transparent"
                onChange={({ target }) => setUsername(target.value)}
                required
                minLength={4}
                maxLength={20}
                autoComplete="username"
              />
            </div>
            <div className="flex justify-between gap-2">
              <label htmlFor="email">Email: </label>
              <input
                type="email"
                value={email}
                className="rounded p-1 border-gray-500 border-2 bg-transparent autofill:bg-yellow-200"
                onChange={({ target }) => setEmail(target.value)}
                required
                minLength={3}
                maxLength={255}
                autoComplete="email"
              />
            </div>
            <div className="flex justify-between gap-2">
              <label htmlFor="password">
                Password{" "}
                <a
                  href="https://xkcd.com/936/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Neii-ei-ei-eigh!"
                >
                  🐎
                </a>
                :{" "}
              </label>
              <input
                type="password"
                value={password}
                className="rounded p-1 border-gray-500 border-2 bg-transparent"
                onChange={({ target }) => setPassword(target.value)}
                required
                minLength={8}
                maxLength={65}
                autoComplete="new-password"
              />
            </div>
            <div className="flex justify-between gap-2">
              <label htmlFor="password2">Reenter Password: </label>
              <input
                type="password"
                value={password2}
                className="rounded p-1 border-gray-500 border-2 bg-transparent"
                onChange={({ target }) => setPassword2(target.value)}
                required
                minLength={8}
                maxLength={65}
                autoComplete="new-password"
              />
            </div>
            <div className="mt-4 flex justify-center">
              <button
                type="submit"
                className="border-2 border-gray-500 rounded py-1 px-2 font-bold bg-transparent hover:bg-rainbow hover:bg-opacity-50"
                title="LIVE UR BEST LIFE"
              >
                TALLY HO
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateAccount;
