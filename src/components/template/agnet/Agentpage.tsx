import AgentsCard from '@/elements/AgentsCard';
import { Agent_Interface } from '@/types/modelTypes';
import React from 'react';

/**
 * Agentpage Component
 * 
 * This component renders the agent page, displaying information about the company's agents,
 * their expertise, and a list of agents with contact information.
 * 
 * @param {Agent_Interface[]} agents - Array of agent objects to be displayed.
 * @returns {JSX.Element} The agent page layout with agent information and a list of agents.
 */
const Agentpage = ({ agents }: { agents: Agent_Interface[] }) => {
    return (
        <div>
            {/* Background section with page title and description */}
            <div className="bg-agentPage-texture bg-cover bg-top lg:bg-bottom py-8">
                <div className="flex flex-col md:flex-row justify-between gap-y-4 mt-80 container">
                    {/* Page Title */}
                    <h3 className="text-Heading-4 md:text-Heading-2 text-Neutral">Agent</h3>
                    
                    {/* Page Description */}
                    <p className="text-Body-RL-Medium md:text-Body-RL-Large md:w-1/2 text-Greyscale-100">
                        {` Our experienced agents at ${<span className='font-bold'>Estatero</span>} are here to guide you every step of the way. Whether you're buying, selling, or renting, our team combines local market expertise with a client-first approach.`}
                    </p>
                </div>
            </div>

            {/* Main content section */}
            <div className='container py-8 md:py-16 lg:py-24'>
                {/* Section Title and Intro Text */}
                <div className='md:w-1/2 mb-12'>
                    <h2 className='text-Heading-4 md:text-Heading-2 lg:text-Heading-1'>Meet Our Expert Agents</h2>
                    <p className='text-Body-RL-Small md:text-Body-RL-Medium lg:text-Body-RL-Large mt-2 md:mt-4'>
                        At Estatero, our dedicated agents are here to make your home-buying, selling, or renting journey as seamless as possible.
                    </p>
                </div>

                {/* Agent Features Section */}
                <ul>
                    {/* Feature - Local Experts */}
                    <li className='py-6 border-t border-Greyscale-100 flex gap-y-2 md:gap-0 flex-col md:flex-row justify-between'>
                        <h4 className='text-Heading-5 md:text-Heading-4'>Local Experts</h4>
                        <p className='text-Body-RL-Small md:text-Body-RL-Medium md:w-1/2 lg:w-1/3'>
                            Our agents know your neighborhood inside and out, ensuring you get the best deals tailored to your needs.
                        </p>
                    </li>

                    {/* Feature - Personalized Service */}
                    <li className='py-6 border-t border-Greyscale-100 flex gap-y-2 md:gap-0 flex-col md:flex-row justify-between'>
                        <h4 className='text-Heading-5 md:text-Heading-4'>Personalized Service</h4>
                        <p className='text-Body-RL-Small md:text-Body-RL-Medium md:w-1/2 lg:w-1/3'>
                            Every client is unique, and we’re committed to understanding your specific goals and preferences.
                        </p>
                    </li>

                    {/* Feature - Results-Driven Approach */}
                    <li className='py-6 border-t border-Greyscale-100 flex gap-y-2 md:gap-0 flex-col md:flex-row justify-between'>
                        <h4 className='text-Heading-5 md:text-Heading-4'>Results-Driven Approach</h4>
                        <p className='text-Body-RL-Small md:text-Body-RL-Medium md:w-1/2 lg:w-1/3'>
                            From negotiations to finalizing deals, our agents work tirelessly to deliver the results you deserve.
                        </p>
                    </li>

                    {/* Feature - Support Every Step of the Way */}
                    <li className='py-6 border-t border-Greyscale-100 flex gap-y-2 md:gap-0 flex-col md:flex-row justify-between'>
                        <h4 className='text-Heading-5 md:text-Heading-4'>Support Every Step of the Way</h4>
                        <p className='text-Body-RL-Small md:text-Body-RL-Medium md:w-1/2 lg:w-1/3'>
                        {`Whether you're buying your first home or selling a property, our agents guide you with transparency.`}
                        </p>
                    </li>
                </ul>

                {/* Agent List Section */}
                <div className='mt-16 md:mt-32 lg:mt-52'>
                    <h4 className='text-Heading-4 md:text-Heading-2 lg:text-Heading-1'>Our Trusted Agents</h4>
                    
                    {/* Agent Cards */}
                    <div className='mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                        {
                            agents.length 
                                ? agents.map((agent, index) => (
                                    <AgentsCard agent={agent} key={index} />
                                )) 
                                : <p className='text-Body-MD-Medium mt-5'>No Agent Found!</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Agentpage;