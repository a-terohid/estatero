import { Agent_Interface, User_Interface } from "@/types/modelTypes";
import connectDB from "./connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import User from "@/models/user";
import Agent from "@/models/agent";

export const checkSession = async (): Promise<{ session: any; user: User_Interface | Agent_Interface | null }> => {
  await connectDB();

  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.role) {
    throw new Error("Unauthorized: No valid session found");
  }

  const role = session.user.role;
  let user: User_Interface | Agent_Interface | null = null;

  if (role.includes("agent")) {
    user = await Agent.findOne({ email: session.user.email });
  } else {
    user = await User.findOne({ email: session.user.email });
  }

  return { session, user };
};