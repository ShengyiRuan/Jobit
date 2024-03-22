import { cookies } from "next/headers";

import { fetchJobSearch } from "@/lib/jsearch";
import JobSearchCard from "@/components/JobSearchCard";

const FetchJobSearchCard = async ({
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
}) => {
  const cookieStore = cookies();
  const locationCookie = cookieStore.get("location")?.value;
  const jobSearchResult = await fetchJobSearch(searchParams, locationCookie);
  return (
    <div className="flex flex-col gap-y-[1.875rem] sm:gap-y-[1.375rem]">
      {jobSearchResult?.data &&
        jobSearchResult?.data?.map((job: JobResult) => (
          <JobSearchCard key={job.job_id} job={job} />
        ))}
    </div>
  );
};

export default FetchJobSearchCard;
