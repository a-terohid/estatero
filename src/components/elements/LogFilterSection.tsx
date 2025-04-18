"use client";

import { LogsActionFilters } from "@/constants/LogsActionFilterType";
import { LogsFilter_interfasce } from "@/types/StatesTypes";
import Link from "next/link";
import { useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { useRouter, useSearchParams } from "next/navigation";
import { LogsActions } from "@/types/enums/generalEnums";

// Type guard: checks if the sort value is valid
const isValidSort = (val: string | null): val is LogsFilter_interfasce["sort"] =>
  val === "sort" || val === "desc" || val === "asc";

// Type guard: checks if the action value is valid
const isValidAction = (val: string | null): val is LogsFilter_interfasce["action"] =>
  val === "action" || val === "all" || Object.values(LogsActions).includes(val as LogsActions);

const LogFilterSection = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get query parameters from the URL
  const initialSort = searchParams.get("sort");
  const initialAction = searchParams.get("action");

  // Define initial filter values based on query parameters
  const initialFilter: LogsFilter_interfasce = {
    sort: isValidSort(initialSort) ? initialSort : "sort",
    action: isValidAction(initialAction) ? initialAction : "action",
  };

  const [filter, setFilter] = useState<LogsFilter_interfasce>(initialFilter);
  const { sort, action } = filter;

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

  // UI rendering
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
            <TiArrowSortedDown />
          </div>
        </div>

        {/* Action Dropdown */}
        <div className="relative inline-block">
          <select
            name="action"
            value={action}
            onChange={changeHandler}
            className='appearance-none w-fit lg:text-Body-RL-Small px-3 py-2 pr-8 border border-Greyscale-100 rounded-lg focus:text-Greyscale-900 focus:border-Greyscale-900 focus:outline-none text-Body-RL-XSmall'
          >
            <option value="action">Action</option>
            {LogsActionFilters.map((item, index) => (
              <option key={index} value={item.value}>
                {item.name}
              </option>
            ))}
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
              pathname: "/dashboard/logs",
              query: {
                sort: sort !== "sort" ? sort : undefined,
                action: action !== "action" ? action : undefined,
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
              setFilter({ sort: "sort", action: "action" });
              setDateValue(undefined);
              router.push("/dashboard/logs");
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

export default LogFilterSection;