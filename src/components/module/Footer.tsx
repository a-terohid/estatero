import Link from 'next/link';

// Import navigation items 
import { navItems } from '@/constants/NavbarItems';

// Import social media links 
import { socialLinks } from '@/constants/SocialLinks';



const Footer = () => {
    return (
        // Main footer section with a textured background
        <footer className=' bg-footer-texture bg-cover bg-top '>
            <div className=' container text-Greyscale-100 py-8 md:py-16'>

                {/* Hero section with a title, description, and CTA buttons */}
                <div className='text-center mb-52 flex flex-col items-center justify-center md:mx-14 lg:mx-64'>
                    <h1 className='text-Heading-2 lg:text-Heading-1'>
                        Your Dream Home Awaits – Let’s Make It Happen
                    </h1>
                    <p className='text-Body-RL-Medium md:text-Body-RL-Large mt-4 mb-12'>
                        Whether you`re buying, selling, or investing, we`re here to guide you. Every step of the way. Start your journey today!
                    </p>

                    {/* Call-to-action buttons */}
                    <div className='flex flex-col gap-y-3 gap-x-3 md:flex-row text-Body-MD-Small w-full items-center justify-center'>
                        <Link className='w-full md:w-fit md:px-4 border rounded-full py-3 border-primary-0 bg-primary-0 text-Greyscale-900 hover:bg-Greyscale-200 hover:border-Greyscale-200' 
                            href='/property'>
                            Explore Properties
                        </Link>
                        <Link className='w-full md:w-fit md:px-4 border rounded-full py-3 border-primary-0 hover:text-Greyscale-800' 
                            href='/contact'>
                            Get Expert Advice
                        </Link>
                    </div> 
                </div>

                {/* Contact information and navigation links */}
                <div className='pt-7 border-t border-t-Greyscale-300 flex flex-col items-center justify-center'>
                    <div className='lg:flex items-center gap-x-14'>

                        {/* Contact details */}
                        <ul className='text-center flex flex-col md:flex-row gap-x-6 gap-y-3 text-Body-RL-Medium flex-1 mr-5 '>
                            <li>info@estatero.com</li>
                            <li>245 Maplewood Drive, Sunnyvale, CA 94086</li>
                            <li>+1-800-555-900</li>
                        </ul>

                        {/* Navigation links mapped from `navItems` */}
                        <ul className='mt-8 md:mt-6 text-Body-RL-Medium flex flex-wrap gap-3 md:gap-x-6 justify-center lg:mt-0 '>
                            {navItems.map((it) => (
                                <li key={it.href}>
                                    <Link href={it.href}>{it.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Brand name in the footer */}
                    <h3 className='font-bold text-[100px] md:text-[115px] lg:text-[200px] text-Neutral mt-3 break-all leading-tight text-center'>
                        ESTATERO
                    </h3>

                    {/* Legal information and social media icons */}
                    <div className='pt-8 mt-3 border-t border-t-Greyscale-600 w-full md:flex items-center justify-between lg:justify-center lg:gap-x-16'>
                        {/* Copyright and policy links */}
                        <ul className='text-Body-RL-Small text-Neutral flex flex-wrap md:flex-nowrap gap-x-6 gap-y-3 items-center justify-center '>
                            <li>© 2025. All rights reserved.</li>
                            <li>Privacy Policy</li>
                            <li>Terms of Service</li>
                            <li>Cookies Settings</li>
                        </ul>

                        {/* Social media links mapped from `socialLinks` */}
                        <div className='mt-6 flex items-center justify-center md:mt-0'>
                            <ul className='flex text-Neutral gap-x-3 text-2xl md:text-lg lg:text-2xl'>
                                {socialLinks.map((item) => (
                                    <li key={item.href}>
                                        <Link href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.label}>
                                            {item.icon}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;