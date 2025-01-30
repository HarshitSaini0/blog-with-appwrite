/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        space: {
          900: "#0b0d26",
          800: "#1a1f4b",
        },
        nebula: {
          400: "#7d83ff",
        },
        cosmic: {
          text: "#e6f1ff",
          'light-primary': '#f0f4ff',
          'light-secondary': '#e6edff',

          light: {
            primary: "#0f172a",
            secondary: "#1e293b",
            accent: "#7d83ff",
          },
          dark: {
            primary: "#e6f1ff",
            secondary: "#94a3b8",
            accent: "#9da1ff",
          },
        },
      },
      transitionProperty: {
        theme: "color, background-color, border-color, box-shadow",
      },
      keyframes: {
        "shooting-star": {
          "0%": { transform: "translate(-100%, -100%)" },
          "100%": { transform: "translate(200vw, 200vh)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%, 100%": { textShadow: "0 0 8px rgba(125, 131, 255, 0.5)" },
          "50%": { textShadow: "0 0 15px rgba(125, 131, 255, 0.8)" },
        },
      },
      animation: {
        "shooting-star": "shooting-star 3s linear infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
        "twinkle-delayed": "twinkle 3s ease-in-out 1s infinite",
        float: "float 3s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite",
      },
      backgroundImage: {
        "star-pattern":
          "url('data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zM-6 6c0-2.2 1.8-4 4-4 3.3 0 6-2.7 6-6h2c0 2.2-1.8 4-4 4-3.3 0-6 2.7-6 6 0 2.2-1.8 4-4 4-3.3 0-6 2.7-6 6 0 2.2-1.8 4-4 4-3.3 0-6 2.7-6 6h-2c0-2.2 1.8-4 4-4 3.3 0 6-2.7 6-6 0-2.2 1.8-4 4-4 3.3 0 6-2.7 6-6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
      },
    },
  },
  plugins: [],
};
