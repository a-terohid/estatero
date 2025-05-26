import FormSendMessage from '@/elements/FormSendMessage';
import Link from 'next/link';
import React from 'react';
import { BiPhoneCall } from 'react-icons/bi';
import { FaStar } from 'react-icons/fa';
import { IoCheckmarkSharp } from 'react-icons/io5';
import { LuMapPin } from 'react-icons/lu';
import { MdOutlineMail } from 'react-icons/md';
import { TiWatch } from 'react-icons/ti';

const ContacPage = () => {
    return (
        <div>
            {/* Hero section with background image and introductory text */}
            <div className="bg-ContactPage-texture bg-cover bg-bottom py-8">
                <div className="flex flex-col md:flex-row justify-between gap-y-4 mt-80 container">
                    {/* Section title */}
                    <h3 className="text-Heading-4 md:text-Heading-2 text-Neutral">Contact Us</h3>

                    {/* Short description under the title */}
                    <p className="text-Body-RL-Medium md:text-Body-RL-Large md:w-1/2 text-Greyscale-100">
                        Need assistance? Contact us today for personalized support with your real estate needs. Whether you're buying, selling, or renting, 
                    </p>
                </div>
            </div>

            {/* Main contact content section */}
            <div className="container py-8 md:py-16 lg:py-24">
                <div className='w-full flex flex-col lg:flex-row items-start gap-y-12'>
                    {/* Left side: Information and bullet points */}
                    <div className='lg:w-1/2'>
                        <h3 className='text-Heading-4 md:text-Heading-2 lg:text-Heading-1'>Contact Our Real Estate Experts</h3>
                        <p className='text-Body-RL-Medium md:text-Body-RL-Large mt-4'>
                            If you're looking for your dream home, need help selling your property, or simply have questions about the market, our team is here to assist you. 
                        </p>

                        {/* List of benefits/services */}
                        <ul className='flex flex-col gap-y-3 text-Body-RL-Medium md:text-Body-RL-Large my-6'>
                            <li className='flex gap-x-3 items-center'>
                                <span className='p-2 bg-primary-0 border rounded-lg text-lg hover:text-primary-50'><IoCheckmarkSharp /></span>
                                <p>Explore properties tailored to your needs</p>
                            </li>
                            <li className='flex gap-x-3 items-center'>
                                <span className='p-2 bg-primary-0 border rounded-lg text-lg hover:text-primary-50'><IoCheckmarkSharp /></span>
                                <p>Get expert advice on buying, selling, or renting</p>
                            </li>
                            <li className='flex gap-x-3 items-center'>
                                <span className='p-2 bg-primary-0 border rounded-lg text-lg hover:text-primary-50'><IoCheckmarkSharp /></span>
                                <p>Access exclusive market insights and opportunities</p>
                            </li>
                        </ul>

                        {/* Client ratings and trust badge */}
                        <div className='rounded-xl p-3 bg-Greyscale-75'>
                            {/* Rating stars */}
                            <div className='flex flex-wrap gap-3 items-center'>
                                <div className='flex gap-x-1'>
                                    <span className='text-base p-2 border-2 border-Neutral text-Neutral rounded-xl bg-Warning-100'><FaStar /></span>
                                    <span className='text-base p-2 border-2 border-Neutral text-Neutral rounded-xl bg-Warning-100'><FaStar /></span>
                                    <span className='text-base p-2 border-2 border-Neutral text-Neutral rounded-xl bg-Warning-100'><FaStar /></span>
                                    <span className='text-base p-2 border-2 border-Neutral text-Neutral rounded-xl bg-Warning-100'><FaStar /></span>
                                    <span className='text-base p-2 border-2 border-Neutral text-Neutral rounded-xl bg-Warning-100'><FaStar /></span>
                                </div>
                                <span className='text-Body-RL-Medium'>4.9 out of 5 stars from 2,500+ happy clients</span>
                            </div>

                            {/* Divider line */}
                            <div className='bg-Neutral h-[1px] rounded-full my-5 md:my-6 w-full'></div>

                            {/* Profile picture group (clients) */}
                            <div className='flex flex-wrap gap-3 items-center'>
                                <div className='flex gap-x-1'>
                                    {/* Overlapping user avatars */}
                                    <img src='/img/ProfilePicurePlaceHolder.jpg' alt='profile' className='w-8 h-8 rounded-full'/>
                                    <img src='/img/ProfilePicurePlaceHolder.jpg' alt='profile' className='w-8 h-8 rounded-full -ml-4'/>
                                    <img src='/img/ProfilePicurePlaceHolder.jpg' alt='profile' className='w-8 h-8 rounded-full -ml-4'/>
                                    <img src='/img/ProfilePicurePlaceHolder.jpg' alt='profile' className='w-8 h-8 rounded-full -ml-4'/>
                                    <img src='/img/ProfilePicurePlaceHolder.jpg' alt='profile' className='w-8 h-8 rounded-full -ml-4'/>
                                </div>
                                <span className='text-Body-RL-Medium'>Join thousands of clients who have trusted us with their property needs.</span>
                            </div>
                        </div>
                    </div>

                    {/* Right side: Contact form component */}
                    <FormSendMessage />
                </div>

                {/* Location and contact info section */}
                <div className='mt-12'>
                    <h3 className='text-Heading-4 md:text-Heading-2 lg:text-Heading-1'>Location</h3>
                    <div className='mt-8 w-full flex flex-col lg:flex-row gap-y-8'>
                        {/* Embedded map image */}
                        <img src='/img/Map.png' alt='google map' className='w-full lg:w-1/2' />

                        {/* Contact details list */}
                        <ul className='w-full lg:ml-12 flex flex-col gap-y-6'>
                            {/* Phone section */}
                            <li className='p-3 border border-gray-200 rounded-xl'>
                                <div className='flex gap-x-2 items-center'>
                                    <span className='p-1 bg-primary-0 border rounded-lg text-2xl hover:text-primary-50'><BiPhoneCall /></span>
                                    <span className='text-Heading-5 md:text-Heading-4'>Call Us</span>
                                </div>
                                <div className='bg-gray-200 rounded-full h-[1px] mx-2 my-4'></div>
                                <div className='text-Body-RL-Medium text-Greyscale-700'>
                                    <ul className='flex flex-col gap-y-1 md:gap-y-2'>
                                        <li><Link href='tel:+1-415-732-5648'>+1-415-732-5648</Link></li>
                                        <li><Link href='tel:+1-415-865-7489'>+1-415-865-7489</Link></li>
                                    </ul>
                                </div>
                            </li>

                            {/* Address section */}
                            <li className='p-3 border border-gray-200 rounded-xl'>
                                <div className='flex gap-x-2 items-center'>
                                    <span className='p-1 bg-primary-0 border rounded-lg text-2xl hover:text-primary-50'><LuMapPin /></span>
                                    <span className='text-Heading-5 md:text-Heading-4'>Visit Us</span>
                                </div>
                                <div className='bg-gray-200 rounded-full h-[1px] mx-2 my-4'></div>
                                <div className='text-Body-RL-Medium text-Greyscale-700'>
                                    <p>245 Maplewood Drive, Sunnyvale, CA 94086</p>
                                </div>
                            </li>

                            {/* Email section */}
                            <li className='p-3 border border-gray-200 rounded-xl'>
                                <div className='flex gap-x-2 items-center'>
                                    <span className='p-1 bg-primary-0 border rounded-lg text-2xl hover:text-primary-50'><MdOutlineMail /></span>
                                    <span className='text-Heading-5 md:text-Heading-4'>Email</span>
                                </div>
                                <div className='bg-gray-200 rounded-full h-[1px] mx-2 my-4'></div>
                                <div className='text-Body-RL-Medium text-Greyscale-700'>
                                    <ul className='flex flex-col gap-y-1 md:gap-y-2'>
                                        <li>info@estatero.com</li>
                                        <li>contact@estatero.com</li>
                                    </ul>
                                </div>
                            </li>

                            {/* Office hours */}
                            <li className='p-3 border border-gray-200 rounded-xl'>
                                <div className='flex gap-x-2 items-center'>
                                    <span className='p-1 bg-primary-0 border rounded-lg text-2xl hover:text-primary-50'><TiWatch /></span>
                                    <span className='text-Heading-5 md:text-Heading-4'>Office Hours</span>
                                </div>
                                <div className='bg-gray-200 rounded-full h-[1px] mx-2 my-4'></div>
                                <div className='text-Body-RL-Medium text-Greyscale-700'>
                                    <ul className='flex flex-col gap-y-1 md:gap-y-2'>
                                        <li>Mon-Fri: 9:00 AM - 6:00 PM</li>
                                        <li>Sat: 10:00 AM - 4:00 PM</li>
                                        <li>Sun: Closed</li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContacPage;