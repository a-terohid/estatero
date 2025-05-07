import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// Handle POST requests to revalidate a specific path
export async function POST(req: Request) {
  try {
    // Extract the path from the request body
    const { path } = await req.json();

    // If the path is not provided, return a 422 error response
    if (!path) {
      return NextResponse.json(
        { error: "Path is required" },
        { status: 422 }
      );
    }

    // Revalidate the specified path
    revalidatePath(path);

    // Return a success response with a confirmation message
    return NextResponse.json(
      { message: `Path ${path} revalidated successfully.` },
      { status: 200 }
    );

  } catch (error) {
    // Log the error to the console
    console.error("Error revalidating:", error);

    // Return a 500 error response with a generic error message
    return NextResponse.json(
      { error: "Error revalidating" },
      { status: 500 }
    );
  }
}