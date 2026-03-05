/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ── Custom colors for Adarna Quest ──────────────────
      // Edit these to change the game's color palette
      colors: {
        deep:   '#0f0520',
        purple: {
          950: '#1a0a2e',
          900: '#2d0b55',
          800: '#3b0d6b',
          700: '#5c1a9e',
          600: '#7b2fbf',
        },
        gold: {
          DEFAULT: '#FFD700',
          light:   '#FFF4A0',
          dark:    '#B8860B',
        },
        amber: '#FFA500',
        teal: {
          DEFAULT: '#00c9a7',
          light:   '#64dfdf',
        },
        rose:  '#ff6b9d',
        jade:  '#00e676',
      },
      // ── Custom fonts ────────────────────────────────────
      fontFamily: {
        display: ['"Cinzel Decorative"', 'serif'],
        body:    ['"Nunito"', 'sans-serif'],
      },
      // ── Custom animations ───────────────────────────────
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(1)' },
          '50%':      { opacity: '1',   transform: 'scale(1.5)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        popIn: {
          '0%':   { transform: 'scale(0) rotate(-10deg)', opacity: '0' },
          '70%':  { transform: 'scale(1.15) rotate(3deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)',   opacity: '1' },
        },
      },
      animation: {
        float:   'float 3s ease-in-out infinite',
        twinkle: 'twinkle 3s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        popIn:   'popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
      },
      // ── Background gradients ─────────────────────────────
      backgroundImage: {
        'space': 'radial-gradient(ellipse at 20% 50%, #2d0b55 0%, #1a0a2e 60%, #0a0015 100%)',
        'card':  'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
        'gold-shimmer': 'linear-gradient(90deg, #FFD700 0%, #FFF4A0 40%, #FFD700 60%, #B8860B 100%)',
      },
      boxShadow: {
        'gold':   '0 0 20px rgba(255,215,0,0.4)',
        'teal':   '0 0 20px rgba(0,201,167,0.4)',
        'purple': '0 0 20px rgba(123,47,191,0.4)',
        'glow':   '0 0 40px rgba(255,215,0,0.2)',
      },
    },
  },
  plugins: [],
}
