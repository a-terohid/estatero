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
import { join } from "path";
import sendEmail from "@/utils/sendEmail";
import { ensureDirExists, processAndSaveImageForProperties } from "@/utils/files";
import fs from "fs";
import slugify from "slugify";
import { revalidatePath } from "next/cache";

export async function PATCH(req: Request, context: Params) {
  try {
    // Connect to the database
    await connectDB();

    // Extract property ID from the URL parameters
    const property_id = context?.params?.propertyId;

    // Parse incoming form data
    const formData = await req.formData();
    const dataRaw = formData.get("data")?.toString();
    const thumbnail = formData.get("thumbnail") as File || null;
    const floor_plan = formData.get("floor_plan") as File || null;
    const images = formData.getAll("images") as File[] || [];
    const new_agnet = formData.get("new_agnet") as string || null;
    const isCheckedCoverImage = formData.get("isCheckedCoverImage") as string || null;
    const isCheckedFloorPlan = formData.get("isCheckedFloorPlan") as string || null;
    const deletedImages = formData.getAll("deletedImages") as string[] || [];

    let parsedData;
    let thumbnail_Name: string | undefined;
    let floor_plan_Name: string | undefined;
    let images_Names: string[] = [];

    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: ERROR.LOGIN }, { status: 401 });

    // Find the target property
    const PROPERTY = await Property.findOne({ _id: property_id });
    if (!PROPERTY)
      return NextResponse.json({ error: ERROR.CANT_FIND_PROPERTY }, { status: 404 });

    // Parse the property data
    if (dataRaw) {
      parsedData = JSON.parse(dataRaw);
    } else {
      return NextResponse.json({ error: ERROR.INVALID_DATA }, { status: 500 });
    }

    // Destructure the parsed fields
    const {
      title, description, price, property_type, property_Category, area,
      property_size_unit, bedrooms, bathrooms, parking_spaces, year_built,
      status, Location, tags, facts_features
    } = parsedData;

    // Check for missing required fields
    const requiredFields = [
      title, description, price, property_type, property_Category, area,
      property_size_unit, bedrooms, bathrooms, parking_spaces,
      year_built, status, Location
    ];
    if (requiredFields.some(field => field === undefined || field === null || field === ""))
      return NextResponse.json({ error: ERROR.INVALID_DATA }, { status: 400 });

    // Update property fields
    PROPERTY.title = title.trim();
    PROPERTY.description = description.trim();
    PROPERTY.price = price;
    PROPERTY.property_type = property_type;
    PROPERTY.property_Category = property_Category;
    PROPERTY.area = area;
    PROPERTY.property_size_unit = property_size_unit;
    PROPERTY.bedrooms = bedrooms;
    PROPERTY.bathrooms = bathrooms;
    PROPERTY.parking_spaces = parking_spaces;
    PROPERTY.status = status;
    PROPERTY.year_built = year_built;
    PROPERTY.Location = Location;
    PROPERTY.tags = tags;
    PROPERTY.facts_features = facts_features;

    const safeTitle = PROPERTY._id;

    // If a new agent is assigned, add to both property and agent's listing
    if (new_agnet) {
      if (!PROPERTY.Agents_id.includes(new_agnet)) {
        PROPERTY.Agents_id.push(new_agnet);
      }

      const NEW_AGENT = await Agent.findOne({ _id: new_agnet });
      if (NEW_AGENT && !NEW_AGENT.properties_listed.includes(PROPERTY._id)) {
        NEW_AGENT.properties_listed.push(PROPERTY._id);
        await NEW_AGENT.save();
      }
    }

    // Ensure image directories exist
    const thumbnail_dir = `/store/properties/${safeTitle}/thumbnail`;
    const thumbnail_upload_dir = join(process.cwd(), "public", thumbnail_dir);
    await ensureDirExists(thumbnail_upload_dir);

    const floor_plan_dir = `/store/properties/${safeTitle}/floor_plan`;
    const floor_plan_upload_dir = join(process.cwd(), "public", floor_plan_dir);
    await ensureDirExists(floor_plan_upload_dir);

    const images_dir = `/store/properties/${safeTitle}/images`;
    const images_upload_dir = join(process.cwd(), "public", images_dir);
    await ensureDirExists(images_upload_dir);

    // Handle new thumbnail upload
    if (thumbnail && isCheckedCoverImage === "true") {
      if (fs.existsSync(PROPERTY.thumbnail)) {
        fs.unlinkSync(PROPERTY.thumbnail);
      }
      if (!thumbnail.type.startsWith("image/"))
        return NextResponse.json({ error: ERROR.INVALID_FORMAT }, { status: 400 });

      thumbnail_Name = await processAndSaveImageForProperties(thumbnail, thumbnail_upload_dir, safeTitle, 400, 300);
    }

    // Handle new floor plan upload
    if (floor_plan && isCheckedFloorPlan === "true") {
      if (fs.existsSync(PROPERTY.floor_plan)) {
        fs.unlinkSync(PROPERTY.floor_plan);
      }
      if (!floor_plan.type.startsWith("image/"))
        return NextResponse.json({ error: ERROR.INVALID_FORMAT }, { status: 400 });

      floor_plan_Name = await processAndSaveImageForProperties(floor_plan, floor_plan_upload_dir, safeTitle, 400, 300);
    }

    // Delete removed images from disk and DB
    if (deletedImages.length > 0) {
      for (const imgPath of deletedImages) {
        const fullPath = join(process.cwd(), "public", imgPath);
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
      }
      PROPERTY.images = PROPERTY.images.filter((img: string) => !deletedImages.includes(img));
    }

    // Upload new gallery images
    if (images.length > 0) {
      for (const image of images) {
        if (!image.type.startsWith("image/"))
          return NextResponse.json({ error: ERROR.INVALID_FORMAT }, { status: 400 });

        const image_Name = await processAndSaveImageForProperties(image, images_upload_dir, safeTitle);
        images_Names.push(image_Name);
      }
    }

    // Update image paths
    if (thumbnail_Name) {
      PROPERTY.thumbnail = `${thumbnail_dir}/${thumbnail_Name}`;
    }
    if (floor_plan_Name) {
      PROPERTY.floor_plan = `${floor_plan_dir}/${floor_plan_Name}`;
    }
    PROPERTY.images = [...PROPERTY.images, ...images_Names.map(name => `${images_dir}/${name}`)];
    PROPERTY.images_dir = images_dir;

    // Save updated property
    PROPERTY.published = false
    await PROPERTY.save();

    // Log update event
    await Log.create({
      title: `New property with id ${PROPERTY._id} by user ${session.user?.email} edited`,
      action: LogsActions.PROPERTY_EDITED,
      user_id: session.user.id,
      createdAt: new Date(),
    });

    const slug = slugify(`${PROPERTY._id}-${title}-${Location.unparsedAddress}-${bedrooms}bedrooms-${bathrooms}bathrooms-${property_type}-${area}${property_size_unit}`,{ lower: true, strict: true })
    
    revalidatePath(`/property/${slug}`);

    // Return success response
    return NextResponse.json({ message: MESSAGE.PROPERTY_EDITED }, { status: 200 });

  } catch (error) {
    console.log("Error in PATCH handler:", error);
    return NextResponse.json({ error: ERROR.SERVER_ERROR }, { status: 500 });
  }
}