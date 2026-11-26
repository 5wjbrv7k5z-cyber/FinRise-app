/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        brand: {
          bg: '#0B1026',
          card: '#171D3D',
          blue: '#4361EE',
          purple: '#8B5CF6',
          lightPurple: '#A78BFA',
          cyan: '#22D3EE',
          text: '#F8FAFC',
          muted: '#A5B4D8',
          warning: '#FACC15',
          error: '#EF6461',
          streak: '#FB923C'
        }
      }
    },
  },
  plugins: [],
}
