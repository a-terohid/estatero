import { authOptions } from "@/lib/auth"; // NextAuth config for session handling
import Property from "@/models/Property"; // MongoDB model for properties
import { ERROR, MESSAGE } from "@/types/enums/MessageUnum"; // Predefined error and message enums
import { Property_Interface } from "@/types/modelTypes"; // TypeScript interface for property model
import connectDB from "@/utils/connectDB"; // Utility to connect to MongoDB
import { getServerSession } from "next-auth"; // Gets the current authenticated session
import { NextResponse } from "next/server"; // For sending HTTP responses
import { join } from "path"; // Node.js path module to construct directory paths
import Log from "@/models/log"; // MongoDB model for logging user actions
import { LogsActions } from "@/types/enums/generalEnums"; // Enum for log actions
import { ensureDirExists, processAndSaveImageForProperties } from "@/utils/files"; // Utils for saving and processing images

export async function POST(req: Request) {
    try {
        await connectDB(); // Connect to the database

        const formData = await req.formData(); // Parse incoming form data
        const dataRaw = formData.get("data")?.toString(); // Get raw property JSON data
        const thumbnail = formData.get("thumbnail") as File || null; // Get thumbnail image
        const floor_plan = formData.get("floor_plan") as File || null; // Get floor plan image
        const images = formData.getAll("images") as File[] || []; // Get list of gallery images

        let parsedData;
        let thumbnail_Name: string | undefined;
        let floor_plan_Name: string | undefined;
        let images_Names: string[] = [];

        const session = await getServerSession(authOptions); // Get current user session
        if (!session) return NextResponse.json({ error: ERROR.LOGIN }, { status: 401 }); // Not logged in

        const isAgentRole = session?.user?.role?.includes("Agent"); // Check if user has "Agent" role
        if (!isAgentRole) return NextResponse.json({ error: ERROR.ACCESS_DENIED }, { status: 403 }); // Access denied

        if (dataRaw) {
            parsedData = JSON.parse(dataRaw); // Parse JSON string to object
        } else {
            return NextResponse.json({ error: ERROR.INVALID_DATA }, { status: 500 }); // Invalid data format
        }

        // Destructure required fields from parsed data
        const {
            title, description, price, property_type, are, property_size_unit,
            bedrooms, bathrooms, parking_spaces, year_built, status,
            Location, tags, facts_features
        } = parsedData;

        // Check for missing required fields
        const requiredFields = [
            title, description, price, property_type, are, property_size_unit,
            bedrooms, bathrooms, parking_spaces, year_built, status, Location
        ];

        if (requiredFields.some((field) => field === undefined || field === null || field === "")) {
            return NextResponse.json({ error: ERROR.INVALID_DATA }, { status: 400 }); // Return if any required field is empty
        }

        // Create new property document in MongoDB
        const newProperty = await Property.create({
            title, description, price, property_type, are, property_size_unit,
            bedrooms, bathrooms, parking_spaces, year_built,
            Agents_id: [session.user.id], // Link agent
            status, Location, tags, facts_features,
            createdAt: new Date(), updatedAt: new Date(),
        });

        const safeTitle = newProperty._id; // Use property ID as folder name

        // Define upload paths and ensure directories exist
        const thumbnail_dir = `/store/properties/${safeTitle}/thumbnail`;
        const thumbnail_upload_dir = join(process.cwd(), "public", thumbnail_dir);
        await ensureDirExists(thumbnail_upload_dir);

        const floor_plan_dir = `/store/properties/${safeTitle}/floor_plan`;
        const floor_plan_upload_dir = join(process.cwd(), "public", floor_plan_dir);
        await ensureDirExists(floor_plan_upload_dir);

        const images_dir = `/store/properties/${safeTitle}/images`;
        const images_upload_dir = join(process.cwd(), "public", images_dir);
        await ensureDirExists(images_upload_dir);

        // Process and save thumbnail image
        if (thumbnail) {
            if (!thumbnail.type.startsWith("image/")) return NextResponse.json({ error: ERROR.INVALID_FORMAT }, { status: 400 });
            thumbnail_Name = await processAndSaveImageForProperties(thumbnail, thumbnail_upload_dir, safeTitle, 400, 300);
        }

        // Process and save floor plan image
        if (floor_plan) {
            if (!floor_plan.type.startsWith("image/")) return NextResponse.json({ error: ERROR.INVALID_FORMAT }, { status: 400 });
            floor_plan_Name = await processAndSaveImageForProperties(floor_plan, floor_plan_upload_dir, safeTitle, 400, 300);
        }

        // Process and save gallery images
        if (images.length) {
            for (const image of images) {
                if (!image.type.startsWith("image/")) return NextResponse.json({ error: ERROR.INVALID_FORMAT }, { status: 400 });
                let image_Name = await processAndSaveImageForProperties(image, images_upload_dir, safeTitle);
                images_Names.push(image_Name); // Store filename
            }
        }

        // Assign image paths to property and save
        newProperty.thumbnail = `${thumbnail_dir}/${thumbnail_Name}`;
        newProperty.floor_plan = `${floor_plan_dir}/${floor_plan_Name}`;
        newProperty.images = images_Names.map(name => `${images_dir}/${name}`);
        newProperty.images_dir = images_dir;
        await newProperty.save(); // Save updated document

        // Log the creation in the system logs
        await Log.create({
            title: `New property with id ${newProperty._id} by user ${session.user?.email} added`,
            action: LogsActions.NEW_PROPERTIES,
            user_id: session.user.id,
            createdAt: new Date(),
        });

        // Return success response
        return NextResponse.json({ message: MESSAGE.NEW_PROPERTY }, { status: 200 });

    } catch (error) {
        console.log("Error in sending message:", error);
        return NextResponse.json({ error: ERROR.SERVER_ERROR }, { status: 500 }); // Return server error
    }
}