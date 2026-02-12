/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-yellow': '#f5f84b',
        'primary-yellow-dark': '#d4d63a',
        'primary-yellow-light': '#f9fb7a',
        'secondary-blue': '#046fa4',
        'secondary-blue-dark': '#035580',
        'secondary-blue-light': '#0589c9',
        'dark-navy': '#1a2332',
        'dark-navy-light': '#2a3545',
        'dark-navy-lighter': '#3a4555',
      },
    },
  },
  plugins: [],
}
