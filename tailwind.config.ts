import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        kbo: {
          blue:    '#154273',
          'blue-hover': '#0f3260',
          'blue-light': '#EEF3FA',
          teal:    '#007BC7',
          'teal-hover': '#006AAD',
          'teal-light': '#E5F4FB',
          gold:    '#F9A800',
          'gold-light': '#FEF6E0',
          red:     '#D52B1E',
          'red-light': '#FCECEA',
          gray:    '#535353',
          'gray-light': '#F5F5F5',
          'gray-border': '#D4D4D4',
          white:   '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#333333',
            'h1, h2, h3, h4': { color: '#154273', fontWeight: '700' },
            a: { color: '#007BC7', textDecoration: 'underline' },
          },
        },
      },
      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem',
      },
      boxShadow: {
        card: '0 1px 4px 0 rgba(0,0,0,0.08), 0 2px 8px 0 rgba(0,0,0,0.04)',
        'card-hover': '0 4px 16px 0 rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
}

export default config
