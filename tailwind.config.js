import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{js,ts,jsx,tsx}"];
export const theme = {
  extend: {
    animation: {
      fadeIn: "fadeIn .5s ease-in-out",
      spin: "spin 2s linear infinite",
    },
    keyframes: {
      fadeIn: {
        "0%": { opacity: 0 },
        "100%": { opacity: 1 },
      },
      spin: {
        from: {
          transform: "rotate(0deg)",
        },
        to: {
          transform: "rotate(360deg)",
        },
      },
    },
  },
  colors: {
    ...colors,
    "light-gray": "#707070", // se usa
    "light-gray-100": "#888686",
    "light-gray-200": "#626262",
    "light-gray-300": "#6A6D74",
    "light-gray-400": "#E2E2E2",
    "light-gray-500": "#727272",
    "light-gray-600": "#989898",
    "light-gray-700": "#F4F4F4",
    "light-blue-100": "#EFEDFA", // si se usa en bank configuracion
    "light-blue-200": "#6A96FF",
    "light-blue-300": "#6996FF",
    "light-blue-400": "#4E80EE",
    "light-blue-500": "#7BA0F2",
    "light-blue-600": "#5840D1",
    "dark-gray-100": "#1C1B1B", //TODO: Remover cambiar por dark-gray donde se use
    dark: "#343434",
    beige: "#FAF9F7",
    lila: "#F0EFFB",
    success: "#43AC63",
    error: "#E55757",
    ///new colors
    "light": "#fff",
    "black": "#000",
    "error-light": "#FFEEEE",
    "error-dark": "#FF5758",
    "purple-dark": "#5840D1",
    "purple-light": "#B8AFE6",
    "purple-lighter": "#EFEEFB",
    "gray-light": "#838383",
    "gray-dark": "#414141",
    "green-dark": "#268A67",
    "gray-border": "#E1E5E7",
    "primary-color":"#f44336",
    "secondary-color":"#1b31ef",
    "tertiary-color":"#2ef203",
    "quaternary-color": "#faf5fc",
  },
};
export const plugins = [];

// PRIMARY_COLOR: #6B3374,
// Secondary_COLOR: #9950A6
// Tertiary_COLOR: #BA81C4
// cuarto_color: #faf5fc
// #FAF5FB !important