import { authOptions } from "@/lib/auth"; // NextAuth configuration for authentication
import Property from "@/models/Property"; // Mongoose model for properties
import { ERROR, MESSAGE } from "@/types/enums/MessageUnum"; // Enum constants for errors and messages
import { Property_Interface } from "@/types/modelTypes"; // TypeScript interface for a property
import connectDB from "@/utils/connectDB"; // DB connection utility
import { getServerSession } from "next-auth"; // Get user session from server
import { NextResponse } from "next/server"; // For API response handling
import { join } from "path"; // Path utility from Node.js
import Log from "@/models/log"; // Mongoose model for user logs
import { LogsActions } from "@/types/enums/generalEnums"; // Enum for different log actions
import { ensureDirExists, processAndSaveImageForProperties } from "@/utils/files"; // Helper functions for image processing
import Agent from "@/models/agent"; // Mongoose model for agents

export async function POST(req: Request) {
    try {
        await connectDB(); // Establish MongoDB connection

        const formData = await req.formData(); // Extract multipart/form-data
        const dataRaw = formData.get("data")?.toString(); // Get JSON string of property data
        const thumbnail = formData.get("thumbnail") as File || null; // Get thumbnail image file
        const floor_plan = formData.get("floor_plan") as File || null; // Get floor plan image file
        const images = formData.getAll("images") as File[] || []; // Get gallery image files

        let parsedData;
        let thumbnail_Name: string | undefined;
        let floor_plan_Name: string | undefined;
        let images_Names: string[] = [];

        const session = await getServerSession(authOptions); // Retrieve logged-in user session
        if (!session) return NextResponse.json({ error: ERROR.LOGIN }, { status: 401 }); // Return error if user is not logged in

        const isAgentRole = session?.user?.role?.includes("Agent"); // Check if user has Agent role
        if (!isAgentRole) return NextResponse.json({ error: ERROR.ACCESS_DENIED }, { status: 403 }); // Return error if access denied

        const agnet = await Agent.findById(session?.user?.id); // Find the agent by user ID

        if (dataRaw) {
            parsedData = JSON.parse(dataRaw); // Convert JSON string to object
        } else {
            return NextResponse.json({ error: ERROR.INVALID_DATA }, { status: 500 }); // Return error if no data is sent
        }

        // Destructure fields from the parsed property object
        const {
            title, description, price, property_type, are, property_size_unit,
            bedrooms, bathrooms, parking_spaces, year_built, status,
            Location, tags, facts_features
        } = parsedData;

        // Check that all required fields exist
        const requiredFields = [
            title, description, price, property_type, are, property_size_unit,
            bedrooms, bathrooms, parking_spaces, year_built, status, Location
        ];

        if (requiredFields.some((field) => field === undefined || field === null || field === "")) {
            return NextResponse.json({ error: ERROR.INVALID_DATA }, { status: 400 }); // Return error if any required field is missing
        }

        // Create new property document in MongoDB
        const newProperty = await Property.create({
            title, description, price, property_type, are, property_size_unit,
            bedrooms, bathrooms, parking_spaces, year_built,
            Agents_id: [session.user.id], // Link to the current agent
            status, Location, tags, facts_features,
            createdAt: new Date(), updatedAt: new Date(),
        });

        const safeTitle = newProperty._id; // Use property ID for directory names

        // Create thumbnail directory and ensure it exists
        const thumbnail_dir = `/store/properties/${safeTitle}/thumbnail`;
        const thumbnail_upload_dir = join(process.cwd(), "public", thumbnail_dir);
        await ensureDirExists(thumbnail_upload_dir);

        // Create floor plan directory and ensure it exists
        const floor_plan_dir = `/store/properties/${safeTitle}/floor_plan`;
        const floor_plan_upload_dir = join(process.cwd(), "public", floor_plan_dir);
        await ensureDirExists(floor_plan_upload_dir);

        // Create images directory and ensure it exists
        const images_dir = `/store/properties/${safeTitle}/images`;
        const images_upload_dir = join(process.cwd(), "public", images_dir);
        await ensureDirExists(images_upload_dir);

        // Handle thumbnail image upload and processing
        if (thumbnail) {
            if (!thumbnail.type.startsWith("image/")) return NextResponse.json({ error: ERROR.INVALID_FORMAT }, { status: 400 });
            thumbnail_Name = await processAndSaveImageForProperties(thumbnail, thumbnail_upload_dir, safeTitle, 400, 300);
        }

        // Handle floor plan image upload and processing
        if (floor_plan) {
            if (!floor_plan.type.startsWith("image/")) return NextResponse.json({ error: ERROR.INVALID_FORMAT }, { status: 400 });
            floor_plan_Name = await processAndSaveImageForProperties(floor_plan, floor_plan_upload_dir, safeTitle, 400, 300);
        }

        // Handle multiple gallery images upload and processing
        if (images.length) {
            for (const image of images) {
                if (!image.type.startsWith("image/")) return NextResponse.json({ error: ERROR.INVALID_FORMAT }, { status: 400 });
                let image_Name = await processAndSaveImageForProperties(image, images_upload_dir, safeTitle);
                images_Names.push(image_Name);
            }
        }

        // Save image paths to the property document
        newProperty.thumbnail = `${thumbnail_dir}/${thumbnail_Name}`;
        newProperty.floor_plan = `${floor_plan_dir}/${floor_plan_Name}`;
        newProperty.images = images_Names.map(name => `${images_dir}/${name}`);
        newProperty.images_dir = images_dir;
        await newProperty.save(); // Persist changes to database

        // Add property to agent's listed properties
        agnet.properties_listed = [...agnet.properties_listed, newProperty._id];

        // Log the action for auditing
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