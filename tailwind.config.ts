import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        rainbow:
          "linear-gradient(to right, rgba(238,130,238, 0.5), rgba(75,0,130, 0.5), rgba(0,0,255, 0.5), rgba(0,128,0, 0.5), rgba(255,255,0, 0.5), rgba(255,165,0, 0.5), rgba(255,0,0, 0.5))",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      rotate: {
        "60": "60deg",
        "200": "200deg",
        "240": "240deg",
      },
      width: {
        "12/25": "48%",
      },
      colors: {
        parchment: {
          50: "#FFF9F6", // lighter (bg)
          100: "#EADECE", // darker (text)
          200: "#E5D8C5", // darker (bg)
          300: "#C8BFB0", // dim (icons etc.)
          500: "#9F8154",
          700: "#45391c",
        },
        smoke: {
          50: "#171B1D",
        },
        perse: {
          100: "#322a3b",
          200: "#453b53",
          300: "rgb(137 112 166)", // super bright
          400: "rgb(56 48 67)", // card & desc border
          500: "#2F2E40", // desc bg
          600: "#292331",
          700: "#25222F", // card & navbar bg
          800: "#1b1923", // card hover bg
          900: "#161317",
        },
        lime: {
          920: "#25380d",
        },
        turquoise: {
          100: "#aabdc0",
          200: "#85a0a5",
          300: "#0097B2", // using for updates cards
          400: "#00515f", // same
          500: "#154952", // same
          600: "#103a41", // same
          700: "#0c2b31",
          800: "#081d20",
          900: "#040e10",
        },
        dusk: {
          600: "#3E4650",
          800: "#262B32",
        },
      },
    },
  },
  plugins: [],
};
export default config;
