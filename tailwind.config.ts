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
  safelist: [
    'bg-Success-100',
    'text-Success-300',
    'bg-Sky-50',
    'text-Sky-200',
    'bg-Warning-50',
    'text-Warning-200',
    'hidden',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'footer-texture': "url('/img/FooterBG.png')",
        'homepageHero-texture': "url('/img/HomePageHeroBG.png')",
        'LoginBanner-texture': "url('/img/LoginBanner.png')",
        'ForgotPassword-texture': "url('/img/ForgotPasswordBG.png')",
        'dashboardBG-texture': "url('/img/dashboardBG.png')",
        'agentPage-texture': "url('/img/AgentBanner.png')",
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


