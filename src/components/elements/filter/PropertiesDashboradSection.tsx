'use client'

import { PropertiesDashboardFilter_interfasce } from "@/types/StatesTypes";
import { isValidSort } from "@/utils/filter";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import INPUT from "../INPUT";
import { property_Categories, property_Status, Property_Types } from "@/types/enums/generalEnums";
import { Agent_Interface } from "@/types/modelTypes";
import Link from "next/link";

const PropertiesDashboradSection = ({PATH , agents} : {PATH:string , agents :any}) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const hasMounted = useRef(false); // Avoid running useEffect on first mount


    const propertyTypesOptions = Object.values(Property_Types);
    const propertyCategoryOptions = Object.values(property_Categories);
    const statusOptions = Object.values(property_Status);

    // Extract query parameters from the URL
    const initialSort = searchParams.get("sort");
    const initialeId = searchParams.get("Id");
    const initialAgent = searchParams.get("agent");
    const initialStatus = searchParams.get("status")
    const initialLocation = searchParams.get("location")
    const initialPublished = searchParams.get("published")
    const initialproperty_type = searchParams.get("property_type")
    const initialproperty_Category = searchParams.get("property_Category")
    const initialtext_search = searchParams.get("text_search")

    // Set initial state based on query parameters
    const initialFilter: PropertiesDashboardFilter_interfasce = {
        sort: isValidSort(initialSort) ? initialSort : "sort",
        id: initialeId || "",
        agent: initialAgent || "",
        status : initialStatus || "",
        location : initialLocation || "",
        published: initialPublished || "",
        property_type : initialproperty_type || "",
        property_Category : initialproperty_Category || "",
        text_search : initialtext_search || ""
    };

    const [filter, setFilter] = useState<PropertiesDashboardFilter_interfasce>(initialFilter);
    const { sort, id, agent , status , location , published , property_Category , property_type , text_search } = filter;

    // Handle input and dropdown changes
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFilter((prev) => ({ ...prev, [name]: value }));
    };


    return (
        <div className="mb-8">
            <h4 className="mb-4 text-Body-SM-Medium">Filter:</h4>
            <div className="flex items-center gap-x-3 overflow-scroll pb-3 flex-wrap gap-y-3">
                {/* Sort dropdown */}
                <div className="relative inline-block">
                    <select
                        name="sort"
                        value={sort}
                        onChange={changeHandler}
                        className="appearance-none w-fit lg:text-Body-RL-Small px-3 py-2 pr-8 border border-Greyscale-100 rounded-lg focus:text-Greyscale-900 focus:border-Greyscale-900 focus:outline-none text-Body-RL-XSmall"
                    >
                        <option value="sort">Sort</option>
                        <option value="desc">Newest</option>
                        <option value="asc">Oldest</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-Greyscale-300">
                        <TiArrowSortedDown />
                    </div>
                </div>

                {/* Email filter input */}
                <INPUT
                    label=""
                    type="text"
                    name="id"
                    value={id}
                    placeholder="Id"
                    changeHandler={changeHandler}
                    textarea={false}
                    error={""}
                    style={"!px-3 !py-2 !min-w-52"}
                />

                <div className="relative inline-block">
                    <select
                        name="agent"
                        value={agent}
                        onChange={changeHandler}
                        className="appearance-none w-fit lg:text-Body-RL-Small px-3 py-2 pr-8 border border-Greyscale-100 rounded-lg focus:text-Greyscale-900 focus:border-Greyscale-900 focus:outline-none text-Body-RL-XSmall"
                    >
                        <option value="agents">Agents</option>
                        {
                            agents.length && agents.map( (ag : Agent_Interface) => <option value={`${ag.name} ${ag.last_name}`} key={ag._id}>{`${ag.name} ${ag.last_name}`}</option> )
                        }
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-Greyscale-300">
                        <TiArrowSortedDown />
                    </div>
                </div>

                <div className="relative inline-block">
                    <select
                        name="status"
                        value={status}
                        onChange={changeHandler}
                        className="appearance-none w-fit lg:text-Body-RL-Small px-3 py-2 pr-8 border border-Greyscale-100 rounded-lg focus:text-Greyscale-900 focus:border-Greyscale-900 focus:outline-none text-Body-RL-XSmall"
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
                <INPUT
                    label=""
                    type="text"
                    name="location"
                    value={location}
                    placeholder="Location"
                    changeHandler={changeHandler}
                    textarea={false}
                    error={""}
                    style={"!px-3 !py-2 !min-w-52"}
                />

                 <div className="relative inline-block">
                    <select
                        name="agent"
                        value={agent}
                        onChange={changeHandler}
                        className="appearance-none w-fit lg:text-Body-RL-Small px-3 py-2 pr-8 border border-Greyscale-100 rounded-lg focus:text-Greyscale-900 focus:border-Greyscale-900 focus:outline-none text-Body-RL-XSmall"
                    >
                        <option value="published">Published</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-Greyscale-300">
                        <TiArrowSortedDown />
                    </div>
                </div>
                <div className="relative inline-block">
                    <select
                        name="property_type"
                        value={property_type}
                        onChange={changeHandler}
                        className="appearance-none w-fit lg:text-Body-RL-Small px-3 py-2 pr-8 border border-Greyscale-100 rounded-lg focus:text-Greyscale-900 focus:border-Greyscale-900 focus:outline-none text-Body-RL-XSmall"
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
                <div className="relative inline-block">
                    <select
                        name="property_Category"
                        value={property_Category}
                        onChange={changeHandler}
                        className="appearance-none w-fit lg:text-Body-RL-Small px-3 py-2 pr-8 border border-Greyscale-100 rounded-lg focus:text-Greyscale-900 focus:border-Greyscale-900 focus:outline-none text-Body-RL-XSmall"
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

                <INPUT
                    label=""
                    type="text"
                    name="text_search"
                    value={text_search}
                    placeholder="Text Search"
                    changeHandler={changeHandler}
                    textarea={false}
                    error={""}
                    style={"!px-3 !py-2 !min-w-52"}
                />

                {/* Action buttons */}
                <div className="flex items-center gap-x-2">
                    {/* Apply filters button */}
                    <Link
                        href={{
                            pathname: PATH,
                            query: {
                                sort: sort !== "sort" ? sort : undefined,
                                id: id,
                                agent: agent,
                                status : status,
                                location : location,
                                published: published,
                                property_type :  property_type,
                                property_Category : property_Category,
                                text_search : text_search
                            },
                        }}
                        className="bg-primary-100 text-white w-fit text-Body-RL-XSmall lg:text-Body-RL-Small px-3 py-2 rounded-lg cursor-pointer"
                    >
                        Set
                    </Link>

                    {/* Reset filters button */}
                    <button
                        onClick={() => {
                            setFilter({ sort: "sort", 
                                        id: "",
                                        agent: "",
                                        status : "",
                                        location :  "",
                                        published: "",
                                        property_type :  "",
                                        property_Category :  "",
                                        text_search :  "" 
                                    });
                            router.push(PATH);
                        }}
                        className="bg-primary-100 text-white w-fit text-Body-RL-XSmall lg:text-Body-RL-Small px-3 py-2 rounded-lg cursor-pointer"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PropertiesDashboradSection;