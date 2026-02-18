import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        ink: "var(--ink)",
        accent: "var(--accent)",
        accentDeep: "var(--accent-deep)",
      },
      boxShadow: {
        paper: "0 22px 50px rgba(0,0,0,0.12), 0 2px 10px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
} satisfies Config;
