import Property from '@/models/Property';
import { ERROR } from '@/types/enums/MessageUnum';
import { PropertiesDashboardFilter_interfasce } from '@/types/StatesTypes';
import connectDB from '@/utils/connectDB';
import { NextResponse } from 'next/server';


export async function GET() {
  try {

    // Connect to the database
    await connectDB();

     const Properties = await Property.find()
      .sort({ createdAt: -1 }) 
      .limit(6);

    // Return success response
    return NextResponse.json(
      { data: Properties },
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