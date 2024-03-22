"use client";

import React, { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Loader2 } from "lucide-react";

import { useAppDispatch } from "@/redux/hooks";
import {
  setEmploymentType,
  setSearchQuery,
} from "@/redux/feature/searchJobs/searchJobs";

const SearchBar = () => {
  const [isPending, setTransition] = useTransition();
  const searchParams = useSearchParams();
  const location = searchParams.get("location");
  const keywords = searchParams.get("keywords");
  const jobType = searchParams.get("employment_types");

  const router = useRouter();
  const dispatch = useAppDispatch();

  const initialFormData = {
    keywords: keywords ?? "",
    location: location ?? "",
    jobType: jobType ?? "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = (formData: typeof initialFormData) => {
    setTransition(() => {
      const queryString = formData.keywords + " in " + formData.location;

      dispatch(setSearchQuery(queryString));
      dispatch(setEmploymentType(formData.jobType));

      formData.jobType
        ? router.push(
            `/job-search?query=${queryString}&employment_types=${formData.jobType}&location=${formData.location}&keywords=${formData.keywords}&page=1`,
          )
        : router.push(`/job-search?query=${queryString}&page=1`);
    });
  };

  return (
    <div className="flex w-full shrink-0 flex-col gap-y-4 rounded-[20px] bg-White p-4 shadow-searchBar dark:bg-DarkBG2 md:h-20 md:flex-row md:items-center">
      <div className="flex h-20 w-full items-center gap-x-[13px] border-b border-Natural2 px-[20px] dark:border-Natural8 md:w-auto md:border-b-0 md:border-r md:pl-5 lg:w-1/3 lg:pr-[99px]">
        <Image
          src="/iconography/outline-search.svg"
          width={28}
          height={28}
          alt="search icon"
        />
        <div className="inline-block h-20">
          <div className="invisible h-0" aria-hidden="true">
            Job Title, Company, or Keywords
          </div>
          <input
            autoComplete="off"
            name="keywords"
            type="text"
            className="bold-14 searchBar-placeholder size-full bg-transparent text-Natural6 outline-none"
            placeholder="Job Title, Company, or Keywords"
            value={formData.keywords}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="flex h-full items-center gap-x-[13px] border-b border-Natural2 px-[20px] py-5 dark:border-Natural8 md:h-20 md:w-auto md:border-b-0 md:border-r lg:w-1/3 lg:px-[20px]">
        <Image
          src="/iconography/outline-pin.svg"
          width={28}
          height={28}
          alt="search icon"
        />
        <div className="block w-full">
          <div className="invisible h-0 " aria-hidden="true">
            Select Location
          </div>
          <input
            name="location"
            onChange={handleInputChange}
            type="text"
            placeholder="Select Location"
            className="searchBar-placeholder bold-14 flex w-full bg-White text-Natural6 outline-none dark:bg-DarkBG2"
            autoComplete="off"
            value={formData.location}
          />
        </div>
      </div>
      <div className="flex h-full items-center gap-x-[13px] border-b border-Natural2 px-[20px] py-5 dark:border-Natural8 md:w-auto md:border-b-0 lg:w-1/6">
        <Image
          src="/iconography/outline-briefcase.svg"
          width={28}
          height={28}
          alt="search icon"
        />
        <div className="xl:semibold-14 semibold-14 lg:bold-14 inline-block text-Natural6">
          <div className="invisible h-0" aria-hidden="true">
            Job Type
          </div>
          <select
            name="jobType"
            className="cursor-pointer bg-transparent outline-none "
            id="jobType"
            value={formData.jobType}
            onChange={handleInputChange}
          >
            <option className="cursor-pointer" value="">
              Job Type
            </option>
            <option className="cursor-pointer" value="FULLTIME">
              Full-Time
            </option>
            <option className="cursor-pointer" value="PARTTIME">
              Part-Time
            </option>
            <option className="cursor-pointer" value="CONTRACTOR">
              Contractor
            </option>
            <option className="cursor-pointer" value="INTERN">
              Intern
            </option>
          </select>
        </div>
      </div>
      <div className="md:ml-5 md:w-auto lg:ml-auto lg:w-1/6 lg:max-w-[105px]">
        <button
          type="submit"
          onClick={() => handleFormSubmit(formData)}
          className="hover-effect inline-flex w-full justify-center whitespace-nowrap rounded-[10px] bg-Primary px-[20px] py-3 text-White"
        >
          {isPending ? (
            <Loader2 className="size-6 animate-spin" />
          ) : (
            "Find Jobs"
          )}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
