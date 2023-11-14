/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        "grotesque-regular": "Grotesque-Regular",
        "grotesque-bold": "Grotesque-Bold",
        "source-serif": "Source-Serif, serif",
        "space-grotesk": "Space Grotesk",
      },
      colors: {
        "star-gray": "#D9D9D9",
      },
      backgroundImage: {
        "bg-img":
          "https://ik.imagekit.io/mmnldm/bg.jpg?updatedAt=1699231064024",
      },
      keyframes: {
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0%)" },
        },
      },
      animation: {
        "fade-out": "fade-out 2s linear",
        "slide-up": "slide-up 2s linear",
      },
    },
  },
  plugins: [],
};
