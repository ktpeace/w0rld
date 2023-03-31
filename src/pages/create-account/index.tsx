import { useState, useEffect, useContext } from "react";
import UserContext from "@/components/userContext";
import axios from "axios";
import { AxiosError } from "axios";
import { pwnedPassword } from "hibp";

const CreateAccount = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const { user, setUser } = useContext(UserContext);
  const [userExists, setUserExists] = useState("");
  const [invalidInputs, setInvalidInputs] = useState("");

  const handleLogout = () => {
    setUser("");
    setUsername("");
    setPassword("");
    setEmail("");
    localStorage.clear();
  };

  const validateUsername = () => {
    if (username.length < 6) {
      setInvalidInputs("Username must be at least 6 characters.");
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
      setInvalidInputs("Passwords do not match.");
      return false;
    }
    if (password.length < 8) {
      setInvalidInputs("Password must be at least 8 characters.");
      return false;
    }
    if (username.includes(password)) {
      setInvalidInputs("Please don't put your username in your password.");
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
    setUserExists("");
    setInvalidInputs("");
    const isValidPassword = await validatePassword();
    if (!isValidPassword || !validateEmail() || !validateUsername()) return;
    // const userDeets = { username, password, password2, email };
    // console.log(userDeets);
    // try {
    //   const response = await axios.post(
    //     "http://localhost:5000/api/create-account",
    //     userDeets
    //   );
    //   console.log(response.data);
    //   if (response.data.emailExists) {
    //     setUserExists("An account exists with this email.");
    //   } else if (response.data.usernameExists) {
    //     setUserExists("This username is taken.");
    //   } else {
    //     localStorage.setItem("user", username);
    //     setUser(username);
    //     setUsername("");
    //     setPassword("");
    //     setEmail("");
    //     // redirect to home/updates or login
    //   }
    // } catch (error) {
    //   if (axios.isAxiosError(error) && error.response?.data.message) {
    //     setInvalidInputs(error.response.data.message);
    //   } else {
    //     console.error("Error creating account: ", error);
    //   }
    // }
    alert("Waiting on a beanstalk. 🌱 Try again soon.");
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(loggedInUser);
      console.log("logged in", loggedInUser);
    }
  }, []);

  // if there's a user show the message below
  if (user.length > 0) {
    return (
      <main className="flex flex-col items-center mt-20 px-6 py-8 gap-5 dark:text-dark">
        <div>{user} is logged in</div>
        <button onClick={handleLogout} className="border rounded p-2">
          Log Out
        </button>
      </main>
    );
  }

  // if there's no user, show CreateAccount form
  return (
    <main className="flex flex-col items-center mt-20 px-6 py-8 gap-5 dark:text-dark">
      <h1 className="text-2xl">Create Account</h1>
      {userExists.length > 1 && <p className="text-red-500">{userExists}</p>}
      {invalidInputs.length > 1 && (
        <p className="text-red-500 whitespace-pre-wrap text-center">
          {invalidInputs}
        </p>
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
            className="rounded p-1 text-slate-900"
            onChange={({ target }) => setUsername(target.value)}
            required
            minLength={6}
            maxLength={20}
            autoComplete="username"
          />
        </div>
        <div className="flex justify-between gap-2">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            value={email}
            className="rounded p-1 text-slate-900"
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
            <a href="https://xkcd.com/936/" target="_blank">
              🐎
            </a>
            :{" "}
          </label>
          <input
            type="password"
            value={password}
            className="rounded p-1 text-slate-900"
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
            className="rounded p-1 text-slate-900"
            onChange={({ target }) => setPassword2(target.value)}
            required
            minLength={6}
            maxLength={65}
            autoComplete="new-password"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="border rounded py-1 px-2 font-bold dark:bg-slate-800 dark:hover:border-slate-500 dark:hover:bg-slate-700"
          >
            Create Account
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateAccount;
