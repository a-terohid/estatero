import { Property_Interface } from '@/types/modelTypes';
import React from 'react';
import ImageWithFallback from '../ImageWithFallback';
import { LuBed, LuMapPin} from 'react-icons/lu';
import { LuSquare } from "react-icons/lu";
import { PiBathtub } from "react-icons/pi";
import { formatPriceWithSlash } from '@/utils/price';
import Link from 'next/link';
import slugify from 'slugify';


const PropertyCard = ({property}: {property:Property_Interface}) => {

    const { thumbnail , description , title , Location , bedrooms , bathrooms , area , property_size_unit ,price ,property_type , _id } = property

    const isRental : boolean = property_type.includes("Lease")

    const slug = slugify(`${_id}-${title}-${Location.unparsedAddress}-${bedrooms}bedrooms-${bathrooms}bathrooms-${property_type}-${area}${property_size_unit}`,{ lower: true, strict: true })

    return (
        <div className='p-2 border border-Greyscale-100 rounded-2xl '>
            <div className=' relative'>
                <Link href={`/property/${slug}`} className='hover:grayscale-[0.5]'>
                    <ImageWithFallback src={thumbnail || ""} alt={description} type='thumbnail' style='w-full !rounded-2xl' />
                </Link>
                <p className='py-1 px-2 rounded-full bg-primary-50 top-2 left-2 w-fit absolute text-Body-RL-XSmall hover:bg-primary-25 '>{property_type}</p>
            </div>
            <div className='pt-4 px-2'>
                <h3 className='text-Heading-6 md:text-Heading-5' >{title}</h3>
                <p className='flex items-start gap-x-2 text-Body-RL-Small mt-2 mb-3'>
                    <span className='text-lg'><LuMapPin /></span>
                    {Location.unparsedAddress}
                </p>
                <ul className='flex items-center gap-x-2 text-Body-MD-XSmall md:text-Body-MD-Small mb-2'>
                    <li className=' flex gap-x-1 w-fit items-center py-1 px-2  rounded-md border border-Greyscale-100'>
                        <span className='text-lg'><LuBed /></span>
                        <span>{bedrooms} Beds</span>
                    </li>
                    <li className=' flex gap-x-1 w-fit items-center py-1 px-2  rounded-md border border-Greyscale-100'>
                        <span className='text-lg'><PiBathtub /></span>
                        <span>{bathrooms} Baths</span>
                    </li>
                    <li className=' flex gap-x-1 w-fit items-center py-1 px-2  rounded-md border border-Greyscale-100'>
                        <span className='text-lg'><LuSquare /></span>
                        <span>{formatPriceWithSlash(area)} {property_size_unit}</span>
                    </li>
                </ul>
                <div className=' bg-Greyscale-100 h-[1px] rounded-full mb-2'></div>
                <p className='text-Success-300 text-Heading-6 md:text-Heading-5'>${formatPriceWithSlash(price)}{ isRental && "/Months"}</p>
            </div>
        </div>
    );
};

export default PropertyCard;