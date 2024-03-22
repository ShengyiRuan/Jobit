import moment from "moment";

import { getJobDetails } from "@/lib/jsearch";
import JobDetailCard from "@/components/JobDetailCard";
import SearchBar from "@/components/SearchBar";
import SimilarJobs from "@/components/SimilarJobCard";

const JobDetails = async ({ params }: { params: { id: string } }) => {
  const currentDate = moment().format("dddd, D MMM YYYY");
  const jobDetails = await getJobDetails(params.id);

  return (
    <div className="mx-auto max-w-[1440px] px-6 pb-8 pt-[50px] xl:px-20">
      <h1 className="md:bold-32 bold-22 mb-1 text-Black dark:text-white sm:mb-3">
        {`Let's find your dream job`}
      </h1>
      <h2 className="mb-[30px] text-base font-medium leading-6 text-Natural6 sm:text-[20px] sm:leading-8">
        {currentDate}
      </h2>
      <SearchBar />
      <main className="w-full">
        <section>
          {jobDetails?.data &&
            jobDetails?.data?.map((job) => (
              <div
                key={job?.job_id}
                className="flex w-full gap-6 max-xl:flex-col"
              >
                <JobDetailCard job={job} />
                <SimilarJobs job={job} />
              </div>
            ))}
        </section>
      </main>
    </div>
  );
};

export default JobDetails;
