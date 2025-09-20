import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#b22222", // Steak red
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#1f1f1f",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#2a2a2a",
          foreground: "#a1a1aa",
        },
        accent: {
          DEFAULT: "#b22222",
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#ffffff",
        },
        border: "#404040",
        input: "#404040",
        ring: "#b22222",
        card: {
          DEFAULT: "#1a1a1a",
          foreground: "#ffffff",
        },
        popover: {
          DEFAULT: "#1a1a1a",
          foreground: "#ffffff",
        },
      },
      borderRadius: {
        lg: "8px",
        md: "6px",
        sm: "4px",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
  darkMode: "class",
};

export default config;
