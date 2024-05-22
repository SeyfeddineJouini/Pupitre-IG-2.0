/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "variable-collection-background": "var(--variable-collection-background)",
        "variable-collection-blue": "var(--variable-collection-blue)",
        "variable-collection-vert": "var(--variable-collection-vert)",
      },
    },
  },
  plugins: [],
};
