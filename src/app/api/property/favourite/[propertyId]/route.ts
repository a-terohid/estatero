import { authOptions } from "@/lib/auth";
import Property from "@/models/Property";
import { ERROR, MESSAGE } from "@/types/enums/MessageUnum";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import User from "@/models/user";
import Agent from "@/models/agent";

export async function PATCH(req: Request, context: Params) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Extract property ID from URL params
    const property_id = context?.params?.propertyId;

    // Check if user session exists (is authenticated)
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: ERROR.LOGIN }, { status: 401 });

    // Check if the user exists in either User or Agent collections
    const existUser =
      (await User.findOne({ _id: session.user.id })) ||
      (await Agent.findOne({ _id: session.user.id }));

    if (!existUser) {
      return NextResponse.json(
        { error: ERROR.CANT_FIND_HANDLER },
        { status: 422 }
      );
    }

    // Get current liked listings or initialize as empty array
    const liked = existUser.liked_listings || [];

    // Check if the property is already liked
    const isLiked = liked.includes(property_id);

    if (isLiked) {
      // If already liked, remove it from the list
      existUser.liked_listings = liked.filter((id: any) => id !== property_id);
      await existUser.save();

      return NextResponse.json(
        { message: "Property removed from liked listings" },
        { status: 200 }
      );
    } else {
      // If not liked yet, add it to the list
      liked.push(property_id);
      existUser.liked_listings = liked;
      await existUser.save();

      return NextResponse.json(
        { message: "Property added to liked listings" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log("Error in PATCH handler:", error);

    // Return server error response
    return NextResponse.json(
      { error: ERROR.SERVER_ERROR },
      { status: 500 }
    );
  }
}