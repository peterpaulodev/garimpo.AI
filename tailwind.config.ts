import { type Config } from "tailwindcss";

const config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(24, 95%, 53%)",
          foreground: "hsl(0, 0%, 98%)",
        },
        secondary: {
          DEFAULT: "hsl(240, 4%, 16%)",
          foreground: "hsl(0, 0%, 98%)",
        },
      },
    },
  },
} satisfies Config;

export default config;
