import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Specified Exact Design Tokens
        accent: {
          DEFAULT: '#EFAE54',
          hover: '#DE9839',
        },
        surface: {
          neutral: '#555555',
          light: '#FFFFFF',
        },
        canvas: {
          dark: '#121421',
        },
        text: {
          'dark-primary': '#FFFFFF',
          'dark-muted': '#A0A5B5',
          'light-primary': '#121421',
          'light-muted': '#7A7D8A',
        },
        pastel: {
          blue: '#93B4F8',
          mint: '#7CD5A9',
          peach: '#F7B58D',
          cyan: '#6FE1EC',
        },
      },
      fontFamily: {
        display: ['"Grandstander"', '"Sniglet"', '"Fredoka"', '"Nunito"', 'system-ui', 'sans-serif'],
        body: ['"Roboto"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        pill: '9999px',
        card: '16px',
        'card-lg': '24px',
      },
      boxShadow: {
        'accent-glow': '0 0 25px -5px rgba(239, 174, 84, 0.45)',
        'accent-glow-lg': '0 0 45px -5px rgba(239, 174, 84, 0.6)',
        'card-soft': '0 12px 30px -10px rgba(0, 0, 0, 0.08)',
        'dark-card': '0 20px 40px -15px rgba(0, 0, 0, 0.6)',
      },
      animation: {
        'float-gentle': 'floatGentle 4s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.25s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'steam-rise': 'steamRise 3s ease-out infinite',
      },
      keyframes: {
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        steamRise: {
          '0%': { opacity: '0.3', transform: 'translateY(0px) scale(1)' },
          '50%': { opacity: '0.6', transform: 'translateY(-10px) scale(1.05)' },
          '100%': { opacity: '0', transform: 'translateY(-20px) scale(1.1)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
