import { Agent_Interface } from '@/types/modelTypes';
import React from 'react';
import ImageWithFallback from '../ImageWithFallback';
import Link from 'next/link';
import { TiArrowSortedDown } from 'react-icons/ti';

const AgentForm = ({agents , currentAgents , newAgent , handler}: {agents: Agent_Interface[] , currentAgents: string[] , newAgent:string , handler:any}) => {

    const maped_agents= agents.filter((ag) => currentAgents.includes(ag._id || ''))

    return (
        <div className=" mt-8 flex flex-col gap-y-5">
            <div>
                <h2 className='text-Body-SM-Medium'>Current Agents:</h2>
                <div className='mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5'>
                    {
                        maped_agents.length && maped_agents.map((agent : Agent_Interface) => 
                            <div key={agent._id} className='p-2 border bg-Neutral border-Greyscale-100 w-fit rounded-2xl'>
                                <ImageWithFallback src={agent.profile_picture || ""} alt={agent.email} style={ "rounded-b-2xl"} />
                                <div className='mt-2 p-2  text-Body-MD-Small md:text-Body-MD-Medium'>
                                    <p>{agent.name} {agent.last_name}</p>
                                    <p>{agent.email}</p>
                                </div>
                                <div className='flex px-2 mb-1 justify-end'>
                                    <Link className='text-Body-MD-XSmall hover:text-Body-SM-Small' href={`/agents/${agent._id}`}>View</Link>
                                </div>
                            </div>)
                    }
                </div>
            </div>
            <div className='lg:w-1/2'>
                <h2 className='text-Body-SM-Medium'>Map new agents:</h2>
                <div className="relative inline-block w-full text-Greyscale-400 mt-3 ">
                    <select 
                        name="newAgent" 
                        value={newAgent} 
                        onChange={handler} 
                        className={`appearance-none w-full lg:text-Body-RL-Small p-3 pr-8 border 'border-Greyscale-100' rounded-lg focus:text-Greyscale-900 focus:border-Greyscale-900 focus:outline-none text-Body-RL-XSmall`}>
                            <option value="" disabled>Select new agent</option>
                            { agents.map((agent) => (
                                <option key={agent._id} value={agent._id}>{agent.name} {agent.last_name}</option>
                            ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-Greyscale-300">
                        <TiArrowSortedDown />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgentForm;