import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'primary': '#B88E2F',
      'golden' : '#B88E2F',
      'red-accents': '#E97171',
      'green-accents': '#2EC1AC',
      'black':'#000',
      'white':'#fff',
      'gray-1':'#3A3A3A',
      'gray-3':'#898989',
      'gray-4':'#B0B0B0',
      'gray-5':'#9f9f9f',
      'border-gray':'#d9d9d9',
      'light-bg':'#F4F5F7',
      'font-color-1': '#666',
      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
    },
    extend: {
      maxWidth: {
        '8xl': '90rem', // 1440px
      },
      fontFamily: {
        sans:['var(--font-poppins)'],
        heading:['var(--font-montserrat)'],
        poppins: ['var(--font-poppins)'],
        montserrat:['var(--font-montserrat)']
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    // themes: ['dark','light','synthwave'],
    themes: [],
  },
}
export default config
