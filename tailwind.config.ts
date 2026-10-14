import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#1e80ff",
          hover: "#1171ee",
          light: "#eaf2ff",
        },
        ink: {
          DEFAULT: "#252933",
          secondary: "#515767",
          tertiary: "#8a919f",
        },
      },
      maxWidth: {
        layout: "1140px",
      },
      boxShadow: {
        card: "0 1px 2px 0 rgba(0,0,0,0.05), 0 1px 6px -1px rgba(0,0,0,0.04)",
        cardHover: "0 4px 12px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
