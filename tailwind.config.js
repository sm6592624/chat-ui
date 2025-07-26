/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        chat: {
          bg: '#f0f2f5',
          'bg-dark': '#0b1426',
          'panel': '#ffffff',
          'panel-dark': '#1f2937',
          'message-user': '#dcf8c6',
          'message-user-dark': '#2563eb',
          'message-ai': '#ffffff',
          'message-ai-dark': '#374151',
          'header': '#075e54',
          'header-dark': '#1f2937',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-dot': 'pulseDot 1.4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseDot: {
          '0%, 80%, 100%': { transform: 'scale(0)', opacity: '0.5' },
          '40%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        'chat': '0 2px 10px rgba(0, 0, 0, 0.1)',
        'message': '0 1px 2px rgba(0, 0, 0, 0.1)',
        'panel': '0 0 10px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}