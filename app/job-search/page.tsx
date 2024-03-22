import { Suspense } from "react";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

import FilterSidebar from "@/components/FilterSidebar";
import { Skeleton } from "@/components/ui/skeleton";
import PageSelection from "@/components/PageSelection";
import SearchBar from "@/components/SearchBar";
import FetchJobSearchCard from "@/components/FetchJobSearchCard";

export default function JobSearch({
  searchParams,
}: {
  searchParams: {
    page: string;
    employment_types: string;
    date_posted: string;
    job_requirements: string[];
    remote: boolean;
    query: string;
  };
}) {
  return (
    <div className="mx-auto max-w-[1440px] px-6 pb-8 pt-[50px] xl:px-20">
      <h1 className="md:bold-32 bold-22 mb-1 text-Black dark:text-white sm:mb-3">
        {`Let's find your dream job`}
      </h1>
      <h2 className="mb-[30px] text-base font-medium leading-6 text-Natural6 sm:text-[20px] sm:leading-8">
        {moment().format("dddd, DD MMM YYYY")}
      </h2>
      <SearchBar />
      <main className="mt-[59px] flex gap-x-[79px]">
        <FilterSidebar />
        <div className="w-full">
          <Suspense fallback={<SearchResultsLoader />} key={uuidv4()}>
            <FetchJobSearchCard searchParams={searchParams} />
          </Suspense>
          <div className="mt-9 border-t border-Natural2 pt-5 dark:border-DarkBG3">
            <PageSelection />
          </div>
        </div>
      </main>
    </div>
  );
}

const SearchResultsLoader = () => {
  const numberOfSkeletons = 10;
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: numberOfSkeletons }).map((_) => (
        <div
          key={uuidv4()}
          className="flex h-[302px] w-full flex-col gap-5 rounded-[10px]"
        >
          <div className="flex gap-5">
            <Skeleton className="size-16" />
            <div className="flex flex-col gap-[0.375rem]">
              {Array.from({ length: 2 }).map((_) => (
                <Skeleton key={uuidv4()} className="h-6 w-[25rem]" />
              ))}
            </div>
          </div>
          {Array.from({ length: 3 }).map((_) => (
            <Skeleton key={uuidv4()} className="h-6 w-[55rem]" />
          ))}
          <div className="flex gap-[0.3125rem]">
            {Array.from({ length: 4 }).map((_) => (
              <Skeleton key={uuidv4()} className="h-7 w-12" />
            ))}
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-6 w-[9.5rem]" />
            <div className="flex gap-5">
              {Array.from({ length: 2 }).map((_) => (
                <Skeleton key={uuidv4()} className="h-12 w-[11.25rem]" />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
