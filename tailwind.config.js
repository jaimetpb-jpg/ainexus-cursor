/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        'bg-alt': 'var(--color-bg-alt)',
        'bg-soft': 'var(--color-bg-soft)',
        'bg-elevated': 'var(--color-bg-elevated)',
        ink: 'var(--color-ink)',
        'ink-2': 'var(--color-ink-2)',
        'ink-3': 'var(--color-ink-3)',
        line: 'var(--color-line)',
        accent: '#3B6EA5',
        'accent-soft': 'var(--color-accent-soft)',
        'accent-glow': 'rgba(59,110,165,0.35)',
        whatsapp: '#25D366',
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter Variable', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
        glow: '0 0 60px -12px var(--color-accent-glow)',
      },
      backgroundImage: {
        'mesh-hero': 'var(--mesh-hero)',
        'dot-grid': 'radial-gradient(circle, var(--color-dot) 1px, transparent 1px)',
      },
      backgroundSize: {
        'dot-grid': '24px 24px',
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        'pulse-dot': { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.35' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        'mesh-shift': {
          '0%,100%': { opacity: '0.6' },
          '50%': { opacity: '0.9' },
        },
        'hero-kenburns': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
        orbit: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'orbit-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
        'pulse-dot': 'pulse-dot 1.6s ease-in-out infinite',
        float: 'float 5s ease-in-out infinite',
        'mesh-shift': 'mesh-shift 8s ease-in-out infinite',
        'hero-kenburns': 'hero-kenburns 4.5s ease-out forwards',
        orbit: 'orbit 42s linear infinite',
        'orbit-reverse': 'orbit-reverse 58s linear infinite',
      },
    },
  },
  plugins: [],
};
