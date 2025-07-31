import React from 'react';

const AboutUsPage = () => {
    return (
        <div>
            {/* Background section with page title and description */}
            <div className="bg-aboutus-texture bg-cover bg-top lg:bg-center py-8">
                <div className="flex flex-col md:flex-row justify-between gap-y-4 mt-80 container">
                    {/* Page Title */}
                    <h3 className="text-Heading-4 md:text-Heading-2 text-Neutral">About Us</h3>
                    
                    {/* Page Description */}
                    <p className="text-Body-RL-Medium md:text-Body-RL-Large md:w-1/2 text-Greyscale-100">
                        Our reputation stands on trust, expertise, and unparalleled service in the real estate market. Our team combines deep local market knowledge with innovative technology to deliver exceptional results.                    </p>
                </div>
            </div>
            <div className=' container py-8 md:py-16 lg:py-24'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-8 lg:gap-y-0'>
                    <div className='flex flex-col gap-y-4 lg:justify-between'>
                        <h4 className='text-Heading-4 md:text-Heading-3 lg:text-Heading-2'>Your Investment, Our Priority</h4>
                        <p className='text-Body-RL-Small md:text-Body-RL-Medium '>Real estate decisions represent life's most significant investments. From first-time homebuyers to seasoned investors, our experienced agents provide personalized guidance throughout your journey.</p>
                    </div>
                    <img src='/img/AboutUsSectionOneImage.jpg'  alt='Estatero - Your Investment, Our Priority' className='lg:ml-10 rounded-md'/>
                </div>
                <div>
                    <div className='mt-8 md:mt-16 lg:mt-24 flex justify-end'>
                        <h3 className='text-Heading-4 md:text-Heading-3 lg:text-Heading-2'>Excellence Through Experience</h3>
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-8 lg:gap-y-0 mt-16'>
                        <img src='/img/AboutUsSectionTwoImageTwo.jpg'  alt='Estatero - Your Investment, Our Priority' className='rounded-md'/>
                        <div className='flex flex-col-reverse gap-y-4 lg:justify-between lg:ml-10'>
                            <img src='/img/AboutUsSectionTwoImageOne.jpg'  alt='Estatero - Your Investment, Our Priority' className='rounded-md'/>
                            <ul className='flex flex-col gap-y-8'>
                                <li className='text-Body-RL-Small md:text-Body-RL-Medium flex flex-col gap-y-2 '>
                                    <p className='text-Body-SM-Small md:text-Body-SM-Medium'>Local Market Expertise</p>
                                    <span>Our agents live and breathe the communities they serve, offering insider knowledge that gives our clients a competitive edge.</span>
                                </li>
                                <li className='text-Body-RL-Small md:text-Body-RL-Medium flex flex-col gap-y-2 '>
                                    <p className='text-Body-SM-Small md:text-Body-SM-Medium'>Innovative Technology</p>
                                    <span>We leverage cutting-edge tools and marketing strategies to ensure your property reaches the right buyers.</span>
                                </li>
                                <li className='text-Body-RL-Small md:text-Body-RL-Medium flex flex-col gap-y-2 '>
                                    <p className='text-Body-SM-Small md:text-Body-SM-Medium'>Client-First Approach</p>
                                    <span>Your goals become our goals, with responsive communication and tailored solutions matching your unique needs.</span>
                                </li>
                            </ul>
                        </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUsPage;