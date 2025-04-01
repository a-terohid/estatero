import Log from "@/models/log";
import User from "@/models/user";
import { UserRole } from "@/types/enums/generalEnums";
import { ERROR } from "@/types/enums/MessageUnum";
import { hashPassword, verifyPassword } from "@/utils/auth"; 
import connectDB from "@/utils/connectDB";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";


/**
 * Authentication options for NextAuth, including session strategy and provider configurations.
 */
export const authOptions: NextAuthOptions = {
    debug: true, // Enables debugging logs in the console
    session: { strategy: "jwt" }, // Uses JWT for session handling
    providers: [
        CredentialsProvider({
            credentials: {
                email: {}, // Email input field
                password: {}, // Password input field
                name: {}, // Name input field
                last_name: {} // Last name input field
            },
            async authorize(credentials: any) {
                const { email, password, name, last_name } = credentials;

                try {
                    // Connects to the database
                    await connectDB();
                } catch (err) {
                    console.log(err);
                    throw new Error(ERROR.SERVER_ERROR); // Throws a server error if connection fails
                }

                // Checks if email and password are provided
                if (!email || !password) throw new Error(ERROR.INVALID_DATA);

                // Finds the user by email in the database
                let user = await User.findOne({ email });

                if (!user) {
                    // Validates name input
                    if (!name) throw new Error(ERROR.REQUIRED_NAME);
                    else if (name.length < 3) throw new Error(ERROR.NAME_ATLEAST);
                   
                    // Validates last name input
                    if (!last_name) throw new Error(ERROR.REQUIRED_FIELD);
                    else if (last_name.length < 3) throw new Error(ERROR.LASTNAME_ATLEAST);
                    
                    // Validates email format
                    if (!email) throw new Error(ERROR.REQUIRED_FIELD);
                    else if (!/\S+@\S+\.\S+/.test(email)) throw new Error(ERROR.INVALID_DATA);
                    
                    // Validates password length
                    if (!password) throw new Error(ERROR.REQUIRED_FIELD);
                    else if (password.length < 6) throw new Error(ERROR.PASSWORD_ATLEAST);
                    
                    // Hashes the password before saving
                    const hashedPassword = await hashPassword(password);

                    // Creates a new user in the database
                    user = await User.create({
                        email,
                        password: hashedPassword,
                        name,
                        last_name,
                        role: UserRole.Client, // Assigns default role as Client
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    });

                    // Logs the new user registration
                    const newLog = await Log.create({
                        title: `New user with email ${email} has been registered`,
                        action: "new user registered",
                        user_id: "0",
                        createdAt: new Date()
                    });

                    console.log(newLog.title);
                } else {
                    // Verifies the password for an existing user
                    const isValid = await verifyPassword(password, user.password);
                    if (!isValid) throw new Error(ERROR.WRONG_PASSWORD);
                }

                // Returns user details to store in the session
                return { id: user._id, email: user.email, name: user.name, role: user.role };
            }
        }), 
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        }),
    ]
};

// Handles authentication requests (GET and POST)
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };