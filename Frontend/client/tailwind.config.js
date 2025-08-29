export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Poppins', 'Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      },
      colors: {
        brand: {
          50: '#eef2ff',
          400: '#6366f1',
          500: '#4f46e5',
          600: '#4338ca'
        }
      },
      boxShadow: {
        soft: '0 8px 24px rgba(0,0,0,0.08)'
      }
    },
  },
  plugins: [],
}
