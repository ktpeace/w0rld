"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

type User = {
  id: number;
  [key: string]: any; // replace with specifics when settled
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Retrieve user object from localStorage and parse it
    const userInLocalStorage = localStorage.getItem("user");
    if (userInLocalStorage) {
      setUser(JSON.parse(userInLocalStorage));
    } else {
      // Validate session with backend if no user object in local storage
      const validateSession = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/validate-session`,
            { withCredentials: true }
          );
          if (response.data) {
            setUser(response.data);
            // Store the user object in localStorage
            localStorage.setItem("user", JSON.stringify(response.data));
          }
        } catch (error) {
          // Clear user & localstorage if validation fails
          console.error("Session validation failed:", error);
          setUser(null);
          localStorage.removeItem("user");
        }
      };

      validateSession();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
