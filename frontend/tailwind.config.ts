import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}", "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "custom-color1": "#764BA2",
        "custom-color2": "#667EEA",
        "custom-color3": "#10182F",
        "custom-color4": "#fb6050",
        "logo-color": "#fb6050",
        "logo-color-lighter": "#ffe7e2",
      },
      screens: {
        mobile: "320px",
        tablet: "480px",
        laptop: "770px",
        "laptop-l": "1024px",
        "laptop-xl": "1200px",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
