import Property from "@/models/Property";
import { property_TAGS } from "@/types/enums/generalEnums";
import { ERROR } from "@/types/enums/MessageUnum";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function GET() {
  try {

    // Connect to the database
    await connectDB();

    const FeaturedProperties = await Property.find({
      published: true,
      tags: { $in: [property_TAGS.FEATURED] },
    });

    // Return success response
    return NextResponse.json(
      { data: FeaturedProperties },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in get handler:", error);

    // Return server error
    return NextResponse.json(
      { error: ERROR.SERVER_ERROR },
      { status: 500 }
    );
  }
}