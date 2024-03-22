"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Image from "next/image";

import { Button } from "./ui/button";

const CompanyDetailSearch = ({ jobId }: { jobId: string }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    startTransition(() => {
      router.push(`/company-details/${jobId}?query=${query}`);
    });
  };

  return (
    <div className="relative md:w-[28.75rem]">
      <span className="absolute left-[0.625rem] top-1/2 translate-y-[-50%] lg:left-[1.12rem]">
        <Image
          className="flex lg:size-[24px]"
          src="/iconography/outline-search.svg"
          alt="Search icon"
          width={18}
          height={18}
        />
      </span>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="h-11 w-full rounded-2xl border-0 bg-Natural3 px-[0.625rem] py-2 pl-[2.185rem] text-[0.8125rem] font-medium not-italic leading-[1.125rem] text-Natural6 focus:outline-none focus:ring-1 focus:ring-Primary dark:bg-DarkBG3 lg:h-[3.625rem] lg:pl-[3.62rem] lg:text-[0.875rem]
              lg:font-semibold lg:leading-6"
        type="text"
        placeholder="Search Job title or Keyword"
      />

      <Button
        onClick={handleSearch}
        disabled={isPending}
        className={`hover-effect absolute inset-y-0 right-[0.62rem] top-2 flex h-[1.75rem] w-[4.5rem] items-center justify-center rounded-[0.625rem] bg-Primary px-[0.88rem]
                py-1 text-[0.8125rem] font-semibold leading-5 text-White dark:bg-Primary dark:text-White lg:right-[1.12rem] lg:h-[2.625rem]
                lg:w-[4.9375rem] lg:px-[0.88rem] lg:py-[0.56rem] lg:text-[0.9375rem] lg:leading-6`}
      >
        {isPending ? <Loader2 className="size-5 animate-spin" /> : "Search"}
      </Button>
    </div>
  );
};

export default CompanyDetailSearch;
