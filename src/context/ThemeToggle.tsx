"use client";
import { useTheme } from "./ThemeContext";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    console.log("toggling:", theme);
  };

  return (
    <li
      className="mx-2 cursor-pointer"
      onClick={toggleTheme}
      title={theme === "dark" ? "Turn on the lights" : "Embrace the night"}
      aria-label={theme === "dark" ? "Turn on the lights" : "Embrace the night"}
      role="button"
    >
      {theme === "dark" ? "💡" : "🦇"}
    </li>
  );
};

export default ThemeToggle;
