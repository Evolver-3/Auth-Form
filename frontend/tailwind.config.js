/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "oklch(58.6% 0.253 17.585)",
        secondary: "oklch(62.7% 0.265 303.9)",
        third: "oklch(54.1% 0.281 293.009)",
      },
      fontSize: {
        first: "40px",
        sec: "20px",
        triple:"16px"
      },
      boxShadow: {
        soft: "0 4px 10px rgba(0, 0, 0, 0.15)",
        strong: "0 1px 4px oklch(44.6% 0.043 257.281)",
        glow: "0 5px 20px oklch(37.3% 0.034 259.733)",
        weird:
          "0px 4px 20px 0px rgba(15,12,12,0.08),0px 8px 12px -4px rgba(15,12,12,0.10),0px 0px 2px 0px rgba(15,12,12,0.10),0px 1px 2px 0px rgba(15,12,12,0.10)",
        finta:
          "0px 8px 12px -4px rgba(15,12,12,0.08),0px 0px 2px 0px rgba(15,12,12,0.10),0px 1px 2px 0px rgba(15,12,12,0.10)",
      },
      fontFamily:{
          bebas: ['"Bebas Neue"', 'sans-serif'],
        flamenco: ['Flamenco', 'cursive'],
        momo: ['"Momo Signature"', 'cursive'],
        outfit: ['Outfit', 'sans-serif'],
        saira: ['"Saira Stencil One"', 'sans-serif'],
        ubuntu: ['Ubuntu', 'sans-serif'],
        varela: ['Varela', 'sans-serif']
      }
    },
  },
  plugins: [],
}