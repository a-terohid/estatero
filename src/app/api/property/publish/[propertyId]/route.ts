import { authOptions } from "@/lib/auth";
import Agent from "@/models/agent";
import Property from "@/models/Property";
import User from "@/models/user";
import { ERROR, MESSAGE } from "@/types/enums/MessageUnum";
import { Property_Interface } from "@/types/modelTypes";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";
import { LogsActions } from '@/types/enums/generalEnums';
import Log from "@/models/log";
import sendEmail from "@/utils/sendEmail";
import slugify from "slugify";
import { revalidatePath } from "next/cache";

export async function PATCH(req: Request, context: Params) {
  try {

    // Connect to the database
    await connectDB();

    // Extract the property ID from route parameters
    const property_id = context?.params?.propertyId;

    // Parse JSON body to get the "publish" value
    const { publish } = await req.json();

    console.log("publish" , publish);
    


    // Validate user session
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: ERROR.LOGIN }, { status: 401 });


    // Check if the user exists (either a User or Agent)
    const existUser = await User.findOne({ _id: session.user.id }) || await Agent.findOne({ _id: session.user.id });
    if (!existUser) {
      return NextResponse.json(
        { error: ERROR.CANT_FIND_HANDLER },
        { status: 422 }
      );
    }

    // Check user role permissions (must be Admin or Owner)
    if (!existUser.role.includes("Admin") && !existUser.role.includes("Owner")) {
    return NextResponse.json(
      { error: ERROR.ACCESS_DENIED },
      { status: 422 }
    );
}

    // Find the property by ID
    const PROPERTY = await Property.findOne({ _id: property_id });
    if (!PROPERTY) {
      return NextResponse.json(
        { error: ERROR.CANT_FIND_PROPERTY },
        { status: 404 }
      );
    }

    // Validate "publish" flag
    if (publish === undefined) return NextResponse.json({ error: ERROR.INVALID_DATA }, { status: 400 });

    // === Handle Publishing ===
    if (publish) {
      PROPERTY.published = true;
      PROPERTY.PublishedBY = {
        _id: existUser._id,
        email: existUser.email,
      };
      await PROPERTY.save();

      // Create log entry
      await Log.create({
        title: `Property with ID ${PROPERTY._id} published by user ${session.user?.email}`,
        action: LogsActions.PROPERTY_PUBLISHED,
        user_id: session.user.id,
        createdAt: new Date(),
      });

      const slug = slugify(`${PROPERTY._id}-${PROPERTY.title}-${PROPERTY.Location.unparsedAddress}-${PROPERTY.bedrooms}bedrooms-${PROPERTY.bathrooms}bathrooms-${PROPERTY.property_type}-${PROPERTY.area}${PROPERTY.property_size_unit}`,{ lower: true, strict: true })
          
      revalidatePath(`/property/${slug}`);

      // Return success response
      return NextResponse.json(
        { message: MESSAGE.PROPERTY_PUBLISHED },
        { status: 200 }
      );
    }

    // === Handle Rejection ===
    PROPERTY.Rejected = true;
    PROPERTY.RejectNUM = PROPERTY.RejectNUM + 1;
    await PROPERTY.save();

    // Create rejection log
    await Log.create({
      title: `Property with ID ${PROPERTY._id} rejected by user ${session.user?.email}`,
      action: LogsActions.PROPERTY_REJECTED,
      user_id: session.user.id,
      createdAt: new Date(),
    });

    // Construct message and link
    const MessageUrl = `${process.env.NEXTAUTH_URL}/dashboard/properties/${PROPERTY._id}`;
    const Emailmessage: string =
      `Your property with ID ${PROPERTY._id} has been rejected. Please review and update the information, then try again.\n\n` +
      `You can view the property here: ${MessageUrl}`;

    // Notify all assigned agents
    for (const agentId of PROPERTY.Agents_id) {
      const agent = await Agent.findOne({ _id: agentId });
      if (agent?.email) {
        await sendEmail(agent.email, "Property Rejected | Estatero", Emailmessage);
      }
    }

    // Return success response
    return NextResponse.json(
      { message: MESSAGE.PROPERTY_REJECTED },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in PATCH handler:", error);

    // Return server error
    return NextResponse.json(
      { error: ERROR.SERVER_ERROR },
      { status: 500 }
    );
  }
}