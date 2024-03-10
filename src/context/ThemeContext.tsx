"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type ThemeContextType = {
  theme: string;
  setTheme: (theme: string) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark", // Default value
  setTheme: () => {}, // Dummy function to make TS happy
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Initialize theme state without directly accessing localStorage
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    // Access localStorage only after the component has mounted (client-side)
    const storedTheme = localStorage.getItem("theme") || "dark";
    if (storedTheme !== theme) {
      setTheme(storedTheme);
    }
  }, [theme]);

  useEffect(() => {
    console.log("theme changed:", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
