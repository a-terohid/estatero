// Import necessary modules, models, and types
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

// POST handler for creating a new FAQ
export async function POST(req: Request) {
    try {
        // Connect to the database
        await connectDB();

        // Extract data from the request body
        const { question, answer } = await req.json();

        // Get the current session
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { error: ERROR.LOGIN },
                { status: 401 }
            );
        }

        // Try to find the user in User or Agent models
        const user = await User.findOne({ email: session?.user?.email }) 
                  || await Agent.findOne({ email: session?.user?.email });
        if (!user) {
            return NextResponse.json(
                { error: ERROR.CANT_FIND_USER },
                { status: 404 }
            );
        }

        // Check if the user has permission to add FAQ
        if (user.role !== UserRole.OWNER && user.role !== UserRole.AGENTOWNER) {
            return NextResponse.json(
                { error: ERROR.ACCESS_DENIED },
                { status: 422 }
            );
        }

        // Validate question and answer
        if (!question || !answer) {
            return NextResponse.json(
                { error: ERROR.INVALID_DATA },
                { status: 400 }
            );
        }

        // Create a new FAQ entry
        const new_FAQ = await FAQ_MODEL.create({ question, answer });
        console.log(new_FAQ);

        // Log the action
        await Log.create({
            title: `new FAQ added`,
            action: LogsActions.NEW_FAQ,
            user_id: user._id,
            createdAt: new Date(),
        });

        // Return success response
        return NextResponse.json(
            { message: MESSAGE.NEW_FAQ },
            { status: 201 }
        );

    } catch (error) {
        // Handle server errors
        return NextResponse.json(
            { error: ERROR.SERVER_ERROR },
            { status: 500 }
        );
    }
}