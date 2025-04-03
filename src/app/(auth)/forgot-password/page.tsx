import ForgotPasswordPage from '@/template/forgot-password/ForgotPasswordPage';

export const metadata = {
    title: "Forgot Password | DWLFNDR",
    description: "Don't worry, it happens! Enter your email below, and we’ll send you a link to reset your password.",
    keywords: [
        "forgot password",
        "password reset",
        "account recovery",
        "DWLFNDR"
    ],
    openGraph: {
        title: "Forgot Password | DWLFNDR",
        description: "Reset your password easily by entering your email.",
        url: "https://estatero.vercel.app/forgot-password",
        type: "website",
        images: [
            {
                url: "/img/thumbnail.png",
                width: 1200,
                height: 630,
                alt: "Forgot Password Page"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "Forgot Password | DWLFNDR",
        description: "Enter your email and reset your password easily.",
        images: ["/img/thumbnail.png"]
    }
};

const page = () => {
    return (<ForgotPasswordPage />);
};

export default page;