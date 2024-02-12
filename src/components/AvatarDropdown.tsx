import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import avatarPin from "../../public/pin-full.png";
import axios from "axios";
import { useUser } from "@/context/UserContext";

const AvatarDropdown = () => {
  const { user, setUser } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");

  const toggleDropdown = () => setIsOpen(!isOpen);

  const logout = async () => {
    try {
      toggleDropdown();
      // Call to logout
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/logout`,
        null,
        {
          withCredentials: true,
        }
      );

      // Remove user
      localStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred. Please retry.");
      }
    }
  };

  return (
    <div className="relative inline-block text-left">
      <div onClick={toggleDropdown} className="cursor-pointer">
        <Image
          src={avatarPin}
          alt="Antique pin representing user avatar"
          width="40"
          height="40"
        />
      </div>

      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-parchment-200 dark:bg-perse-600"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            <Link
              href="/user/"
              className="block px-4 py-2 text-sm bg-transparent hover:bg-parchment-300 dark:hover:bg-perse-500"
              role="menuitem"
              onClick={toggleDropdown}
            >
              Profile
            </Link>
            {/* <Link
              href="/user/settings"
              className="block px-4 py-2 text-sm bg-transparent hover:bg-parchment-300 dark:hover:bg-perse-500"
              role="menuitem"
              onClick={toggleDropdown}
            >
              Settings
            </Link> */}
            <button
              type="button"
              className="block w-full px-4 py-2 text-left text-sm uppercase bg-transparent hover:bg-parchment-300 dark:hover:bg-perse-500"
              role="menuitem"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarDropdown;
