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
import Blog from "@/models/Blog";

export async function PATCH(req: Request, context: Params) {
  try {

    // Connect to the database
    await connectDB();

    // Extract the blog ID from route parameters
    const blog_id = context?.params?.blogID;

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

    // Find the Blog by ID
    const BLOG = await Blog.findOne({ _id: blog_id });
    if (!BLOG) {
      return NextResponse.json(
        { error: ERROR.CANT_FIND_PROPERTY },
        { status: 404 }
      );
    }

    // Validate "publish" flag
    if (publish === undefined) return NextResponse.json({ error: ERROR.INVALID_DATA }, { status: 400 });

    // === Handle Publishing ===
    if (publish) {
      BLOG.published = true;
      BLOG.PublishedBY = {
        userId: existUser._id,
        email: existUser.email,
      };
      await BLOG.save();

      // Create log entry
      await Log.create({
        title: `Blog with ID ${BLOG._id} published by user ${session.user?.email}`,
        action: LogsActions.BLOG_PUBLISHED,
        user_id: session.user.id,
        createdAt: new Date(),
      });

      const slug = slugify(`${BLOG._id}-${BLOG.title}-${session.user?.name}${session.user?.last_name}`,{ lower: true, strict: true })
          
      revalidatePath(`/Blogs/${slug}`);

      // Return success response
      return NextResponse.json(
        { message: MESSAGE.BLOG_PUBLISHED },
        { status: 200 }
      );
    }

    // Create rejection log
    await Log.create({
      title: `Blog with ID ${BLOG._id} rejected by user ${session.user?.email}`,
      action: LogsActions.BLOG_REJECTED,
      user_id: session.user.id,
      createdAt: new Date(),
    });

    // Construct message and link
    const MessageUrl = `${process.env.NEXTAUTH_URL}/dashboard/blogs/${BLOG._id}`;
    const Emailmessage: string =
      `Your property with ID ${BLOG._id} has been rejected. Please review and update the information, then try again.\n\n` +
      `You can view the property here: ${MessageUrl}`;

    // Return success response
    return NextResponse.json(
      { message: MESSAGE.Blog_REJECTED },
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