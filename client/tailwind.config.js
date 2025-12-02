/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        babyPink: '#FFE4F0',
        babyBlue: '#D6F0FF',
        babyMint: '#DFF8F0',
        babyYellow: '#FFF9D6',
        babyLavender: '#EDE7FF',
        primary: '#FF7AB6'
      },
      fontFamily: {
        display: ['system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};


