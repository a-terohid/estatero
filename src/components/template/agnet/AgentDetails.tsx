// Import necessary components and libraries
import ImageWithFallback from '@/elements/ImageWithFallback';
import { Agent_Interface } from '@/types/modelTypes';
import Link from 'next/link';
import React from 'react';
import { BiPhoneCall } from 'react-icons/bi';
import { MdOutlineMail } from 'react-icons/md';
import { FaLinkedin } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { mask } from '@/utils/mask';
import { LuMapPin } from "react-icons/lu";
import { IoCalendarOutline } from "react-icons/io5";
import AgentsSendmessageForm from '@/elements/AgentsSendmessageForm';

// Component to render agent details
const AgentDetails = ({ agent }: { agent: Agent_Interface }) => {

    // Destructure agent properties
    const {
        _id,
        email,
        name,
        last_name,
        phone_number,
        profile_picture,
        short_title,
        social,
        address,
        experience_years,
        bio,
        achievement,
        areas_served,
        languages,
        certifications
    } = agent;

    return (
        <div className='container py-20 md:py-32'>
            <div>
                <div className=' flex flex-col md:flex-row gap-y-12 md:gap-y-0 md:gap-x-12 items-start'>
                    {/* Left Column - Agent Info */}
                    <div className=''>
                        {/* Agent Profile Section */}
                        <div>
                            <h1 className='text-Heading-3 md:text-Heading-2 lg:text-Heading-1 mb-8'>Agent Details</h1>
                            <ImageWithFallback src={profile_picture || ""} alt={email} style={"rounded-b-2xl"} />
                        </div>

                        {/* Contact and Social Links Section */}
                        <div className='mt-8 '>
                            <div className='py-2 px-3 rounded-xl flex items-center bg-Greyscale-75 mb-3'>
                                
                                {/* Agent Name and Title */}
                                <div className='flex flex-col gap-y-1 flex-1'>
                                    <Link href={`agents/${_id}`} className='text-Heading-6 md:text-Heading-5 hover:text-primary-100'>
                                        {name} {last_name}
                                    </Link>
                                    <span className='text-Body-RL-RLall md:text-Body-RL-Medium'>{short_title}</span>
                                </div>

                                {/* Social Media Links */}
                                <div className='flex gap-x-2'>
                                    {social?.instagram && (
                                        <Link target='_blank' className='p-2 bg-primary-0 border rounded-lg text-xl hover:text-primary-50' href={`${social.instagram}`}>
                                            <FaInstagram />
                                        </Link>
                                    )}
                                    {social?.linkedin && (
                                        <Link target='_blank' className='p-2 bg-primary-0 border rounded-lg text-xl hover:text-primary-50' href={`${social.linkedin}`}>
                                            <FaLinkedin />
                                        </Link>
                                    )}
                                </div>
                            </div>

                            {/* Contact Information */}
                            <ul className='flex flex-col gap-y-3'>
                                {/* Phone Number */}
                                {phone_number && (
                                    <li className='flex items-center gap-x-2 p-2 border border-gray-200 rounded-xl'>
                                        <Link target='_blank' className='p-2 bg-primary-0 border rounded-lg text-xl hover:text-primary-50' href={`tel:${phone_number}`}>
                                            <BiPhoneCall />
                                        </Link>
                                        <span>{mask(phone_number, "(***) ***-****")}</span>
                                    </li>
                                )}

                                {/* Address */}
                                {address && (
                                    <li className='flex items-center gap-x-2 p-2 border border-gray-200 rounded-xl'>
                                        <span className='p-2 bg-primary-0 border rounded-lg text-xl hover:text-primary-50'>
                                            <LuMapPin />
                                        </span>
                                        <span>{address}</span>
                                    </li>
                                )}

                                {/* Email */}
                                {email && (
                                    <li className='flex items-center gap-x-2 p-2 border border-gray-200 rounded-xl'>
                                        <Link target='_blank' className='p-2 bg-primary-0 border rounded-lg text-xl hover:text-primary-50' href={`mailto:${email}`}>
                                            <MdOutlineMail />
                                        </Link>
                                        <span>{email}</span>
                                    </li>
                                )}

                                {/* Experience Years */}
                                {experience_years && (
                                    <li className='flex items-center gap-x-2 p-2 border border-gray-200 rounded-xl'>
                                        <span className='p-2 bg-primary-0 border rounded-lg text-xl hover:text-primary-50'>
                                            <IoCalendarOutline />
                                        </span>
                                        <span>Licensed since {experience_years}</span>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>

                    {/* Right Column - Additional Info */}
                    <div className='md:mt-5 lg:w-2/3'>
                        
                        {/* About Us Section */}
                        <div className='mb-12'>
                            <h3 className='text-Heading-5 md:text-Heading-4'>About Us</h3>
                            <p className='mt-6'>{bio}</p>
                        </div>

                        {/* Additional Details (Achievements, Areas Served, Languages, Certifications) */}
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-6 lg:gap-12'>
                            
                            {/* Achievements */}
                            {achievement?.length && (
                                <div>
                                    <p className='text-Heading-5 md:text-Heading-4 mb-4'>Achievements:</p>
                                    <ul className='ml-5 list-disc'>
                                        {achievement.map((ac, index) => (
                                            <li key={index}>{ac}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Areas Served */}
                            {areas_served?.length && (
                                <div>
                                    <p className='text-Heading-5 md:text-Heading-4 mb-4'>Areas Served:</p>
                                    <ul className='ml-5 list-disc'>
                                        {areas_served.map((area, index) => (
                                            <li key={index}>{area}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Languages */}
                            {languages?.length && (
                                <div>
                                    <p className='text-Heading-5 md:text-Heading-4 mb-4'>Languages:</p>
                                    <ul className='ml-5 list-disc'>
                                        {languages.map((lang, index) => (
                                            <li key={index}>{lang}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Certifications */}
                            {certifications?.length && (
                                <div>
                                    <p className='text-Heading-5 md:text-Heading-4 mb-4'>Certifications:</p>
                                    <ul className='ml-5 list-disc'>
                                        {certifications.map((cert, index) => (
                                            <li key={index}>{cert}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className='md:hidden lg:block'>
                            <AgentsSendmessageForm 
                                    full_name={`${name} ${last_name}`}
                                    phone={phone_number || null}
                                    imgSRC={profile_picture || null}
                                    agent_id={_id || ""}
                                    />
                        </div>
                    </div>
                </div>
                <div className='md:block lg:hidden hidden'>
                    <AgentsSendmessageForm 
                            full_name={`${name} ${last_name}`}
                            phone={phone_number || null}
                            imgSRC={profile_picture || null}
                            agent_id={_id || ""}
                            />
                </div>
            </div>
        </div>
    );
};

export default AgentDetails;