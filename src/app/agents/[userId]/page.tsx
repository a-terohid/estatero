// app/agents/[userId]/page.tsx

import { Metadata } from "next";
import connectDB from "@/utils/connectDB";
import { Agent_Interface } from "@/types/modelTypes";
import AgentDetails from "@/template/agnet/AgentDetails";
import Agent from "@/models/agent";

/**
 * Fetch agent data based on the userId
 */
async function fetchAgent(userId: string): Promise<Agent_Interface | null> {
  await connectDB();
  const agent = await Agent.findById(userId);
  return agent;
}

/**
 * Generate metadata based on agent data
 */
export async function generateMetadata({ params }: { params: { userId: string } }): Promise<Metadata> {
  const agent = await fetchAgent(params.userId);

  if (!agent) {
    return {
      title: "Agent Not Found | Estatero",
      description: "The requested agent does not exist.",
    };
  }

  return {
    title: `${agent.name} ${agent.last_name} | Estatero`,
    description: `View the profile of ${agent.name} ${agent.last_name}, a trusted real estate agent.`,
    openGraph: {
      title: `${agent.name} ${agent.last_name} | Estatero`,
      description: `View the profile of ${agent.name} ${agent.last_name}.`,
      images: [
        {
          url: agent.profile_picture || "/img/thumbnail.png",
          width: 1200,
          height: 630,
          alt: `${agent.name} ${agent.last_name}`,
        },
      ],
    },
  };
}

/**
 * Generate static params for all user IDs
 */
export async function generateStaticParams() {
  await connectDB();
  const agents = await Agent.find({}, "_id");

  return agents.map(agent => ({
    userId: agent._id.toString(),
  }));
}

/**
 * Page component
 */
const AgentDetailPage = async ({ params }: { params: { userId: string } }) => {
  const { userId } = params;

  const agent = await fetchAgent(userId);

  if (!agent) {
    return <div>Agent not found.</div>;
  }

  return <AgentDetails agent={agent} />;
};

export default AgentDetailPage;