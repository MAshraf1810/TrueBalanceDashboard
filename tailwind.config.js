/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bruColor: "#005A9C", // Replace with your specific color
        bruColorLight1: "#0088D4", // Replace with your specific color
        bruColorLight2: "#66B5FF", // Replace with your specific color
        bruColorLight3: "#CCE5FF", // Replace with your specific color
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [
    require("daisyui"), // DaisyUI plugin
    require("tailwindcss-rtl"), // TailwindCSS RTL plugin
  ],
};
