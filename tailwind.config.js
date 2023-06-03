const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  experimental: {
    optimizeUniversalDefaults: true,
  },
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      spacing: {
        '9/16': '56.25%',
      },
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        sans: ['Pretendard', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: colors.indigo,
        gray: colors.neutral,
      },
      keyframes: {
        bounceLeft: {
          '50%': { transform: 'translateX(-7px)' },
        },
        bounceRight: {
          '50%': { transform: 'translateX(7px)' },
        },
        postLikeEmojiAnimation: {
          '0%': { transform: 'translateY(0px)', opacity: 0 },
          '50%': { transform: 'translateY(-40px)', opacity: 1 },
          '100%': { transform: 'translateY(-60px)', opacity: 0 },
        },
        postLikeHeartAnimation: {
          '25%': { transform: 'scale(0.9)' },
          '50%': { transform: 'scale(1.1)' },
          '75%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
        cardLoadedAnimation: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0px)', opacity: 1 },
        },
        loadingAnimation: {
          '0%': { left: '-100%' },
          '100%': { left: '150%' },
        },
        modalOpenAnimation: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        modalCloseAnimation: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
      },
      animation: {
        'bounce-left': 'bounceLeft 500ms ease-in-out',
        'bounce-right': 'bounceRight 500ms ease-in-out',
        emoji: 'postLikeEmojiAnimation 1s ease-in-out forwards',
        heart: 'postLikeHeartAnimation 1s ease-in-out',
        card: 'cardLoadedAnimation 500ms ease-in-out',
        loading: 'loadingAnimation 1.5s infinite',
        'modal-open': 'modalOpenAnimation 150ms ease-in-out forwards',
        'modal-close': 'modalCloseAnimation 100ms ease-in-out forwards',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            a: {
              color: theme('colors.primary.500'),
              wordBreak: 'break-all',
              '&:hover': {
                color: `${theme('colors.primary.700')} !important`,
              },
              code: {
                color: theme('colors.primary.400'),
              },
            },
            h1: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.900'),
            },
            h2: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.900'),
            },
            h3: {
              marginTop: '2.5rem',
              fontWeight: '600',
              color: theme('colors.gray.900'),
            },
            'h4,h5,h6': {
              marginTop: '2rem',
              color: theme('colors.gray.900'),
            },
            pre: {
              backgroundColor: '#282A36',
            },
            code: {
              color: theme('colors.pink.500'),
              backgroundColor: theme('colors.gray.100'),
              paddingLeft: '4px',
              paddingRight: '4px',
              paddingTop: '2px',
              paddingBottom: '2px',
              borderRadius: '0.25rem',
              wordBreak: 'break-all',
              fontFamily: 'Consolas',
            },
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
            details: {
              backgroundColor: theme('colors.gray.100'),
              paddingLeft: '4px',
              paddingRight: '4px',
              paddingTop: '2px',
              paddingBottom: '2px',
              borderRadius: '0.25rem',
            },
            hr: { borderColor: theme('colors.gray.200') },
            li: {
              wordBreak: 'break-all',
            },
            'ol li::marker': {
              fontWeight: '600',
              color: theme('colors.gray.500'),
            },
            'ul li::marker': {
              backgroundColor: theme('colors.gray.500'),
            },
            strong: { color: theme('colors.gray.600'), fontWeight: '700' },
            blockquote: {
              color: theme('colors.gray.900'),
              borderLeftColor: theme('colors.gray.200'),
              fontStyle: 'normal',
            },
            'blockquote > p::before': {
              content: 'none',
            },
            'blockquote > p::after': {
              content: 'none',
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.primary.400'),
              '&:hover': {
                color: `${theme('colors.primary.300')} !important`,
              },
              code: { color: theme('colors.primary.400') },
            },
            h1: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.100'),
            },
            h2: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.100'),
            },
            h3: {
              fontWeight: '600',
              color: theme('colors.gray.100'),
            },
            'h4,h5,h6': {
              color: theme('colors.gray.100'),
            },
            pre: {
              backgroundColor: '#282A36',
            },
            code: {
              backgroundColor: theme('colors.gray.800'),
            },
            details: {
              backgroundColor: theme('colors.gray.800'),
            },
            hr: { borderColor: theme('colors.gray.700') },
            'ol li::marker': {
              fontWeight: '600',
              color: theme('colors.gray.400'),
            },
            'ul li::marker': {
              backgroundColor: theme('colors.gray.400'),
            },
            strong: { color: theme('colors.gray.100') },
            thead: {
              th: {
                color: theme('colors.gray.100'),
              },
            },
            tbody: {
              tr: {
                borderBottomColor: theme('colors.gray.700'),
              },
            },
            blockquote: {
              color: theme('colors.gray.100'),
              borderLeftColor: theme('colors.gray.700'),
              fontStyle: 'normal',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar-hide'),
  ],
};
