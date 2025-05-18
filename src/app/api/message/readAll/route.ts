import { authOptions } from "@/lib/auth";
import Agent from "@/models/agent";
import Message from "@/models/message";
import { ERROR, MESSAGE } from "@/types/enums/MessageUnum";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


// PATCH method to update the read status of all unread messages
export async function PATCH(req: Request) {

    try {

        // Connect to the database
        await connectDB();

        // Verify user session
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: ERROR.LOGIN }, { status: 401 });
        }

        // Fetch the agent data based on user ID
        const agent = await Agent.findById(session.user.id);

        if (!agent) {
            return NextResponse.json({ error: ERROR.NO_AGENT }, { status: 404 });
        }

        // Find all unread messages for the agent
        const messages = await Message.find({ is_read: false, receiver_id: agent._id });

        if (messages.length === 0) {
            return NextResponse.json({ error: ERROR.NO_MESSAGE }, { status: 404 });
        }

        // Mark all unread messages as read
        await Promise.all(messages.map((msg) => {
            msg.is_read = true;
            return msg.save();
        }));

        // Return the success response
        return NextResponse.json(
            { message: MESSAGE.READ_ALL_MESSAGE },
            { status: 200 }
        );

    } catch (error) {
        console.log("Error in PATCH handler:", error);

        // Return server error response in case of failure
        return NextResponse.json(
            { error: ERROR.SERVER_ERROR },
            { status: 500 }
        );
    }
}