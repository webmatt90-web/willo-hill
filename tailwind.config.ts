import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1B2A4A",
        accent: "#F5A623",
      },
      fontFamily: {
        heading: ["var(--font-oswald)", "sans-serif"],
        sans: ["var(--font-open-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
