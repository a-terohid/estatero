import { styleGuide_colors } from "./src/constants/StyleGuide_Colors";
import { StyleGuid_Text } from "./src/constants/StyleGuide_Text";
import plugin from "tailwindcss/plugin";

const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './public/icon/*.{js,ts,jsx,tsx,mdx,svg}',
  ], 
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'footer-texture': "url('/img/FooterBG.png')",
        'homepageHero-texture': "url('/img/HomePageHeroBG.png')",
      },
      colors: styleGuide_colors
    },
    fontFamily: {
      Nunito: [ 'var(--font-Nunito)' ],
      Lora:   [ 'var(--font-Lora)' ],
      Manrope: ['var(--font-Manrope)', 'sans-serif'],
    },
    container: {
      center: true,
      padding: "2rem"
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities(StyleGuid_Text);
    }),
  ],
}
export default config;


