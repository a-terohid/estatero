import { authOptions } from "@/lib/auth";
import Form from "@/models/form";
import Log from "@/models/log";
import { LogsActions } from "@/types/enums/generalEnums";
import { ERROR, MESSAGE } from "@/types/enums/MessageUnum";
import { Form_Interface } from "@/types/modelTypes";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// Handles POST requests for submitting a new contact form
export async function POST(req: Request) {
  try {
    // Connect to the database
    await connectDB();

    // Extract data from the request body
    const { full_name, email, location, subject, message } = await req.json();

    // Validate required fields
    if (!full_name || !email || !location || !message) {
      return NextResponse.json(
        { error: ERROR.INVALID_DATA },
        { status: 400 } // Bad Request
      );
    }

    // Check for an active user session
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: ERROR.LOGIN },
        { status: 401 } // Unauthorized
      );
    }

    // Create a new form entry object
    const newForm: Form_Interface = {
      full_name,
      email,
      location,
      subject,
      message,
      is_read: false,
      createdAt: new Date(),
    };

    // Save the new form entry to the database
    const form = await Form.create(newForm);

    // Log the form submission action
    await Log.create({
      title: `New form message by user ${session.user?.email} has been sent`,
      action: LogsActions.NEW_FORM,
      user_id: session.user.id,
      createdAt: new Date(),
    });

    // Respond with a success message
    return NextResponse.json(
      { message: MESSAGE.NEW_FORM },
      { status: 200 } // OK
    );
  } catch (error) {
    console.log("Error in sending message:", error);

    // Respond with a server error if something goes wrong
    return NextResponse.json(
      { error: ERROR.SERVER_ERROR },
      { status: 500 } // Internal Server Error
    );
  }
}