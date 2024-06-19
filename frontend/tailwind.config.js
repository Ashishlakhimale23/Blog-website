/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend:{
boxShadow: {
        custom: '8px 8px rgba(0, 0, 0)', // Custom shadow
      },
     fontFamily:{
      display:["'Baloo Thambi 2'","system-ui"]
     }, 
     colors:{
      "silver":"#c4c4c4"
     }}
  },
  plugins: [
      function ({ addUtilities }) {
      addUtilities({
        '.no-scrollbar': {
          /* Hide scrollbar for Chrome, Safari, and Opera */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          /* Hide scrollbar for IE, Edge, and Firefox */
          '-ms-overflow-style': 'none', /* IE and Edge */
          'scrollbar-width': 'none', /* Firefox */
        },
      });
    },
  ],
}

