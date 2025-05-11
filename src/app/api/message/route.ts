/**
 * API route to handle sending a new message from a user to an agent.
 * This route verifies the user's session, checks the receiver's existence,
 * saves the message in the database, sends an email notification, and logs the action.
 * 
 * @param {Request} req - The request object containing message, receiver_id, and sender_id.
 * @returns {NextResponse} JSON response with a success message or error.
 */

import { authOptions } from "@/lib/auth";
import Agent from "@/models/agent";
import Log from "@/models/log";
import Message from "@/models/message";
import { LogsActions } from "@/types/enums/generalEnums";
import { ERROR, MESSAGE } from "@/types/enums/MessageUnum";
import { Message_Interface } from "@/types/modelTypes";
import sendEmail from "@/utils/sendEmail";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    try {
        // Extract data from the request body
        const { message , receiver_id , sender_id } = await req.json();

        // Validate the message
        if (!message) return NextResponse.json({ error: ERROR.INVALID_DATA }, { status: 500 });

        // Verify user session
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: ERROR.LOGIN }, { status: 401 });

        // Check if the agent exists
        const agent = await Agent.findById(receiver_id);
        if (!agent) return NextResponse.json({ error: ERROR.NO_AGENT }, { status: 401 });

        // Construct the new message object
        const newMessage : Message_Interface = {
            receiver_id,
            sender_id,
            message,
            is_read : false,
            createdAt: new Date(),
        };

        // Save the message to the database
        const MESSAGE = await Message.create(newMessage);

        // Construct the message URL for the dashboard
        const MessageUrl = `${process.env.NEXTAUTH_URL}/dashboard/my-messages/${MESSAGE._id}`;

        // Construct the email content
        const Emailmessage = `New message by user ${session.user?.email} has been sent to your dashboard, \n` +
                              `Message: ${message} \n` +
                              `You can check it in: ${MessageUrl}`;

        // Send email notification
        await sendEmail(agent.email, "New Message | Estatero", Emailmessage);

        // Log the new message action
        await Log.create({
            title: `New message by user ${session.user?.email} has been sent to ${agent.email} agent`,
            action: LogsActions.NEW_MESSAGE,
            user_id: sender_id,
            createdAt: new Date(),
        });

        // Return the success response
        return NextResponse.json(
            {
                message: MESSAGE.NEW_MESSAGE,
                data: newMessage,
            },
            { status: 201 }
        );

    } catch (error) {
        console.log("Error in sending message:", error);

        // Return server error response in case of failure
        return NextResponse.json(
            { error: ERROR.SERVER_ERROR },
            { status: 500 }
        );
    }
}
