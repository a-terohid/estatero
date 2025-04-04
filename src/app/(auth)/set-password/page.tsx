import SetPasswordPage from "@/template/forgot-password/SetPasswordPage";
import { verifyPassword } from "@/utils/auth";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Set Password | DWLFNDR",
    description: "Secure your account with a fresh new password. Enter and confirm your new password below.",
    keywords: [
        "set password",
        "password reset",
        "account security",
        "DWLFNDR"
    ],
    openGraph: {
        title: "Set Password | DWLFNDR",
        description: "Secure your account by setting a new password.",
        url: "https://estatero.vercel.app/set-password",
        type: "website",
        images: [
            {
                url: "/img/thumbnail.png",
                width: 1200,
                height: 630,
                alt: "Set Password Page"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "Set Password | DWLFNDR",
        description: "Enter and confirm your new password to secure your account.",
        images: ["/img/thumbnail.png"]
    }
};

const page = async ({ searchParams }: any) => {

    const { email , verify } = searchParams

    if (!email || !verify) redirect('/reset-password')

    const isValid  = await verifyPassword(email, verify)
    
    if (!isValid) redirect(`/reset-password?email=${email}`)

    return (<SetPasswordPage email={email} />);
};

export default page;