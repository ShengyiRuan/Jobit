import Link from "next/link";
import moment from "moment";

import { getSimilarJobs } from "@/lib/jsearch";
import { formatLocation } from "@/lib/utils";
import CompanyLogo from "./CompanyLogo";
import { FormatSalaryRange } from "./FormatSalaryRage";
import { cookies } from "next/headers";

const SimilarJobs = async ({ job }: { job: JobResult }) => {
  const cookieStore = cookies();
  const locationCookie = cookieStore.get("location")?.value;
  const { job_title: title, job_job_title: jTitle } = job;
  const jobTitle = title || jTitle;

  const similarJobs = await getSimilarJobs(jobTitle, locationCookie);

  const filteredJobs: JobResult[] =
    similarJobs?.data &&
    similarJobs?.data.filter((d: JobResult) => d?.job_id !== job?.job_id);

  return (
    <>
      {filteredJobs && filteredJobs.length > 0 ? (
        <div className="flex w-full flex-col sm:mt-8 xl:max-w-sm">
          <p className="body-l-bold dark:text-white">Similar Jobs</p>
          <div className="mt-6 flex w-full flex-col gap-4">
            {filteredJobs?.map((listedJob) => (
              <article
                key={listedJob?.job_id}
                className="flex flex-col gap-6 rounded-[0.625rem] bg-white p-4 dark:bg-DarkBG2"
              >
                <div className="flex">
                  <div className="flex gap-2">
                    <div className="relative inline-flex size-[48px] shrink-0">
                      <CompanyLogo
                        companyName={listedJob?.employer_name}
                        companyLogo={listedJob?.employer_logo}
                        jobId={listedJob?.job_id}
                      />
                    </div>
                    <div>
                      <h3 className="bold-16 line-clamp-1 dark:text-white">
                        {jobTitle}
                      </h3>
                      <p className="regular-14 text-Natural6">
                        {formatLocation(
                          listedJob?.job_city,
                          listedJob?.job_state,
                          listedJob?.job_country,
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="ml-auto text-sm text-Natural6">
                    <span className="text-black dark:text-white">
                      {listedJob?.job_min_salary &&
                      listedJob?.job_min_salary &&
                      listedJob?.job_salary_period ? (
                        FormatSalaryRange(
                          listedJob?.job_min_salary,
                          listedJob?.job_min_salary,
                          listedJob?.job_salary_period,
                          "recommendedJobCard",
                        )
                      ) : (
                        <span className="ml-2 line-clamp-1 text-sm font-medium not-italic text-Natural7 dark:text-White">
                          -
                        </span>
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="medium-14 capitalize text-Natural6">
                    {moment(
                      new Date(listedJob?.job_posted_at_timestamp * 1000),
                    ).fromNow()}
                  </p>
                  <div className="flex items-center gap-5">
                    <Link
                      className="hover-effect rounded-[0.4375rem] bg-Primary/10 px-[0.875rem] py-2 text-Primary"
                      href={`/job-details/${listedJob?.job_id}`}
                    >
                      View
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default SimilarJobs;
