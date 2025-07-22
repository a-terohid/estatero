'use client'

import { BlogsSearchParams_interface } from "@/types/StatesTypes";
import { isValidSort } from "@/utils/filter";
import { useRouter, useSearchParams } from "next/navigation";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import INPUT from "../INPUT";
import Link from "next/link";

const BlogsDahsboardFilterSection = ({ PATH , authors }: { PATH: string  , authors: any}) => {

    const searchParams = useSearchParams();
    const router = useRouter();

    // Extract query parameters from the URL
    const initialSort = searchParams.get("sort");
    const initialetitle = searchParams.get("title");
    const initialPublished = searchParams.get("published")
    const initialautor_id = searchParams.get("autor_id")

    const initialFilter :  BlogsSearchParams_interface = {
        sort : isValidSort(initialSort) ? initialSort : "sort",
        title : initialetitle || "",
        published : initialPublished || "",
        autor_id : initialautor_id || "",
    }

    const [filter, setFilter] = useState<BlogsSearchParams_interface>(initialFilter);

    const {sort , title , published , autor_id} = filter

    // Get initial start and end date from query parameters
    const startDateParam = searchParams.get("startDate");
    const endDateParam = searchParams.get("endDate");

    // Set initial date picker value if both dates are present
    const initialDateValue =
        startDateParam && endDateParam
        ? [
            new DateObject({ date: new Date(startDateParam) }),
            new DateObject({ date: new Date(endDateParam) }),
            ]
        : undefined;

    const [dateValue, setDateValue] = useState<DateObject[] | undefined>(initialDateValue);

    // Handle changes in dropdown inputs
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFilter((prev) => ({ ...prev, [name]: value }));
    };

    // Converts selected dates into query-friendly ISO format
    const getDateQuery = () => {
        if (!dateValue) return {};

        const convertStart = (val: DateObject) => val.toDate().toISOString();
        const convertEnd = (val: DateObject) => {
        const end = val.toDate();
        end.setHours(23, 59, 59, 999); // Include the full end day
        return end.toISOString();
        };

        if (Array.isArray(dateValue)) {
        const [from, to] = dateValue;

        if (from && to) {
            return {
            startDate: convertStart(from),
            endDate: convertEnd(to),
            };
        }

        if (from && !to) {
            return {
            startDate: convertStart(from),
            endDate: convertEnd(from),
            };
        }

        return {};
        }

        return {
        startDate: convertStart(dateValue),
        endDate: convertEnd(dateValue),
        };
    };

    const dateQuery = getDateQuery();

    return (
        <div className="mb-8 ">
      <h4 className="mb-4 text-Body-SM-Medium">Filter:</h4>
      <div className="flex items-center gap-x-3 overflow-scroll pb-3">
        {/* Sort Dropdown */}
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
            <TiArrowSortedDown/>
          </div>
        </div>

        <INPUT
            label=""
            type="title"
            name="title"
            value={title ||''}
            placeholder="Title"
            changeHandler={changeHandler}
            textarea={false}
            error={""}
            style={"!px-3 !py-2 !min-w-52"}
        />

        <div className="relative inline-block">
            <select
                name="published"
                value={published}
                onChange={changeHandler}
                className="appearance-none w-fit lg:text-Body-RL-Small bg-Neutral px-3 py-2 pr-8 border border-Greyscale-100 rounded-lg focus:text-Greyscale-900 focus:border-Greyscale-900 focus:outline-none text-Body-RL-XSmall"
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
                name="autor_id"
                value={autor_id}
                onChange={changeHandler}
                className="appearance-none w-fit lg:text-Body-RL-Small bg-Neutral px-3 py-2 pr-8 border border-Greyscale-100 rounded-lg focus:text-Greyscale-900 focus:border-Greyscale-900 focus:outline-none text-Body-RL-XSmall"
            >
                <option value="Autor">Autor</option>
                {
                    authors?.map( (au:any) => <option key={au._id} value={au._id}>{au.name} {au.last_name}</option> )
                }
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-Greyscale-300">
                <TiArrowSortedDown />
            </div>
        </div>

        {/* Date Picker */}
        <DatePicker
          value={dateValue}
          onChange={setDateValue}
          range
          placeholder="Select Date or Range"
          inputClass="date-picker-input"
        />

        {/* Action Buttons */}
        <div className="flex items-center gap-x-2">
          {/* Apply Filters Button */}
          <Link
            href={{
              pathname: PATH,
              query: {
                sort: sort !== "sort" ? sort : undefined,
                title : title,
                published : published,
                autor_id : autor_id,
                ...dateQuery,
              },
            }}
            className="bg-primary-100 text-white w-fit text-Body-RL-XSmall lg:text-Body-RL-Small px-3 py-2 rounded-lg cursor-pointer"
          >
            Set
          </Link>

          {/* Reset Filters Button */}
          <button
            onClick={() => {
              setFilter({ 
                sort: "sort",
                title :  "",
                published :  "",
                autor_id : "",
              });
              setDateValue(undefined);
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

export default BlogsDahsboardFilterSection;