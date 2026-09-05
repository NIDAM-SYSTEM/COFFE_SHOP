import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Dark Roastery Palette
        roast: {
          charcoal: '#1A1C23',
          'charcoal-deep': '#121316',
          slate: '#2A2D34',
          'slate-light': '#383C45',
          cream: '#F9F8F4',
          'cream-dark': '#EDE8DF',
          amber: '#E89038',
          'amber-hover': '#F59E0B',
          'amber-light': '#FDE68A',
          ash: '#A1A1AA',
          'ash-light': '#D4D4D8',
          'fresh-green': '#2D6A4F',
          'fresh-glow': '#10B981',
          crimson: '#8B1E28',
        },
        // Legacy fallbacks kept for compatibility
        canvas: '#1A1C23',
        surface: '#2A2D34',
        muted: '#383C45',
        primary: '#FFFFFF',
        secondary: '#A1A1AA',
        accent: '#E89038',
        'accent-dark': '#D97706',
        hairline: '#383C45',
        fresh: '#2D6A4F',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Consolas', 'monospace'],
      },
      borderRadius: {
        pill: '9999px',
        card: '16px',
        'card-lg': '24px',
      },
      boxShadow: {
        'amber-glow': '0 0 25px -5px rgba(232, 144, 56, 0.45)',
        'amber-glow-lg': '0 0 45px -5px rgba(232, 144, 56, 0.6)',
        'dark-card': '0 20px 40px -15px rgba(0, 0, 0, 0.5)',
        'floating-bag': '0 30px 60px -12px rgba(0, 0, 0, 0.75), 0 0 40px rgba(232, 144, 56, 0.15)',
      },
      animation: {
        'pulse-slow': 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-bag': 'floatBag 5s ease-in-out infinite',
        'float-gentle': 'floatGentle 4s ease-in-out infinite',
        'slide-in-right': 'slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'fadeIn 0.25s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        floatBag: {
          '0%, 100%': { transform: 'translateY(0px) rotate(-1deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1deg)' },
        },
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
