import localFont from "next/font/local";

 export const Nunito = localFont({
    display: 'swap',
    variable: '--font-Nunito',
    src: [
        {
            path: "../../public/Fonts/Nunito/static/Nunito-Regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../public/Fonts/Nunito/static/Nunito-Medium.ttf",
            weight: "500",
            style: "normal",
        },
        {
            path: "../../public/Fonts/Nunito/static/Nunito-SemiBold.ttf",
            weight: "600",
            style: "normal",
        },
        {
            path: "../../public/Fonts/Nunito/static/Nunito-Bold.ttf",
            weight: "700",
            style: "normal",
        },
        {
            path: "../../public/Fonts/Nunito/static/Nunito-ExtraBold.ttf",
            weight: "800",
            style: "normal",
        },
        {
            path: "../../public/Fonts/Nunito/static/Nunito-Black.ttf",
            weight: "900",
            style: "normal",
        },
    ]
})

export const Lora = localFont({
    display: 'swap',
    variable: '--font-Lora',
    src: [
        {
            path: "../../public/Fonts/Lora/static/Lora-Regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../public/Fonts/Lora/static/Lora-Medium.ttf",
            weight: "500",
            style: "normal",
        },
        {
            path: "../../public/Fonts/Lora/static/Lora-SemiBold.ttf",
            weight: "600",
            style: "normal",
        },
        {
            path: "../../public/Fonts/Lora/static/Lora-Bold.ttf",
            weight: "700",
            style: "normal",
        },
    ]
})

export const Manrope = localFont({
    display: 'swap',
    variable: '--font-Manrope',
    src: [
        {
            path: "../../public/Fonts/Manrope/static/Manrope-Regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../public/Fonts/Manrope/static/Manrope-Medium.ttf",
            weight: "500",
            style: "normal",
        },
        {
            path: "../../public/Fonts/Manrope/static/Manrope-SemiBold.ttf",
            weight: "600",
            style: "normal",
        },
        {
            path: "../../public/Fonts/Manrope/static/Manrope-Bold.ttf",
            weight: "700",
            style: "normal",
        },
    ]
})



export const FONTS = ` 
                        ${ Nunito.variable }, 
                        ${ Lora.variable } ,
                        ${ Manrope.variable } 
                    `