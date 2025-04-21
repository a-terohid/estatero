"use client";

import { UserFilter_interfasce } from '@/types/StatesTypes';
import { isValidSort } from '@/utils/filter';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { TiArrowSortedDown } from 'react-icons/ti';
import INPUT from './INPUT';

const UsersFilterSection = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const hasMounted = useRef(false); // Avoid running useEffect on first mount

    // Extract query parameters from the URL
    const initialSort = searchParams.get("sort");
    const initialemail = searchParams.get("email");
    const initialFullName = searchParams.get("fullName");

    // Set initial state based on query parameters
    const initialFilter: UserFilter_interfasce = {
        sort: isValidSort(initialSort) ? initialSort : "sort",
        email: initialemail || "",
        fullName: initialFullName || "",
    };

    const [filter, setFilter] = useState<UserFilter_interfasce>(initialFilter);
    const { sort, email, fullName } = filter;

    // Handle input and dropdown changes
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFilter((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="mb-8">
            <h4 className="mb-4 text-Body-SM-Medium">Filter:</h4>
            <div className="flex items-center gap-x-3 overflow-scroll pb-3">
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
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Email"
                    changeHandler={changeHandler}
                    textarea={false}
                    error={""}
                    style={"!px-3 !py-2"}
                />

                {/* Full name filter input */}
                <INPUT
                    label=""
                    type="text"
                    name="fullName"
                    value={fullName}
                    placeholder="Name"
                    changeHandler={changeHandler}
                    textarea={false}
                    error={""}
                    style={"!px-3 !py-2"}
                />

                {/* Action buttons */}
                <div className="flex items-center gap-x-2">
                    {/* Apply filters button */}
                    <Link
                        href={{
                            pathname: "/dashboard/users",
                            query: {
                                sort: sort !== "sort" ? sort : undefined,
                                email: email,
                                fullName: fullName,
                            },
                        }}
                        className="bg-primary-100 text-white w-fit text-Body-RL-XSmall lg:text-Body-RL-Small px-3 py-2 rounded-lg cursor-pointer"
                    >
                        Set
                    </Link>

                    {/* Reset filters button */}
                    <button
                        onClick={() => {
                            setFilter({ sort: "sort", email: "", fullName: "" });
                            router.push("/dashboard/users");
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

export default UsersFilterSection;