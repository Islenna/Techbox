import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
    extend: {
        colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // etc
        },
        borderRadius: {
        lg: "var(--radius)",
        },
    },
    },
plugins: [],
};

export default config;
