import { authOptions } from "@/lib/auth";
import Form from "@/models/form";
import { ERROR, MESSAGE } from "@/types/enums/MessageUnum";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// PATCH handler to mark all unread form messages as read
export async function PATCH(req: Request) {
    try {
        // Establish a connection to the MongoDB database
        await connectDB();

        // Retrieve and verify the user session using NextAuth
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: ERROR.LOGIN }, { status: 401 });
        }

        // Query the database for all unread form entries
        const forms = await Form.find({ is_read: false });

        // If no unread forms are found, return a 404 response
        if (forms.length === 0) {
            return NextResponse.json({ error: ERROR.NO_FORM }, { status: 404 });
        }

        // Iterate over each unread form and mark it as read
        await Promise.all(
            forms.map((form) => {
                form.is_read = true;
                return form.save();
            })
        );

        // Respond with a success message once all forms are updated
        return NextResponse.json(
            { message: MESSAGE.READ_ALL_Form },
            { status: 200 }
        );

    } catch (error) {
        // Log the error to the console for debugging
        console.log("Error in PATCH handler:", error);

        // Return a generic server error response
        return NextResponse.json(
            { error: ERROR.SERVER_ERROR },
            { status: 500 }
        );
    }
}