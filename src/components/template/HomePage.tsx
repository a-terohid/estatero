import FeaturedPropertiesHomePage from "@/elements/FeaturedPropertiesHomePage";


const HomePage = () => {
    return (
        <>
            <div className="bg-homepageHero-texture bg-cover bg-top lg:bg-center py-8">
                <h3 className='font-bold mt-40 container text-[60px] md:text-[115px] lg:text-[200px] text-Neutral break-all leading-tight text-center'>
                    ESTATERO
                </h3>
                <div className="flex flex-col md:flex-row justify-between gap-y-4 lg:items-end mt-40 container">
                    {/* Page Title */}
                    <h3 className="text-Heading-4 md:text-Heading-2 text-Neutral">Make Every Space Unique and Inspiring</h3>
                    
                    {/* Page Description */}
                    <p className="text-Body-RL-Small md:text-Body-RL-Medium md:w-1/2 text-Greyscale-100">
                        Your life evolves, and your home should too. We design flexible living spaces that adapt to your current needs and accommodate your evolving aspirations for the future.
                    </p>
                </div>
            </div>
            <div className='py-8 md:py-16 lg:py-24'>
                <div className='container grid grid-cols-1 lg:grid-cols-2 gap-y-10 lg:gap-y-0'>
                    <div className='flex flex-col gap-y-4 lg:justify-between'>
                        <h4 className='text-Heading-4 md:text-Heading-3 lg:text-Heading-2'>About Us</h4>
                        <ul className='text-Body-RL-XSmall md:text-Body-RL-Small grid grid-cols-3 mt-20'>
                            <li>
                                <p className='text-Heading-4 md:text-Heading-3 lg:text-Heading-2'>500</p>
                                <span>Award Winning</span>
                            </li>
                            <li>
                                <p className='text-Heading-4 md:text-Heading-3 lg:text-Heading-2'>5k+</p>
                                <span>Happy Customers</span>
                            </li>
                            <li>
                                <p className='text-Heading-4 md:text-Heading-3 lg:text-Heading-2'>100+</p>
                                <span>Property Ready</span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <div className='text-Body-RL-Small md:text-Body-RL-Medium flex flex-col gap-y-3'>
                            <p>We believe that finding the perfect property is more than just a transaction—it’s a life-changing journey. Since our inception, we have dedicated ourselves to transforming the way people buy, sell, and </p>
                            <p>With a focus on trust, innovation, and customer satisfaction, we aim to provide a seamless experience for every client. whether you’re searching for your dream home, selling a beloved property, or investing in lucrative opportunities. Our extensive portfolio spans residential, commercial, and investment properties, catering to a diverse range of needs and preferences.</p>
                        </div>
                        <div className="grid grid-cols-2 gap-x-5 mt-12 md:mt-24">
                            <img src="/img/homepagesectionone_2.png" alt="ESTATERO" className='rounded-md'/>
                            <img src="/img/homepagesectionone_1.png" alt="ESTATERO" className='rounded-md'/>
                        </div>
                    </div>
                </div>
                <div className="py-8 md:py-16 lg:py-24 my-8 md:my-16 lg:my-24 bg-Greyscale-75">
                    <FeaturedPropertiesHomePage />
                </div>
            </div>
        </>
    );
};

export default HomePage;