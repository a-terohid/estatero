// Import necessary modules and utilities
import { authOptions } from "@/lib/auth";
import Agent from "@/models/agent";
import FAQ_MODEL from "@/models/FAQ";
import Log from "@/models/log";
import User from "@/models/user";
import { LogsActions, UserRole } from "@/types/enums/generalEnums";
import { ERROR, MESSAGE } from "@/types/enums/MessageUnum";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// PATCH request handler to update an existing FAQ entry
export const PATCH = async (req: Request, context: any) => {
    try {
        // Connect to the database
        await connectDB();

        // Extract FAQ ID from route parameters
        const id = context?.params?.FAQ_ID;

        // Parse the request body to get the updated question and answer
        const { question, answer } = await req.json();

        // Get the current authenticated user session
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { error: ERROR.LOGIN },
                { status: 401 }
            );
        }

        // Try to find the user from User or Agent collections
        const user = await User.findOne({ email: session?.user?.email }) 
                  || await Agent.findOne({ email: session?.user?.email });

        if (!user) {
            return NextResponse.json(
                { error: ERROR.CANT_FIND_USER },
                { status: 404 }
            );
        }

        // Check if the user has sufficient permissions
        if (user.role !== UserRole.OWNER && user.role !== UserRole.AGENTOWNER) {
            return NextResponse.json(
                { error: ERROR.ACCESS_DENIED },
                { status: 422 }
            );
        }

        // Validate required fields
        if (!question || !answer) {
            return NextResponse.json(
                { error: ERROR.INVALID_DATA },
                { status: 400 }
            );
        }

        // Find the existing FAQ entry by ID
        const FAQ = await FAQ_MODEL.findOne({ _id: id });
        if (!FAQ) {
            return NextResponse.json(
                { error: ERROR.CANT_FIND_FAQ },
                { status: 404 }
            );
        }

        // Update the FAQ fields
        FAQ.question = question;
        FAQ.answer = answer;
        await FAQ.save();

        // Log the update action for audit trail
        await Log.create({
            title: `FAQ updated: "${question.slice(0, 30)}..."`,
            action: LogsActions.EDIT_FAQ,
            user_id: user._id,
            createdAt: new Date(),
        });

        // Return success response
        return NextResponse.json(
            { message: MESSAGE.FAQ_EDIT },
            { status: 200 }
        );

    } catch (err) {
        console.log(err);
        return NextResponse.json(
            { error: ERROR.SERVER_ERROR },
            { status: 500 }
        );
    }
};