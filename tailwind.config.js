/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms'

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',  // 确保扫描到你的所有 Vue 文件
  ],
  theme: {
    extend: {},
  },
  plugins: [
    forms,
  ],
}