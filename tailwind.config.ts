import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          orange: '#FF4500',
          'orange-light': '#FF6B35',
          blue: '#1E293B',
          'reddit-blue': '#0079D3',
          'reddit-gray': '#DAE0E6',
        }
      },
      screens: {
        'xs': '480px',
      },
      borderRadius: {
        '2xl': '12px',
        '3xl': '16px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
