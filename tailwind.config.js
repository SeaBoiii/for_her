/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FFF7ED',
        blush: '#FBCFE8',
        rose: '#FDA4AF',
        'warm-brown': '#7C2D12',
        lavender: '#E9D5FF',
        coffee: '#A16207',
        cocoa: '#431407',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        body: ['Quicksand', 'sans-serif'],
        hand: ['Gaegu', 'cursive'],
      },
      boxShadow: {
        cozy: '0 10px 30px -12px rgba(124, 45, 18, 0.25)',
        soft: '0 8px 24px -10px rgba(233, 213, 255, 0.8)',
        polaroid: '0 12px 28px -10px rgba(67, 20, 7, 0.28)',
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.9' },
          '100%': { transform: 'translateY(110vh) rotate(360deg)', opacity: '0' },
        },
        rain: {
          '0%': { transform: 'translateY(-120%)' },
          '100%': { transform: 'translateY(120vh)' },
        },
        'soft-pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.04)' },
        },
      },
      animation: {
        float: 'float linear infinite',
        rain: 'rain linear infinite',
        'soft-pulse': 'soft-pulse 2.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
