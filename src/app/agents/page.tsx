import { GetStaticProps, Metadata } from "next";
import connectDB from "@/utils/connectDB";
import Agent from "@/models/agent";
import { Agent_Interface } from "@/types/modelTypes";
import Agentpage from "@/template/agnet/Agentpage";

export const metadata: Metadata = {
    title: "Agents | Estatero",
    description:
      "Browse and explore agents in the Estatero real estate platform, view their profiles and properties.",
    keywords: [
      "Agents",
      "Real Estate Agents",
      "Estatero",
      "Real Estate Platform",
      "User Profiles",
    ],
    robots: "index, follow",
    openGraph: {
      title: "Agents | Estatero",
      description:
        "Browse and explore agents in the Estatero real estate platform, view their profiles and properties.",
      url: "https://estatero.vercel.app/agents",
      type: "website",
      images: [
        {
          url: "/img/thumbnail.png",
          width: 1200,
          height: 630,
          alt: "Estatero Agents Page",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@Estatero",
      title: "Agents | Estatero",
      description:
        "Browse and explore agents in the Estatero real estate platform, view their profiles and properties.",
      images: ["/img/thumbnail.png"],
    },
  };

export const revalidate = 60; //60s

async function fetchAgents(): Promise<Agent_Interface[]> {
  await connectDB();
  const agents = await Agent.find()
  return agents;
}

const page = async () => {
    const agents = await fetchAgents(); 
    
    
    
    return (<Agentpage agents={agents} />);
};

export default page;