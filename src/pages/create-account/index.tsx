import { useState, useEffect, useContext } from "react";
import UserContext from "@/components/userContext";
import axios from "axios";

const CreateAccount = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    setUser("");
    setUsername("");
    setPassword("");
    setEmail("");
    localStorage.clear();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault();
    // const userDeets = { username, password, email };
    // console.log("submitted");
    // try {
    //   const response = await axios.post(
    //     "http://localhost:5000/api/create-account",
    //     userDeets
    //   );
    //   console.log(response.data);
    //   localStorage.setItem("user", username);
    //   setUser(username);
    //   setUsername("");
    //   setPassword("");
    //   setEmail("");
    //   // redirect to home/updates or login
    // } catch (error) {
    //   console.error("Error fetching column names: ", error);
    // }
    alert("Waiting on a beanstalk. 🌱 Try again soon.");
  };

  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem("user");
  //   if (loggedInUser) {
  //     setUser(loggedInUser);
  //     console.log("logged in", loggedInUser);
  //   }
  // }, []);

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
      <p>This form doesn&apos;t do anything yet.</p>
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
          />
        </div>
        <div className="flex justify-between gap-2">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            value={email}
            className="rounded p-1 text-slate-900"
            onChange={({ target }) => setEmail(target.value)}
          />
        </div>
        <div className="flex justify-between gap-2">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            value={password}
            className="rounded p-1 text-slate-900"
            onChange={({ target }) => setPassword(target.value)}
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
