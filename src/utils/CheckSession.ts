import { Agent_Interface, User_Interface } from "@/types/modelTypes";
import connectDB from "./connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import User from "@/models/user";
import Agent from "@/models/agent";

export const checkSession = async (): Promise<{ session: any; user: User_Interface | Agent_Interface | null }> => {
  await connectDB();

  const session = await getServerSession(authOptions);
  let user: User_Interface | Agent_Interface | null = null;

  if(!session) return { session, user };

  const role = session?.user.role;

  if (role.includes("Agent")) {
    user = await Agent.findOne({ email: session?.user.email });
  } else {
    user = await User.findOne({ email: session?.user.email });
  }

  return { session, user };
};