import { authOptions } from "@/lib/auth";
import Agent from "@/models/agent";
import Message from "@/models/message";
import { ERROR, MESSAGE } from "@/types/enums/MessageUnum";
import { Message_Interface } from "@/types/modelTypes";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";


// PATCH method to update the read status of a message
export async function PATCH(req: Request , context : Params) {

    try {

        // Connect to the database
        await connectDB()

        // Extract the message ID from route parameters
        const id = context?.params?.messageId


        // Verify user session
        const session = await getServerSession(authOptions);
        if (!session) {
            // If session is not found, return 401 Unauthorized
            return NextResponse.json({ error: ERROR.LOGIN }, { status: 401 });
        }

        // Fetch the agent data based on user ID
        const agent = await Agent.findById(session.user.id)


        // Check if the message exists in the database
        const message = await Message.findById(id);
        if (!message) {
            // If message not found, return 401 Unauthorized
            return NextResponse.json({ error: ERROR.NO_MESSAGE }, { status: 401 });
        }


        // Verify if the logged-in user is the receiver of the message
        if ( message.receiver_id !== session.user.id ) {
            // If not the intended receiver, return 401 Unauthorized
            return NextResponse.json({ error: ERROR.INVALID_MESSAGE }, { status: 401 });
        }

        // Mark the message as read
        message.is_read = true;
        await message.save()


        // Return the success response indicating the message was marked as read
        return NextResponse.json(
            { message: MESSAGE.READ_MESSAGE},
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
