// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Enable dark mode
  theme: {
    extend: {
      colors: {
        Primary: "var(--color-primary)",
        Secondary: "var(--color-secondary)",
        Tertiary: "var(--color-tertiary)",
        Quaternary: "var(--color-quaternary)",
        Quinary: "var(--color-quinary)",
        
        PrimaryText: "var(--color-primary-text)",
        SecondaryText: "var(--color-secondary-text)",
      },
      fill: {
        PrimarySvg: "var(--color-primary-svg)",
        SecondarySvg: "var(--color-secondary-svg)",
      },
    },
  },
  plugins: [],
};