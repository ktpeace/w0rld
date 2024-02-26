"use client";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const VALIDATION_THRESHOLD = 30 * 60 * 1000; // 30 minutes

  // Setup Axios interceptors on mount
  useEffect(() => {
    const axiosResponseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          // Handle global logout
          setUser(null);
          localStorage.removeItem("user");
          localStorage.removeItem("lastValidationTime");
          router.push("/login");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      // Eject the interceptor when the component unmounts to avoid duplicates
      axios.interceptors.response.eject(axiosResponseInterceptor);
    };
  }, []);

  useEffect(() => {
    const userInLocalStorage = localStorage.getItem("user");
    const lastValidationTime = localStorage.getItem("lastValidationTime");
    const currentTime = new Date().getTime();

    const validateSession = async () => {
      try {
        console.log("Validating user");
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/validate-session`,
          { withCredentials: true }
        );
        if (response.data) {
          setUser(response.data);
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem(
            "lastValidationTime",
            new Date().getTime().toString()
          );
        } else {
          throw new Error("No active session");
        }
      } catch (error) {
        console.error("Session validation failed or no active session:", error);
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("lastValidationTime");
      }
    };

    if (
      userInLocalStorage &&
      lastValidationTime &&
      currentTime - parseInt(lastValidationTime, 10) < VALIDATION_THRESHOLD
    ) {
      setUser(JSON.parse(userInLocalStorage));
      // Validate session again to ensure it's still valid
      validateSession();
    } else {
      validateSession();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
