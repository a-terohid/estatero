import ImageWithFallback from '@/elements/ImageWithFallback';
import MyMap from '@/module/Map';
import PropertyGallery from '@/module/PropertyGallery';
import PropertyGallert from '@/module/PropertyGallery';
import { Property_Interface , Agent_Interface } from '@/types/modelTypes';
import { mask } from '@/utils/mask';
import { formatPriceWithSlash } from '@/utils/price';
import Link from 'next/link';
import React from 'react';
import { BiPhoneCall } from 'react-icons/bi';
import { BsHouseCheck, BsHouses } from 'react-icons/bs';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { IoBuildOutline } from 'react-icons/io5';
import { LuBed, LuMapPin, LuSquare } from 'react-icons/lu';
import { MdOutlineMail, MdOutlineSell } from 'react-icons/md';
import { PiBathtub, PiGarage } from 'react-icons/pi';

const PropertDetail = ({property , agents}:{property: Property_Interface , agents : Agent_Interface[]}) => {

    const { _id , title , images , description , price , property_Category , property_type , area , property_size_unit ,
        bedrooms , bathrooms , parking_spaces , year_built , status , Location , tags , 
        facts_features , PublishedBY , published ,createdAt , updatedAt , thumbnail ,
    } = property

    const { F_description , interior_details, outdoor_details , utilities_central , other } = facts_features
    const { country , state , city ,   zipcode ,  street , unparsedAddress ,  coordinates } = Location

    const isRental : boolean = property_type.includes("Lease")


    return (
        <div className='container py-20 md:py-32'>
            <PropertyGallery images={images} thumbnail={thumbnail} tags={tags} description={description} />
            <div className='mt-8 flex flex-col md:flex-row md:justify-between items-center'>
                <div className='w-fit'>
                    <h2 className='text-Heading-5 md:text-Heading-3 lg:text-Heading-1 mb-3'>{title}</h2>
                    <p className='flex items-start gap-x-2 text-Body-MD-Small md:text-Body-MD-Medium lg:text-Body-MD-Large md:items-center  mt-2 mb-3'>
                        <span className='text-lg'><LuMapPin /></span>
                        {unparsedAddress}
                    </p>
                </div>
                <div className='text-Body-MD-Small md:text-Body-MD-Medium lg:text-Body-MD-Large flex w-full md:w-fit gap-y-2 flex-col items-end'>
                    <p className='text-Success-300 text-Heading-5 md:text-Heading-3'>${formatPriceWithSlash(price)}{ isRental && "/Months"}</p>
                    <p>${formatPriceWithSlash(Math.floor(price/area * 100)/100)} /{property_size_unit}</p>
                </div>
            </div>
            <div className='my-8  bg-Greyscale-100 h-[1px] rounded-full'></div>
            <div>
                <div>
                    <ul className='flex flex-wrap gap-3'>
                        { bathrooms && <li className=' flex gap-x-1 w-fit items-center py-1 px-2 bg-Greyscale-75  rounded-md border border-Greyscale-75 '>
                            <span className='text-lg'><PiBathtub /></span>
                            <span>{bathrooms} Baths</span>
                        </li> }
                        { bedrooms && <li className=' flex gap-x-1 w-fit items-center py-1 px-2 bg-Greyscale-75  rounded-md border border-Greyscale-75 '>
                            <span className='text-lg'><LuBed /></span>
                            <span>{bedrooms} Beds</span>
                        </li> }
                        { area && <li className=' flex gap-x-1 w-fit items-center py-1 px-2 bg-Greyscale-75  rounded-md border border-Greyscale-75 '>
                            <span className='text-lg'><LuSquare /></span>
                            <span>{formatPriceWithSlash(area)} {property_size_unit}</span>
                        </li> }
                        { parking_spaces && <li className=' flex gap-x-1 w-fit items-center py-1 px-2 bg-Greyscale-75  rounded-md border border-Greyscale-75 '>
                            <span className='text-lg'><PiGarage /></span>
                            <span>{parking_spaces} Garage</span>
                        </li> }
                        { year_built && <li className=' flex gap-x-1 w-fit items-center py-1 px-2 bg-Greyscale-75  rounded-md border border-Greyscale-75 '>
                            <span className='text-lg'><IoBuildOutline /></span>
                            <span>{year_built} built</span>
                        </li> }
                        { property_Category && <li className=' flex gap-x-1 w-fit items-center py-1 px-2 bg-Greyscale-75  rounded-md border border-Greyscale-75 '>
                            <span className='text-lg'><BsHouses /></span>
                            <span>{property_Category}</span>
                        </li> }
                        { property_type && <li className=' flex gap-x-1 w-fit items-center py-1 px-2 bg-Greyscale-75  rounded-md border border-Greyscale-75 '>
                            <span className='text-lg'><MdOutlineSell /></span>
                            <span>{property_type}</span>
                        </li> }
                        { status && <li className=' flex gap-x-1 w-fit items-center py-1 px-2 bg-Greyscale-75  rounded-md border border-Greyscale-75 '>
                            <span className='text-lg'><BsHouseCheck /></span>
                            <span>{status}</span>
                        </li> }
                    </ul>
                    <div className={`lg:hidden md:grid ${agents.length > 1 ? "md:grid-cols-2 gap-x-2" : null}  mt-8 flex flex-col gap-y-5`}>
                        {
                            agents.map( (agent : Agent_Interface) => <div key={agent._id} className='p-3 border border-gray-200 rounded-xl'>
                                <div className='py-2 px-3 rounded-xl flex gap-x-4 items-center bg-Greyscale-75'>
                                    <div className='w-14'>
                                        <ImageWithFallback src={agent.profile_picture || ""} alt={`${agent.name} ${agent.last_name}`} style={"rounded-b-2xl"} />
                                    </div>
                                    <div>
                                        <h4 className='text-Heading-6 md:text-Heading-5'>{`${agent.name} ${agent.last_name}`}</h4>
                                        {agent.phone_number && (
                                            <p className='text-Body-RL-Medium'>
                                                {mask(agent.phone_number, "(***) ***-****")}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                
                                <ul className='flex flex-col gap-y-3 mt-8'>
                                    <li>
                                        <Link target='_blank' href={`mailto:${agent.email}`}  className='flex items-center justify-center gap-x-2 py-1 border border-primary-300 bg-primary-300 text-Neutral hover:text-primary-300 hover:bg-neutral-50 rounded-full'>
                                            <p className='text-lg'><MdOutlineMail /></p>
                                            <p>Message To Agent</p>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link target='_blank' href={`tel:${agent.phone_number}`} className='flex items-center justify-center gap-x-2 py-1 border border-primary-300 hover:bg-primary-300 hover:text-Neutral rounded-full' >
                                            <p className='text-lg'><BiPhoneCall/></p>
                                            <span>Call To Agent</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>)
                        }
                    </div>
                    <div className='flex '>
                        <ul className='mt-8 flex flex-col gap-y-8 lg:w-8/12 lg:mr-8'>
                            <li><div className='border rounded-3xl border-gray-20 overflow-hidden '>
                                <div className='py-3 px-4 text-Heading-5 md:text-Heading-4'>
                                    <h3>Property Description</h3>
                                </div>
                                <div className='p-6 bg-Greyscale-75 text-Greyscale-700 text-Body-RL-Medium '>
                                    <p>{description}</p>
                                </div>
                            </div></li>
                            <li><div className='border rounded-3xl border-gray-20 overflow-hidden '>
                                <div className='py-3 px-4 text-Heading-5 md:text-Heading-4'>
                                    <h3>Facts & Features</h3>
                                </div>
                                <div className='p-6 bg-Greyscale-75 text-primary-300 text-Body-RL-Medium '>
                                    <p>{F_description}</p>
                                    <ul className='mt-6 flex flex-col gap-y-4'>
                                        { outdoor_details.length ? <li>
                                            <p className='text-Body-MD-Medium'>Outdoor Details</p>
                                            <ul className='mt-2 grid grid-cols-1 md:grid-cols-2'>
                                                {
                                                    outdoor_details.map((dt : string , index : number ) => <li key={index} className='flex items-center gap-x-2'>
                                                        <span className='text-lg'><IoMdCheckmarkCircleOutline/></span>
                                                        <p>{dt}</p>
                                                    </li>)
                                                }
                                            </ul>
                                        </li> : null }
                                        { interior_details.length ? <li>
                                            <p className='text-Body-MD-Medium'>Interior Details</p>
                                            <ul className='mt-2 grid grid-cols-1 md:grid-cols-2'>
                                                {
                                                    interior_details.map((dt : string , index : number ) => <li key={index} className='flex items-center gap-x-2'> 
                                                        <span className='text-lg'><IoMdCheckmarkCircleOutline/></span>
                                                        <p>{dt}</p>
                                                    </li>)
                                                }
                                            </ul>
                                        </li> : null }
                                        { utilities_central.length ? <li>
                                            <p className='text-Body-MD-Medium'>Utilities Central Details</p>
                                            <ul className='mt-2 grid grid-cols-1 md:grid-cols-2'>
                                                {
                                                    utilities_central.map((dt : string , index : number ) => <li key={index} className='flex items-center gap-x-2'>
                                                        <span className='text-lg'><IoMdCheckmarkCircleOutline/></span>
                                                        <p>{dt}</p>
                                                    </li>)
                                                }
                                            </ul>
                                        </li> : null }
                                        { other.length ? <li>
                                            <p className='text-Body-MD-Medium'>Other Details</p>
                                            <ul className='mt-2 grid grid-cols-1 md:grid-cols-2'>   
                                                {
                                                    other.map((dt : string , index : number ) => <li key={index} className='flex items-center gap-x-2'>
                                                        <span className='text-lg'><IoMdCheckmarkCircleOutline/></span>
                                                        <p>{dt}</p>
                                                    </li>)
                                                }
                                            </ul>
                                        </li> : null }
                                    </ul>
                                </div>
                            </div></li>
                            <li><div className='border rounded-3xl border-gray-20 overflow-hidden '>
                                <div className='py-3 px-4 text-Heading-5 md:text-Heading-4'>
                                    <h3>Property Location</h3>
                                </div>
                                <div className='p-6 bg-Greyscale-75 text-primary-300 text-Body-RL-Medium '>
                                    <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 mb-5'>
                                        <li>
                                            <p className='text-Greyscale-700 mb-2'>Country</p>
                                            <p className='text-Body-MD-Medium'>{country}</p>
                                        </li>
                                        <li>
                                            <p className='text-Greyscale-700 mb-2'>State</p>
                                            <p className='text-Body-MD-Medium'>{state}</p>
                                        </li>
                                        <li>
                                            <p className='text-Greyscale-700 mb-2'>City</p>
                                            <p className='text-Body-MD-Medium'>{city}</p>
                                        </li>
                                        <li>
                                            <p className='text-Greyscale-700 mb-2'>Street</p>
                                            <p className='text-Body-MD-Medium'>{street}</p>
                                        </li>
                                        <li>
                                            <p className='text-Greyscale-700 mb-2'>Zipcode</p>
                                            <p className='text-Body-MD-Medium'>{zipcode}</p>
                                        </li>
                                        <li>
                                            <p className='text-Greyscale-700 mb-2'>Unparsed Address</p>
                                            <p className='text-Body-MD-Medium'>{unparsedAddress}</p>
                                        </li>
                                    </ul>
                                    <MyMap lat={coordinates.Latitude} lon={coordinates.Longitude} />
                                    
                                </div>
                            </div></li>
                        </ul>
                        <div className={`hidden mt-8 lg:flex flex-col gap-y-8 w-4/12`}>
                            {
                                agents.map( (agent : Agent_Interface) => <div key={agent._id} className='p-3 border border-gray-200 rounded-xl'>
                                    <div className='py-2 px-3 rounded-xl flex gap-x-4 items-center bg-Greyscale-75'>
                                        <div className='w-14'>
                                            <ImageWithFallback src={agent.profile_picture || ""} alt={`${agent.name} ${agent.last_name}`} style={"rounded-b-2xl"} />
                                        </div>
                                        <div>
                                            <h4 className='text-Heading-6 md:text-Heading-5'>{`${agent.name} ${agent.last_name}`}</h4>
                                            {agent.phone_number && (
                                                <p className='text-Body-RL-Medium'>
                                                    {mask(agent.phone_number, "(***) ***-****")}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <ul className='flex flex-col gap-y-3 mt-8'>
                                        <li>
                                            <Link target='_blank' href={`mailto:${agent.email}`}  className='flex items-center justify-center gap-x-2 py-1 border border-primary-300 bg-primary-300 text-Neutral hover:text-primary-300 hover:bg-neutral-50 rounded-full'>
                                                <p className='text-lg'><MdOutlineMail /></p>
                                                <p>Message To Agent</p>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link target='_blank' href={`tel:${agent.phone_number}`} className='flex items-center justify-center gap-x-2 py-1 border border-primary-300 hover:bg-primary-300 hover:text-Neutral rounded-full' >
                                                <p className='text-lg'><BiPhoneCall/></p>
                                                <span>Call To Agent</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertDetail;