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
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      rotate: {
        "60": "60deg",
        "200": "200deg",
        "240": "240deg",
      },
      colors: {
        parchment: {
          50: "#FFF9F6", // lighter (bg)
          100: "#EADECE", // darker (text)
          200: "#E5D8C5", // darker (bg)
          300: "#C8BFB0", // dim (icons etc.)
        },
        smoke: {
          50: "#171B1D",
        },
        perse: {
          50: "#362159", // bright purple
          100: "#25222F", // dusky dark
          200: "#2F2E40", // lighter
          300: "#7136c8", // bright
          400: "#1b1923", // super dark
        },
        lime: {
          920: "#25380d",
        },
        teal: {
          100: "#00687B",
          200: "#154952",
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
