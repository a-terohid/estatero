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

export const DELETE = async (req: Request, context: any) => {
  try {
    // Connect to the database
    await connectDB();

    // Extract FAQ ID from route parameters
    const id = context?.params?.FAQ_ID;

    // Get the current authenticated user session
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: ERROR.LOGIN }, { status: 401 });
    }

    // Try to find the user in either the User or Agent collections
    const user =
      (await User.findOne({ email: session?.user?.email })) ||
      (await Agent.findOne({ email: session?.user?.email }));

    if (!user) {
      return NextResponse.json({ error: ERROR.CANT_FIND_USER }, { status: 404 });
    }

    // Check if the user has sufficient permissions to delete FAQs
    if (user.role !== UserRole.OWNER && user.role !== UserRole.AGENTOWNER) {
      return NextResponse.json({ error: ERROR.ACCESS_DENIED }, { status: 422 });
    }

    // Look for the FAQ entry by its ID
    const FAQ = await FAQ_MODEL.findOne({ _id: id });
    if (!FAQ) {
      return NextResponse.json({ error: ERROR.CANT_FIND_FAQ }, { status: 404 });
    }

    // Delete the FAQ entry from the database
    await FAQ_MODEL.deleteOne({ _id: id });

    // Log the delete action
    await Log.create({
      title: `FAQ Deleted: "${FAQ.question.slice(0, 30)}..."`,
      action: LogsActions.DELETE_FAQ,
      user_id: user._id,
      createdAt: new Date(),
    });

    // Send success response
    return NextResponse.json({ message: MESSAGE.FAQ_DELETE }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: ERROR.SERVER_ERROR }, { status: 500 });
  }
};