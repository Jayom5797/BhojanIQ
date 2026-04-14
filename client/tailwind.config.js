/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'surface': '#0c0e14',
        'surface-container-low': '#11131a',
        'surface-container': '#171921',
        'surface-container-high': '#1d1f27',
        'surface-container-highest': '#23262e',
        'on-surface': '#e5e4ed',
        'on-surface-variant': '#aaaab3',
        'primary': '#2ff3ad',
        'primary-container': '#00e5a0',
        'on-primary': '#00563a',
        'secondary': '#9691ff',
        'secondary-container': '#3826cd',
        'on-secondary': '#140076',
        'tertiary': '#78e6ff',
        'error': '#ff716c',
        'outline': '#74757d',
        'outline-variant': '#46484f',
        'primary-fixed': '#23eea8',
      },
      fontFamily: {
        headline: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        full: '9999px',
      },
    },
  },
  plugins: [],
}
