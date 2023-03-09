"use client";
import Image from "next/image";
import lamp from "public/images/lamp.png";
import lampDark from "public/images/lamp-dark.png";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState("");
  const [chosenTheme, setChosenTheme] = useState("");

  // add/remove classes
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  }, [chosenTheme]);

  // set localStorage
  function toggleTheme() {
    if (
      !localStorage.theme ||
      !window.matchMedia("(prefers-color-scheme: dark)").matches ||
      localStorage.theme === "light"
    ) {
      localStorage.theme = "dark";
      setChosenTheme("dark");
    } else {
      localStorage.theme = "light";
      setChosenTheme("light");
    }
  }

  return (
    <Image
      src={theme === "light" ? lamp : lampDark}
      alt="lamp dark mode switcher"
      onClick={toggleTheme}
      className="cursor-pointer w-12 sm:w-20"
    ></Image>
  );
};

export default ThemeSwitcher;
