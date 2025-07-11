'use client'

import { property_Categories, property_Status, property_TAGS, Property_Types } from "@/types/enums/generalEnums";
import { PropertiesFilter_interfasce } from "@/types/StatesTypes";
import { isValidSort } from "@/utils/filter";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import INPUT from "../INPUT";
import { TiArrowSortedDown } from "react-icons/ti";
import { LuListFilter } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";
import { MdOutlineFilterListOff } from "react-icons/md";
import Link from "next/link";
import { GrPowerReset } from "react-icons/gr";


const ProppertiesPageFilterSection = ({PATH} : {PATH:string}) => {

    const searchParams = useSearchParams();
    const router = useRouter();


    const [ openMore , setOpenMore ] = useState<boolean>(false)

    const propertyTypesOptions = Object.values(Property_Types);
    const propertyCategoryOptions = Object.values(property_Categories);
    const statusOptions = Object.values(property_Status);
    const tagsOptions = Object.values(property_TAGS);

    const initialSort = searchParams.get("sort");
    const initialStatus = searchParams.get("status")
    const initialLocation = searchParams.get("location")
    const initialproperty_type = searchParams.get("property_type")
    const initialproperty_Category = searchParams.get("property_Category")
    const initialMinPrice = searchParams.get("minPrice")
    const initialMaxPrice = searchParams.get("maxPrice")
    const initialMinArea = searchParams.get("minArea")
    const initialMaxArea = searchParams.get("maxArea")
    const initialProperty_size_unit = searchParams.get("property_size_unit")
    const initialbedrooms = searchParams.get("bedrooms")
    const initialbathrooms = searchParams.get("bathrooms")
    const initialparking_spaces = searchParams.get("parking_spaces")
    const initialyear_built = searchParams.get("year_built")
    const initialtags = searchParams.get("tags")


    const initialFilter: PropertiesFilter_interfasce = {
        minPrice : initialMinPrice || "",
        maxPrice: initialMaxPrice || "",
        status : initialStatus || "",
        location : initialLocation || "",
        tags: initialtags || '',
        property_type : initialproperty_type || "",
        property_Category : initialproperty_Category || "",
        year_built : initialyear_built || "",
        parking_spaces : initialparking_spaces || "",
        bathrooms : initialbathrooms || "" ,
        bedrooms : initialbedrooms || ""  ,
        property_size_unit : initialProperty_size_unit || "",
        minArea : initialMinArea || ""  ,
        maxArea : initialMaxArea || ""  ,
    };

    const [filter, setFilter] = useState<PropertiesFilter_interfasce>(initialFilter);

    const {
        status,
        location,
        property_Category,
        property_type,
        minPrice,
        maxPrice,
        minArea,
        maxArea,
        property_size_unit,
        bedrooms,
        bathrooms,
        parking_spaces,
        year_built,
        tags,
    } = filter;

    // Handle input and dropdown changes
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFilter((prev) => ({ ...prev, [name]: value }));
    };

    const OpenHandler = () => setOpenMore( !openMore ) 

    const resetHandler = () => {
        setFilter({
            minPrice : "",
            maxPrice: "",
            status : "",
            location : "",
            tags: '',
            property_type : "",
            property_Category : "",
            year_built : "",
            parking_spaces : "",
            bathrooms : "" ,
            bedrooms : ""  ,
            property_size_unit : "",
            minArea : ""  ,
            maxArea : ""  ,
        });
        router.push(PATH);
    }

    return (
        <div className="bg-Neutral p-2 xl:mx-36 border  border-Greyscale-100 rounded-2xl">
            <div className=" lg:flex lg:gap-x-2 items-center ">
                <div className="flex flex-col lg:flex-1  lg:flex-row lg:gap-y-0 gap-y-2 lg:gap-x-2">
                    <INPUT
                        label=""
                        type="text"
                        name="location"
                        value={location}
                        placeholder="City, Adress, Zip Code"
                        changeHandler={changeHandler}
                        textarea={false}
                        error={""}
                        style={"!px-3 !py-2 lg:!py-3 lg:!min-w-72 !rounded-xl !text-Body-RL-XSmall lg:!text-Body-RL-Small"}
                    />
                    <div className="relative inline-block w-full">
                        <select
                            name="property_type"
                            value={property_type}
                            onChange={changeHandler}
                            className="appearance-none w-full text-Greyscale-300 lg:text-Body-RL-Small px-3 py-2 lg:py-3 pr-8 border border-Greyscale-100 rounded-xl focus:text-Greyscale-900 focus:border-Greyscale-900 focus:outline-none text-Body-RL-XSmall"
                        >
                            <option value="property_type">Property Type</option>
                            {
                                propertyTypesOptions.map( (type) => <option key={type} value={type}>{type}</option> )
                            }
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-Greyscale-300">
                            <TiArrowSortedDown />
                        </div>
                    </div>
                    <div className=" grid grid-cols-2 gap-x-2 w-full">
                        <INPUT
                            label=""
                            type="text"
                            name="minPrice"
                            value={minPrice}
                            placeholder="Min Price"
                            changeHandler={changeHandler}
                            textarea={false}
                            error={""}
                            style={"!px-3 !py-2 lg:!py-3  !rounded-xl !text-Body-RL-XSmall lg:!text-Body-RL-Small"}
                        />
                        <INPUT
                            label=""
                            type="text"
                            name="maxPrice"
                            value={maxPrice}
                            placeholder="Max Price"
                            changeHandler={changeHandler}
                            textarea={false}
                            error={""}
                            style={"!px-3 !py-2 lg:!py-3  !rounded-xl !text-Body-RL-XSmall lg:!text-Body-RL-Small"}
                        />
                    </div>
                    {
                        openMore && <div className="lg:hidden flex flex-col gap-y-2">
                            <div className="relative inline-block w-full">
                                <select
                                    name="property_Category"
                                    value={property_Category}
                                    onChange={changeHandler}
                                    className="appearance-none w-full text-Greyscale-300 lg:text-Body-RL-Small px-3 py-2 lg:py-3 pr-8 border border-Greyscale-100 rounded-xl focus:text-Greyscale-900 focus:border-Greyscale-900 focus:outline-none text-Body-RL-XSmall"
                                >
                                    <option value="property_Category">Property Category</option>
                                    {
                                        propertyCategoryOptions.map( (type) => <option key={type} value={type}>{type}</option> )
                                    }
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-Greyscale-300">
                                    <TiArrowSortedDown />
                                </div>
                            </div>
                            <div className=" grid grid-cols-2 gap-x-2 w-full">
                                <INPUT
                                    label=""
                                    type="text"
                                    name="bedrooms"
                                    value={bedrooms}
                                    placeholder="Bedrooms"
                                    changeHandler={changeHandler}
                                    textarea={false}
                                    error={""}
                                    style={"!px-3 !py-2 lg:!py-3  !rounded-xl !text-Body-RL-XSmall lg:!text-Body-RL-Small"}
                                />
                                <INPUT
                                    label=""
                                    type="text"
                                    name="bathrooms"
                                    value={bathrooms}
                                    placeholder="Bathrooms"
                                    changeHandler={changeHandler}
                                    textarea={false}
                                    error={""}
                                    style={"!px-3 !py-2 lg:!py-3  !rounded-xl !text-Body-RL-XSmall lg:!text-Body-RL-Small"}
                                />
                            </div>
                            <div className=" grid grid-cols-2 gap-x-2 w-full">
                                <INPUT
                                    label=""
                                    type="text"
                                    name="parking_spaces"
                                    value={parking_spaces}
                                    placeholder="Parking Spaces"
                                    changeHandler={changeHandler}
                                    textarea={false}
                                    error={""}
                                    style={"!px-3 !py-2 lg:!py-3  !rounded-xl !text-Body-RL-XSmall lg:!text-Body-RL-Small"}
                                />
                                <INPUT
                                    label=""
                                    type="text"
                                    name="year_built"
                                    value={year_built}
                                    placeholder="Year Built"
                                    changeHandler={changeHandler}
                                    textarea={false}
                                    error={""}
                                    style={"!px-3 !py-2 lg:!py-3  !rounded-xl !text-Body-RL-XSmall lg:!text-Body-RL-Small"}
                                />
                            </div>
                            <div className=" grid grid-cols-2 gap-x-2 w-full">
                                <INPUT
                                    label=""
                                    type="text"
                                    name="minArea"
                                    value={minArea}
                                    placeholder="Min Area"
                                    changeHandler={changeHandler}
                                    textarea={false}
                                    error={""}
                                    style={"!px-3 !py-2 lg:!py-3  !rounded-xl !text-Body-RL-XSmall lg:!text-Body-RL-Small"}
                                />
                                <INPUT
                                    label=""
                                    type="text"
                                    name="maxArea"
                                    value={maxArea}
                                    placeholder="Max Area"
                                    changeHandler={changeHandler}
                                    textarea={false}
                                    error={""}
                                    style={"!px-3 !py-2 lg:!py-3  !rounded-xl !text-Body-RL-XSmall lg:!text-Body-RL-Small"}
                                />
                            </div>
                            <div className="relative inline-block w-full">
                                <select
                                    name="property_size_unit"
                                    value={property_size_unit}
                                    onChange={changeHandler}
                                    className="appearance-none w-full text-Greyscale-300 lg:text-Body-RL-Small px-3 py-2 lg:py-3 pr-8 border border-Greyscale-100 rounded-xl focus:text-Greyscale-900 focus:border-Greyscale-900 focus:outline-none text-Body-RL-XSmall"
                                >
                                    <option value="property_size_unit">Property Size Unit</option>
                                    <option value='sqm'>sqm</option> 
                                    <option value='sqft'>sqft</option> 
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-Greyscale-300">
                                    <TiArrowSortedDown />
                                </div>
                            </div>
                            <div className="relative inline-block w-full">
                                <select
                                    name="tags"
                                    value={tags}
                                    onChange={changeHandler}
                                    className="appearance-none w-full text-Greyscale-300 lg:text-Body-RL-Small px-3 py-2 lg:py-3 pr-8 border border-Greyscale-100 rounded-xl focus:text-Greyscale-900 focus:border-Greyscale-900 focus:outline-none text-Body-RL-XSmall"
                                >
                                    <option value="tags">Tags</option>
                                    {
                                        tagsOptions.map( (type) => <option key={type} value={type}>{type}</option> )
                                    }
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-Greyscale-300">
                                    <TiArrowSortedDown />
                                </div>
                            </div>
                            <div className="relative inline-block w-full">
                                <select
                                    name="status"
                                    value={status}
                                    onChange={changeHandler}
                                    className="appearance-none w-full text-Greyscale-300 lg:text-Body-RL-Small px-3 py-2 lg:py-3 pr-8 border border-Greyscale-100 rounded-xl focus:text-Greyscale-900 focus:border-Greyscale-900 focus:outline-none text-Body-RL-XSmall"
                                >
                                    <option value="status">Status</option>
                                    {
                                        statusOptions.map( (type) => <option key={type} value={type}>{type}</option> )
                                    }
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-Greyscale-300">
                                    <TiArrowSortedDown />
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div className="mt-2 lg:mt-0 flex flex-col lg:flex-row lg:gap-y-0 gap-y-2 lg:gap-x-2">
                    { openMore && <button onClick={resetHandler} className=" lg:hidden flex justify-center items-center gap-x-2 p-3 w-full rounded-xl border border-primary-300 hover:bg-primary-300 hover:text-Neutral">
                                        <span><GrPowerReset /></span>
                                        <span className="text-Body-MD-Small">Reset</span>
                                    </button>}
                    <button onClick={OpenHandler} className=" flex justify-center items-center gap-x-2 p-3 w-full lg:w-fit rounded-xl border border-primary-300 hover:bg-primary-300 hover:text-Neutral">
                        <span>{ openMore ? <MdOutlineFilterListOff /> : <LuListFilter />}</span>
                        <span className="text-Body-MD-Small">Filters</span>
                    </button>
                    <Link 
                    href={{
                            pathname: PATH,
                            query: {
                                minPrice : +minPrice,
                                maxPrice: +maxPrice,
                                status : status,
                                location : location,
                                tags: tags ,
                                property_type : property_type,
                                property_Category : property_Category,
                                year_built : year_built,
                                parking_spaces : +parking_spaces,
                                bathrooms : +bathrooms ,
                                bedrooms : +bedrooms  ,
                                property_size_unit : property_size_unit ,
                                minArea : +minArea  ,
                                maxArea : +maxArea  ,
                            },
                        }}
                    className=" flex justify-center items-center gap-x-2 p-3 w-full lg:w-fit rounded-xl border border-primary-300 bg-primary-300 text-Neutral hover:text-primary-300 hover:bg-neutral-50">
                        <span><IoSearch /></span>
                        <span className="text-Body-MD-Small">Search Now</span>
                    </Link>

                </div>
            </div>
            {
                openMore && <div className="lg:flex hidden lg:mt-2 flex-col gap-y-2">
                    <div className="relative inline-block w-full">
                        <select
                            name="property_Category"
                            value={property_Category}
                            onChange={changeHandler}
                            className="appearance-none w-full text-Greyscale-300 lg:text-Body-RL-Small px-3 py-2 lg:py-3 pr-8 border border-Greyscale-100 rounded-xl focus:text-Greyscale-900 focus:border-Greyscale-900 focus:outline-none text-Body-RL-XSmall"
                        >
                            <option value="property_Category">Property Category</option>
                            {
                                propertyCategoryOptions.map( (type) => <option key={type} value={type}>{type}</option> )
                            }
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-Greyscale-300">
                            <TiArrowSortedDown />
                        </div>
                    </div>
                    <div className=" grid grid-cols-2 gap-x-2 w-full">
                        <INPUT
                            label=""
                            type="text"
                            name="bedrooms"
                            value={bedrooms}
                            placeholder="Bedrooms"
                            changeHandler={changeHandler}
                            textarea={false}
                            error={""}
                            style={"!px-3 !py-2 lg:!py-3  !rounded-xl !text-Body-RL-XSmall lg:!text-Body-RL-Small"}
                        />
                        <INPUT
                            label=""
                            type="text"
                            name="bathrooms"
                            value={bathrooms}
                            placeholder="Bathrooms"
                            changeHandler={changeHandler}
                            textarea={false}
                            error={""}
                            style={"!px-3 !py-2 lg:!py-3  !rounded-xl !text-Body-RL-XSmall lg:!text-Body-RL-Small"}
                        />
                    </div>
                    <div className=" grid grid-cols-2 gap-x-2 w-full">
                        <INPUT
                            label=""
                            type="text"
                            name="parking_spaces"
                            value={parking_spaces}
                            placeholder="Parking Spaces"
                            changeHandler={changeHandler}
                            textarea={false}
                            error={""}
                            style={"!px-3 !py-2 lg:!py-3  !rounded-xl !text-Body-RL-XSmall lg:!text-Body-RL-Small"}
                        />
                        <INPUT
                            label=""
                            type="text"
                            name="year_built"
                            value={year_built}
                            placeholder="Year Built"
                            changeHandler={changeHandler}
                            textarea={false}
                            error={""}
                            style={"!px-3 !py-2 lg:!py-3  !rounded-xl !text-Body-RL-XSmall lg:!text-Body-RL-Small"}
                        />
                    </div>
                    <div className=" grid grid-cols-2 gap-x-2 w-full">
                        <INPUT
                            label=""
                            type="text"
                            name="minArea"
                            value={minArea}
                            placeholder="Min Area"
                            changeHandler={changeHandler}
                            textarea={false}
                            error={""}
                            style={"!px-3 !py-2 lg:!py-3  !rounded-xl !text-Body-RL-XSmall lg:!text-Body-RL-Small"}
                        />
                        <INPUT
                            label=""
                            type="text"
                            name="maxArea"
                            value={maxArea}
                            placeholder="Max Area"
                            changeHandler={changeHandler}
                            textarea={false}
                            error={""}
                            style={"!px-3 !py-2 lg:!py-3  !rounded-xl !text-Body-RL-XSmall lg:!text-Body-RL-Small"}
                        />
                    </div>
                    <div className=" grid grid-cols-3 gap-x-2 w-full">
                        <div className="relative inline-block w-full">
                            <select
                                name="property_size_unit"
                                value={property_size_unit}
                                onChange={changeHandler}
                                className="appearance-none w-full text-Greyscale-300 lg:text-Body-RL-Small px-3 py-2 lg:py-3 pr-8 border border-Greyscale-100 rounded-xl focus:text-Greyscale-900 focus:border-Greyscale-900 focus:outline-none text-Body-RL-XSmall"
                            >
                                <option value="property_size_unit">Property Size Unit</option>
                                <option value='sqm'>sqm</option> 
                                <option value='sqft'>sqft</option> 
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-Greyscale-300">
                                <TiArrowSortedDown />
                            </div>
                        </div>
                        <div className="relative inline-block w-full">
                            <select
                                name="tags"
                                value={tags}
                                onChange={changeHandler}
                                className="appearance-none w-full text-Greyscale-300 lg:text-Body-RL-Small px-3 py-2 lg:py-3 pr-8 border border-Greyscale-100 rounded-xl focus:text-Greyscale-900 focus:border-Greyscale-900 focus:outline-none text-Body-RL-XSmall"
                            >
                                <option value="tags">Tags</option>
                                {
                                    tagsOptions.map( (type) => <option key={type} value={type}>{type}</option> )
                                }
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-Greyscale-300">
                                <TiArrowSortedDown />
                            </div>
                        </div>
                        <div className="relative inline-block w-full">
                            <select
                                name="status"
                                value={status}
                                onChange={changeHandler}
                                className="appearance-none w-full text-Greyscale-300 lg:text-Body-RL-Small px-3 py-2 lg:py-3 pr-8 border border-Greyscale-100 rounded-xl focus:text-Greyscale-900 focus:border-Greyscale-900 focus:outline-none text-Body-RL-XSmall"
                            >
                                <option value="status">Status</option>
                                {
                                    statusOptions.map( (type) => <option key={type} value={type}>{type}</option> )
                                }
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-Greyscale-300">
                                <TiArrowSortedDown />
                            </div>
                        </div>
                    </div>
                    <button onClick={resetHandler} className=" flex justify-center items-center gap-x-2 p-3 w-full rounded-xl border border-primary-300 hover:bg-primary-300 hover:text-Neutral">
                        <span><GrPowerReset /></span>
                        <span className="text-Body-MD-Small">Reset</span>
                    </button>
                </div>
            }
        </div>
    );
};

export default ProppertiesPageFilterSection;