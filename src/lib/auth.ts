import Log from "@/models/log";
import User from "@/models/user";
import { UserRole } from "@/types/generalEnums";
import { ERROR } from "@/types/MessageUnum";
import { LOG_Interface } from "@/types/modelTypes";
import { hashPassword, verifyPassword } from "@/utils/auth"; 
import connectDB from "@/utils/connectDB";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    debug: true,
    session: { strategy: "jwt" },
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {},
                name: {} 
            },
            async authorize(credentials: any) {
                const { email, password, name } = credentials;

                try {
                    await connectDB();
                } catch (err) {
                    console.log(err);
                    throw new Error(ERROR.SERVER_ERROR);
                }

                if (!email || !password) throw new Error(ERROR.INVALID_DATA);

                let user = await User.findOne({ email });

                if (!user) {

                    if (!name) throw new Error("Name is required for sign-up.");

                    const hashedPassword = await hashPassword(password);

                    user = await User.create({
                        email,
                        password: hashedPassword,
                        name,
                        role: UserRole.Client ,
                        createdAt : new Date(),
                        updatedAt : new Date(),
                    });

                    const newLog  = await Log.create({
                        title: `New user with email ${email} hav been registerd`,
                        action: "new user registerd",
                        user_id: "0",
                        createdAt: new Date()
                    })

                    console.log(newLog.title)

                } else {
                    const isValid = await verifyPassword(password, user.password);
                    if (!isValid) throw new Error(ERROR.WRONG_PASSWORD);
                }

                return { id: user._id, email: user.email, name: user.name, role: user.role };
            }
        })
    ]
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };