// import { createContext, useContext, useState, useEffect } from "react";
import { createContext } from "react";

interface UserContextType {
  user: string;
  setUser: (value: string) => void;
}

const UserContext = createContext<UserContextType>({
  user: "",
  setUser: () => {},
});

export default UserContext;

// interface User {
//   username: string;
// }

// interface UserContextValue {
//   user: User | null;
//   login: (userData: User) => void;
//   logout: () => void;
// }

// const UserContext = createContext<UserContextValue | undefined>(undefined);

// export const useUser = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error("useUser must be used within a UserProvider");
//   }
//   return context;
// };

// export const UserProvider: React.FC = (props: React.PropsWithChildren<{}>) => {
//   const { children } = props;
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const login = (userData: User) => {
//     localStorage.setItem("user", JSON.stringify(userData));
//     setUser(userData);
//   };

//   const logout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//   };

//   return (
//     <UserContext.Provider value={{ user, login, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
