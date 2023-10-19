/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/**/*.pug'],
  theme: {
    extend: {
      colors: {
        silver: '#C0C0C0',
        bronze: '#CD7F32',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
