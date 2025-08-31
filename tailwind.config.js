module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // You can set it to 'media' or 'class' if needed
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",   // Indigo (you can change this)
        secondary: "#9333EA", // Purple
        accent: "#F59E0B",    // Amber
      },
    },
  },
  plugins: [],
};

