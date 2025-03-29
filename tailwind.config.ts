import { styleGuide_colors } from "./src/utils/StyleGuide/StyleGuide_Colors";
import { StyleGuid_Text } from "./src/utils/StyleGuide/StyleGuide_Text";
import plugin from "tailwindcss/plugin";

const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './public/svgs/*.{js,ts,jsx,tsx,mdx,svg}',
  ], 
  darkMode: 'class',
  theme: {
    extend: {
      colors: styleGuide_colors
    },
    fontFamily: {
      Nunito: [ 'var(--font-Nunito)' ],
      Lora:   [ 'var(--font-Lora)' ],
      Manrope: ['var(--font-Manrope)', 'sans-serif'],
    },
    container: {
      center: true,
      padding: "3rem"
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities(StyleGuid_Text);
    }),
  ],
}
export default config;


