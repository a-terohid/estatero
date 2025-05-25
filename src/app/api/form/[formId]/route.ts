import { authOptions } from "@/lib/auth";
import Form from "@/models/form";
import { ERROR, MESSAGE } from "@/types/enums/MessageUnum";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";

// PATCH handler to mark a specific form message as read by its ID
export async function PATCH(req: Request, context: Params) {
    try {
        // Connect to the MongoDB database
        await connectDB();

        // Extract the form ID from the request context
        const id = context?.params?.formId;

        // Check if the ID is provided
        if (!id) {
            return NextResponse.json({ error: ERROR.INVALID_DATA }, { status: 400 });
        }

        // Verify the user's session using NextAuth
        const session = await getServerSession(authOptions);
        if (!session) {
            // If the user is not authenticated, return 401 Unauthorized
            return NextResponse.json({ error: ERROR.LOGIN }, { status: 401 });
        }

        // Find the form message by its ID
        const form = await Form.findById(id);
        if (!form) {
            // If no message is found with the provided ID, return 404 Not Found
            return NextResponse.json({ error: ERROR.NO_MESSAGE }, { status: 404 });
        }

        // Update the message to mark it as read
        form.is_read = true;
        await form.save();

        // Return a success response indicating the message was updated
        return NextResponse.json(
            { message: MESSAGE.READ_FORM },
            { status: 200 }
        );

    } catch (error) {
        // Log the error to the console for debugging purposes
        console.log("Error in PATCH handler:", error);

        // Return a generic server error response
        return NextResponse.json(
            { error: ERROR.SERVER_ERROR },
            { status: 500 }
        );
    }
}