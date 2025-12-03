import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#B88E2F",
        "gray-1": "#3A3A3A",
        "gray-2": "#616161",
        "gray-3": "#898989",
        "gray-4": "#B0B0B0",
        "gray-5": "#D8D8D8",
        "light-bg": "#F4F5F7",
        "red-accent": "#E97171",
        "green-accent": "#2EC1AC",
        "beige-bg": "#FFF3E3",
        "cream-bg": "#FCF8F3",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

