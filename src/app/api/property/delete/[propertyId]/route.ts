import { authOptions } from "@/lib/auth";
import Agent from "@/models/agent";
import Property from "@/models/Property";
import { ERROR, MESSAGE } from "@/types/enums/MessageUnum";
import { Agent_Interface, Property_Interface } from "@/types/modelTypes";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";
import { LogsActions } from '@/types/enums/generalEnums';
import Log from "@/models/log";
import path from "path";
import { rm } from 'fs/promises';

export async function PATCH(req: Request, { params }: { params: { propertyId: string } }) {
  try {
    await connectDB();
    const property_id = params.propertyId;

    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: ERROR.LOGIN }, { status: 401 });

    const PROPERTY = await Property.findOne({ _id: property_id });
    if (!PROPERTY)
      return NextResponse.json({ error: ERROR.CANT_FIND_PROPERTY }, { status: 404 });

    const fullPath = path.resolve('public/store/properties/', property_id);

    // Delete files first
    try {
      await rm(fullPath, { recursive: true, force: true });
    } catch (error) {
      console.error("Error removing property files:", error);
      return NextResponse.json({ error: ERROR.SERVER_ERROR }, { status: 500 });
    }

    // Then delete the property from DB
    await Property.deleteOne({ _id: property_id });

    // Clean up agents
    for (const agentID of PROPERTY.Agents_id) {
      const agent = await Agent.findOne({ _id: agentID });
      if (agent) {
        agent.properties_listed = agent.properties_listed.filter(
          (id : string) => id !== property_id.toString()
        );
        await agent.save();
      }
    }

    await Log.create({
      title: `property with id ${PROPERTY._id} by user ${session.user?.email} deleted`,
      action: LogsActions.PROPERTY_DELETED,
      user_id: session.user.id,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: MESSAGE.PROPERTY_DELETED }, { status: 200 });

  } catch (error) {
    console.log("Error in PATCH handler:", error);
    return NextResponse.json({ error: ERROR.SERVER_ERROR }, { status: 500 });
  }
}