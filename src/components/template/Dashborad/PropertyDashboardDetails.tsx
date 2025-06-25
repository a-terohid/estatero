import PublishProprety from '@/elements/buttons/PublishProprety';
import MyMap from '@/module/Map';
import Slider from '@/module/Slider';
import { Agent_Interface, Property_Interface } from '@/types/modelTypes';
import { formatPriceWithSlash } from '@/utils/price';
import Link from 'next/link';
import React from 'react';

const PropertyDashboardDetails = ({property , agent , userIsAdmin}: {property: Property_Interface , agent: Agent_Interface[] , userIsAdmin: boolean}) => {

    const { _id , title , images , description , price , property_Category , property_type , area , property_size_unit ,
        bedrooms , bathrooms , parking_spaces , year_built , status , Location , tags , 
        facts_features , PublishedBY , published ,createdAt , updatedAt
    } = property
    
    const { country , state , city ,   zipcode ,  street , unparsedAddress ,  coordinates } = Location

    const { F_description , outdoor_details , interior_details , utilities_central , other } =  facts_features

    return (
        <div className='px-5 py-5 md:px-7'>
            {/* Page title */}
            <h1 className='text-Heading-4 mb-6'>{title}</h1>
            <div>
                <Slider images={images} />
            </div>
            <div className='mt-10 rounded-xl overflow-hidden'>
                <MyMap lat={coordinates.Latitude} lon={coordinates.Longitude} />
            </div>
            <div className='mt-8'>
                <div className='flex flex-col gap-y-12' >
                    <div>
                        <p className='md:text-Body-SM-Large text-Body-SM-Medium mb-1' >Description</p>
                        <p className='md:text-Body-RL-Medium text-Body-RL-Small'>{description}</p>
                    </div>
                    <div>
                        <p className='md:text-Body-SM-Large text-Body-SM-Medium mb-1' >Details:</p>
                        <ul className='md:text-Body-RL-Medium text-Body-RL-Small grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-3'>
                            <li>
                                <span className='md:text-Body-SM-Medium text-Body-SM-Small' >Price: </span>
                                {formatPriceWithSlash(price)}$
                            </li>
                            <li>
                                <span className='md:text-Body-SM-Medium text-Body-SM-Small' >Property Type: </span>
                                {property_type}
                            </li>
                            <li>
                                <span className='md:text-Body-SM-Medium text-Body-SM-Small' >Property Category: </span>
                                {property_Category}
                            </li>
                            <li>
                                <span className='md:text-Body-SM-Medium text-Body-SM-Small' >Area: </span>
                                {area} {property_size_unit}
                            </li>
                            <li>
                                <span className='md:text-Body-SM-Medium text-Body-SM-Small' >Bedrooms: </span>
                                {bedrooms}
                            </li>
                            <li>
                                <span className='md:text-Body-SM-Medium text-Body-SM-Small' >Bathrooms: </span>
                                {bathrooms}
                            </li>
                            <li>
                                <span className='md:text-Body-SM-Medium text-Body-SM-Small' >Parking Spaces : </span>
                                {parking_spaces}
                            </li>
                            <li>
                                <span className='md:text-Body-SM-Medium text-Body-SM-Small' >Year Built : </span>
                                {year_built}
                            </li>
                            <li>
                                <span className='md:text-Body-SM-Medium text-Body-SM-Small' >Status : </span>
                                {status}
                            </li>
                        </ul>
                    </div>
                    <div>
                        <p className='md:text-Body-SM-Large text-Body-SM-Medium mb-1' >Location:</p>
                        <ul className='md:text-Body-RL-Medium text-Body-RL-Small grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-3'>
                            <li>
                                <span className='md:text-Body-SM-Medium text-Body-SM-Small' >country: </span>
                                {country}
                            </li>
                            <li>
                                <span className='md:text-Body-SM-Medium text-Body-SM-Small' >State: </span>
                                {state}
                            </li>
                            <li>
                                <span className='md:text-Body-SM-Medium text-Body-SM-Small' >City: </span>
                                {city}
                            </li>
                            <li>
                                <span className='md:text-Body-SM-Medium text-Body-SM-Small' >Zipcode: </span>
                                {zipcode}
                            </li>
                            <li>
                                <span className='md:text-Body-SM-Medium text-Body-SM-Small' >Street: </span>
                                {street}
                            </li>
                            <li>
                                <span className='md:text-Body-SM-Medium text-Body-SM-Small' >UnparsedAddress: </span>
                                {unparsedAddress}
                            </li>
                            <li>
                                <span className='md:text-Body-SM-Medium text-Body-SM-Small' >Latitude : </span>
                                {coordinates.Latitude}
                            </li>
                            <li>
                                <span className='md:text-Body-SM-Medium text-Body-SM-Small' >Longitude : </span>
                                {coordinates.Longitude}
                            </li>
                        </ul>
                    </div>
                    <div>
                        <p className='md:text-Body-SM-Large text-Body-SM-Medium mb-1' >Facts Features</p>
                        <p className='md:text-Body-RL-Medium text-Body-RL-Small'>{F_description}</p>
                        <ul className='md:text-Body-RL-Medium text-Body-RL-Small mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-3'>
                            {
                              outdoor_details &&  <li>
                                    <span className='md:text-Body-SM-Medium text-Body-SM-Small' >Outdoor Details : </span>
                                    <ul className='list-disc pl-6'>
                                        {
                                            outdoor_details.map((fe : string , index : number) => <li key={index} >{fe}</li>)
                                        }
                                    </ul>
                            </li>
                            }
                            {
                              interior_details &&  <li>
                                    <span className='md:text-Body-SM-Medium text-Body-SM-Small' >Interior Details : </span>
                                    <ul className='list-disc pl-6'>
                                        {
                                            interior_details.map((fe : string , index : number) => <li key={index} >{fe}</li>)
                                        }
                                    </ul>
                            </li>
                            }
                            {
                              utilities_central &&  <li>
                                    <span className='md:text-Body-SM-Medium text-Body-SM-Small' >Utilities Central : </span>
                                    <ul className='list-disc pl-6'>
                                        {
                                            utilities_central.map((fe : string , index : number) => <li key={index} >{fe}</li>)
                                        }
                                    </ul>
                            </li>
                            }
                            {
                              other &&  <li>
                                    <span className='md:text-Body-SM-Medium text-Body-SM-Small' >Others : </span>
                                    <ul className='list-disc pl-6'>
                                        {
                                            other.map((fe : string , index : number) => <li key={index} >{fe}</li>)
                                        }
                                    </ul>
                            </li>
                            }
                        </ul>
                    </div>
                    <div>
                        <p className='md:text-Body-SM-Large text-Body-SM-Medium mb-1' >More Detils</p>
                        <ul className='md:text-Body-RL-Medium text-Body-RL-Small grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-3'>
                            <li>
                                <span className='md:text-Body-SM-Medium text-Body-SM-Small' >Published: </span>
                                {published ? "Yes" : "No"}
                            </li>
                            {
                                published && <li>
                                    <span className='md:text-Body-SM-Medium text-Body-SM-Small' >Published by: </span>
                                    {PublishedBY?.email}
                                </li>
                            }
                             <li>
                                <span className='md:text-Body-SM-Medium text-Body-SM-Small' >CreatedAt: </span>
                                {createdAt.toLocaleDateString()}
                            </li>
                            {
                                updatedAt &&  <li>
                                    <span className='md:text-Body-SM-Medium text-Body-SM-Small' >UpdatedAt: </span>
                                    {updatedAt.toLocaleDateString()}
                                </li>
                            }
                            {
                                agent &&  <li>
                                    <span className='md:text-Body-SM-Medium text-Body-SM-Small' >Agents : </span>
                                    <ul className='list-disc pl-6'>
                                        {
                                            agent.map((ag : Agent_Interface ) => <li key={ag._id} >
                                                <Link href={`/agents/${ag._id}`}>{ag.name} {ag.last_name}</Link>
                                            </li>)
                                        }
                                    </ul>
                            </li>
                            }
                            {
                                tags &&  <li>
                                    <span className='md:text-Body-SM-Medium text-Body-SM-Small' >Tags : </span>
                                    <ul className='list-disc pl-6'>
                                        {
                                            tags.map((fe : string , index : number) => <li key={index} >{fe}</li>)
                                        }
                                    </ul>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <div className='mt-8 py-4 border-t border-primary-100 flex items-center justify-center'>
                {userIsAdmin && <PublishProprety id={_id} />}
            </div>
        </div>
    );
};

export default PropertyDashboardDetails;