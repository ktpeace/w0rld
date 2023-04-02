import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import UserContext from "@/components/userContext";
import axios from "axios";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [invalidInputs, setInvalidInputs] = useState("");
  const { user, setUser } = useContext(UserContext);

  const handleForgotPassword = () => {
    alert("Well that's tooooo durn bad!");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = { username, password };
    if (username.length === 0 || password.length === 0) {
      setInvalidInputs("Both fields are required.");
      return;
    }
    if (username.length < 6) {
      setInvalidInputs(
        "Invalid username. (Usernames are a minimum of 6 characters.)"
      );
      return;
    }
    if (password.length < 8) {
      setInvalidInputs(
        "Invalid password. (Passwords are a minimum of 8 characters.)"
      );
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        user,
        { withCredentials: true }
      );
      if (response.status === 200) {
        localStorage.setItem("user", username);
        setUser(username);
        setUsername("");
        setPassword("");
      }
      router.push("/");
      // redirect to home/updates
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data.message) {
        setInvalidInputs(error.response.data.message);
      } else {
        setInvalidInputs(`Error: ${error}`);
      }
    }
  };

  // check if user is already logged in
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = loggedInUser;
      setUser(foundUser);
      setUsername(foundUser);
    }
  }, []);

  // if user is logged in show the message below
  if (user) {
    return (
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-8 gap-5 dark:text-dark">
        <div>{user || username} is already logged in.</div>
        {/* <button onClick={handleLogout} className="border rounded p-2">
          Log Out
        </button> */}
      </main>
    );
  }

  // if there's no user, show the login form
  return (
    <main className="flex-grow flex flex-col items-center justify-center px-6 py-8 gap-5 dark:text-dark">
      <h1 className="text-2xl">Log In</h1>
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
            name="username"
            value={username}
            className="rounded p-1 text-slate-900"
            onChange={({ target }) => setUsername(target.value)}
            autoComplete="username"
          />
        </div>
        <div className="flex justify-between gap-2">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            value={password}
            className="rounded p-1 text-slate-900"
            onChange={({ target }) => setPassword(target.value)}
            autoComplete="password"
          />
        </div>
        <div>
          <p
            className="text-center underline cursor-pointer"
            onClick={handleForgotPassword}
          >
            Forgot password?
          </p>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="border rounded py-1 px-2 font-bold dark:bg-slate-800 dark:hover:border-slate-500 dark:hover:bg-slate-700"
          >
            Log In
          </button>
        </div>
      </form>
    </main>
  );
};

export default Login;
