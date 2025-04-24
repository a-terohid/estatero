import Agent from "@/models/agent";
import Log from "@/models/log";
import User from "@/models/user";
import { LogsActions, UserRole } from "@/types/enums/generalEnums";
import { ERROR, MESSAGE } from "@/types/enums/MessageUnum";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";

export const PATCH = async (req: Request) => {
    try {
        // Connect to the database
        await connectDB();

        const { userID, clinet_Email, newRole, lincense_number } = await req.json();

        // Validate required fields
        if (!userID || !clinet_Email || !newRole) {
            return NextResponse.json(
                { error: ERROR.INVALID_DATA },
                { status: 422 }
            );
        }

        // Check if the handler (the one promoting) exists
        const existUser = await User.findOne({ _id: userID });
        if (!existUser) {
            return NextResponse.json(
                { error: ERROR.CANT_FIND_HANDLER },
                { status: 422 }
            );
        }

        // Clients are not allowed to promote others
        if (existUser.role === UserRole.CLIENT) {
            return NextResponse.json(
                { error: ERROR.ACCESS_DENIED },
                { status: 422 }
            );
        }

        // License number is required when promoting to agent or agent admin
        if ((newRole === UserRole.AGENT || newRole === UserRole.AGENTADMIN) && !lincense_number) {
            return NextResponse.json(
                { error: ERROR.REQUIRED_LINCENSE_NUMBER },
                { status: 422 }
            );
        }

        // Only owner roles are allowed to promote to ADMIN or AGENTADMIN
        if (newRole === UserRole.ADMIN || newRole === UserRole.AGENTADMIN) {
            if (existUser.role !== UserRole.OWNER && existUser.role !== UserRole.AGENTOWNER) {
                return NextResponse.json(
                    { error: ERROR.ACCESS_DENIED },
                    { status: 422 }
                );
            }
        }

        // Check if the client to be promoted exists
        const existClient = await User.findOne({ email: clinet_Email });
        if (!existClient) {
            return NextResponse.json(
                { error: ERROR.CANT_FIND_USER },
                { status: 422 }
            );
        }

        // Prevent re-promoting a user who already has the same role
        if (existClient.role === newRole) {
            return NextResponse.json(
                { error: ERROR.ALREADY_PROMOTED },
                { status: 422 }
            );
        }

        // Promote to ADMIN
        if (newRole === UserRole.ADMIN) {
            existClient.role = UserRole.ADMIN;
            existClient.updatedAt = new Date();
            await existClient.save();

            // Log the promotion
            await Log.create({
                title: `New admin with email ${clinet_Email} has been Promoted by ${existUser.email}`,
                action: LogsActions.NEW_ADMIN,
                user_id: userID,
                createdAt: new Date(),
            });

            return NextResponse.json(
                { message: MESSAGE.NEW_ADMIN },
                { status: 200 }
            );
        }

        // Promote to AGENT or AGENTADMIN
        if (newRole === UserRole.AGENT || newRole === UserRole.AGENTADMIN) {
            // Create a new Agent entry
            await Agent.create({
                email: existClient.email,
                password: existClient.password,
                name: existClient.name,
                last_name: existClient.last_name,
                phone_number: existClient.phone_number,
                profile_picture: existClient.profile_picture,
                role: newRole,
                createdAt: new Date(),
                updatedAt: new Date(),
                resetPassword: existClient.resetPassword,
                lincense_number: lincense_number,
            });

            // Remove the original user entry
            await User.deleteOne({ email: clinet_Email });

            // Log the promotion
            await Log.create({
                title: `New Agent with email ${clinet_Email} has been Promoted by ${existUser.email}`,
                action: LogsActions.NEW_AGENT,
                user_id: userID,
                createdAt: new Date(),
            });

            return NextResponse.json(
                { message: MESSAGE.NEW_AGENT },
                { status: 200 }
            );
        }

    } catch (err) {
        console.log(err);

        // Return a server error response in case of failure
        return NextResponse.json(
            { error: ERROR.SERVER_ERROR },
            { status: 500 }
        );
    }
};