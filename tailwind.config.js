// @type {import('tailwindcss').Config}
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        Primary: "#0BAB7C",
        Secondary1: "#C7F4C2",
        Secondary2: "#D7D0FF",
        Secondary3: "#FDDD8C",
        Secondary4: "#FFBBD7",
        Natural1: "#F4F4F4",
        Natural2: "#F1F1F5",
        Natural3: "#FAFAFB",
        Natural4: "#F5F5F8",
        Natural5: "#E2E2EA",
        Natural6: "#92929D",
        Natural7: "#696974",
        Natural8: "#44444F",
        DarkBG1: "#13131A",
        DarkBG2: "#1C1C24",
        DarkBG3: "#21212B",
        DarkBG4: "#2C2C2C",
        White: "#FFFFFF",
        Black: "#171725",
      },
      boxShadow: {
        'custom': '0px 23px 30px 0px rgba(226, 226, 234, 0.40), -3px -2px 24px 0px rgba(0, 0, 0, 0.02)',
        "1": "0px 6px 14px 0px rgba(23, 23, 37, 0.02)",
        "2": "0px 14px 20px 0px rgba(0, 0, 0, 0.02)",
        searchBar: '0px 15px 34px 0px rgba(0, 0, 0, 0.02)',
        "paginationButton": "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",

      },
      screens: {
        "2xl": "1440px",
      }
    },

    fontFamily: {
      manrope: ["var(--font-manrope)"],
      sans: ["var(--font-dm-sans)"],
    },
  },
  plugins: [],
};
