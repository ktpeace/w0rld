import Link from "next/link";
import Image from "next/image";
import ThemeSwitcher from "./ThemeSwitcher";
import { useEffect, useContext, useState } from "react";
import UserContext from "./userContext";
import axios from "axios";
import pixie from "../../public/images/pixie-avatar.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";
import { faTableList } from "@fortawesome/free-solid-svg-icons";
import { faFireFlameCurved } from "@fortawesome/free-solid-svg-icons";
import { faHandshakeAngle } from "@fortawesome/free-solid-svg-icons";
import { faChildReaching } from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
  const { user, setUser } = useContext(UserContext);
  const [userId, setUserId] = useState(null);

  // need to display avatar of current user
  const getUserId = async () => {
    if (user) {
      try {
        // const response = await axios.get("http://localhost:5000/api/user-id", {
        const response = await axios.get(
          "https://w0rld-env.eba-3pb2ubqj.us-east-2.elasticbeanstalk.com/api/user-id",
          {
            params: { username: user },
          }
        );
        const userId = response?.data.message;
        userId && setUserId(userId);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data.error) {
          console.log(error.response.data.error);
        } else {
          console.log(`Error: ${error}`);
        }
      }
    }
  };

  useEffect(() => {
    getUserId();
  }, [user]);

  // If logged in, set user context from localStorage if not already in context
  useEffect(() => {
    if (!user) {
      const localUser = localStorage.getItem("user");
      if (localUser) {
        setUser(localUser);
      }
    }
  }, []);

  return (
    <nav className="bg-white border-b-2 border-slate-100 dark:border-0 dark:bg-gray-800 dark:text-dark p-2 fixed w-full z-10 top-0 text-base">
      <div className="max-w-7xl mx-auto px-2">
        <div className="flex items-center justify-between h-16">
          <div className="flex justify-start items-baseline">
            <Link href="/" className="flex flex-col items-center gap-1">
              <FontAwesomeIcon
                icon={faHouseChimney}
                className="text-2xl sm:text-4xl"
              />
              <span className="hidden sm:inline-block">Home</span>
            </Link>
          </div>
          <div className="flex items-baseline gap-4 sm:gap-14 md:gap-20 ml-4 sm:ml-0">
            <Link href="/tasks" className="flex flex-col items-center gap-1">
              <FontAwesomeIcon
                icon={faTableList}
                className="text-2xl sm:text-4xl"
              />
              <span className="hidden sm:inline-block">Tasks</span>
            </Link>
            <Link href="/praxis" className="flex flex-col items-center gap-1">
              <FontAwesomeIcon
                icon={faFireFlameCurved}
                className="text-2xl sm:text-4xl"
              />
              <span className="hidden sm:inline-block">Praxis</span>
            </Link>
            <Link href="/groups" className="flex flex-col items-center gap-1">
              <FontAwesomeIcon
                icon={faHandshakeAngle}
                className="text-2xl sm:text-4xl"
              />
              <span className="hidden sm:inline-block">Groups</span>
            </Link>
            <Link href="/players" className="flex flex-col items-center gap-1">
              <FontAwesomeIcon
                icon={faChildReaching}
                className="text-2xl sm:text-4xl"
              />
              <span className="hidden sm:inline-block">Players</span>
            </Link>
          </div>
          <div className="justify-self-end flex items-center space-x-2 md:space-x-4">
            <ThemeSwitcher />
            {user.length ? (
              <Link href={`/players/${userId}`}>
                <Image
                  src={pixie}
                  alt="my avatar"
                  className="rounded-full object-cover w-8 sm:w-16"
                ></Image>
              </Link>
            ) : (
              <div className="flex flex-col justify-center items-center gap-2">
                <Link href="/login">
                  <button className="border rounded p-1 uppercase font-bold text-xs dark:border-slate-600 dark:bg-slate-800 dark:hover:border-slate-500 dark:hover:bg-slate-700">
                    Log In
                  </button>
                </Link>
                <Link href="/create-account">
                  <button className="border rounded p-1 uppercase font-bold text-xs dark:border-slate-600 dark:bg-slate-800 dark:hover:border-slate-500 dark:hover:bg-slate-700">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
