import { authOptions } from "@/lib/auth";
import User from "@/models/user";
import { ERROR, MESSAGE } from "@/types/enums/MessageUnum";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import fs from "fs";
import path, { join, basename } from "path";
import { mkdir, writeFile, stat } from "fs/promises";
import mime from "mime";

export const PATCH = async (req: Request) => {
  try {
    // Connect to the database
    await connectDB();

    // Parse form data
    const formData = await req.formData();
    const _id = formData.get("_id")?.toString().trim() || null;
    const name = formData.get("name")?.toString().trim() || null;
    const last_name = formData.get("last_name")?.toString().trim() || null;
    const phone_number = formData.get("phone_number")?.toString().trim() || null;
    const profile_picture = formData.get("profile_picture") as File || null;
    const isCheckedCoverImage = formData.get("isCheckedCoverImage")?.toString().trim() || null;

    let profile_picture_Name: string | undefined;

    // Get user session
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: ERROR.LOGIN }, { status: 401 });

    // Ensure the session user matches the submitted user ID
    if (session.user.id !== _id) {
      return NextResponse.json({ error: ERROR.UNAUTHORIZED }, { status: 403 });
    }

    // Find user in database
    const user = await User.findOne({ _id });
    if (!user) return NextResponse.json({ error: ERROR.CANT_FIND_USER }, { status: 404 });

    // Generate safe directory path for storing profile picture
    const safeTitle = user.email.toLowerCase();
    const profile_picture_dir = `/store/users/${safeTitle}/profile_picture`;
    const profile_picture_upload_dir = join(process.cwd(), "public", profile_picture_dir);

    // Create upload directory if it doesn't exist
    try {
      await stat(profile_picture_upload_dir);
    } catch (e: any) {
      if (e.code === "ENOENT") {
        await mkdir(profile_picture_upload_dir, { recursive: true });
      } else {
        console.error("Error creating directory:", e);
        return NextResponse.json({ error: ERROR.SERVER_ERROR }, { status: 500 });
      }
    }

    // Handle new profile picture upload if checkbox is checked
    if (profile_picture && isCheckedCoverImage === "true") {
      // Delete old profile picture
      if (user.profile_picture) {
        const oldFileName = basename(user.profile_picture); // Extract just the file name
        const coverImagePath = join(profile_picture_upload_dir, oldFileName);
        try {
          if (fs.existsSync(coverImagePath)) {
            fs.unlinkSync(coverImagePath);
            console.log("Old profile picture deleted:", coverImagePath);
          }
        } catch (err) {
          console.error("Error removing old profile picture:", err);
        }
      }

      // Save new profile picture
      const mimeType = profile_picture.type;
      const uint8Array = new Uint8Array(await profile_picture.arrayBuffer());
      const extension = mime.getExtension(mimeType);
      profile_picture_Name = `${_id}_${Date.now()}.${extension}`;
      await writeFile(join(profile_picture_upload_dir, profile_picture_Name), uint8Array);
    }

    // Update user fields
    user.name = name;
    user.last_name = last_name;
    user.phone_number = phone_number;
    user.updatedAt = new Date();
    if (profile_picture_Name) user.profile_picture = `${profile_picture_dir}/${profile_picture_Name}`;

    // Save updated user
    await user.save();

    // Return success response with updated user info
    return NextResponse.json(
      {
        message: MESSAGE.PROFILE_EDIT,
        user: {
          name: user.name,
          last_name: user.last_name,
          phone_number: user.phone_number,
          profile_picture: user.profile_picture,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);

    // Return a server error response in case of failure
    return NextResponse.json(
      { error: ERROR.SERVER_ERROR },
      { status: 500 }
    );
  }
};