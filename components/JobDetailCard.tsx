import Image from "next/image";
import Link from "next/link";
import moment from "moment";

import { formatLocation } from "@/lib/utils";
import { getAboutTheCompany } from "@/lib/jsearch";
import CompanyLogo from "./CompanyLogo";
import JobDescription from "./JobDescription";
import BackButton from "./BackButton";

const JobDetailCard = async ({ job }: { job: JobResult }) => {
  const currencyType = job.job_salary_currency;
  const salaryPeriod = job.job_salary_period;
  const maxSalary = job.job_max_salary;
  const minSalary = job.job_min_salary;
  const employerName = job.employer_name;

  const companyInfo = employerName
    ? await getAboutTheCompany(employerName)
    : { description: null };

  const formatSalary = (salary: number | null) => {
    return salary && salary >= 1000
      ? `${salary / 1000}k`
      : salary?.toString() || "";
  };

  const salaryInformation =
    currencyType && salaryPeriod
      ? minSalary && maxSalary
        ? `${currencyType}${formatSalary(minSalary)} - ${formatSalary(
            maxSalary,
          )} / ${salaryPeriod}`
        : `${currencyType}${formatSalary(
            minSalary || maxSalary,
          )} / ${salaryPeriod}`
      : null;

  const { required_experience_in_months: requiredExperienceInMonths } =
    job?.job_required_experience as JobRequiredExperienceType;

  let requiredExperience: string | null | 0 =
    requiredExperienceInMonths &&
    `Minimum ${requiredExperienceInMonths} months`;
  if (requiredExperienceInMonths && requiredExperienceInMonths >= 12) {
    requiredExperience = `Minimum ${Math.floor(
      requiredExperienceInMonths / 12,
    )} years`;
  }

  return (
    <div className="mt-8 w-full">
      <BackButton />
      <div className="mt-4 flex flex-col gap-6 rounded-[0.625rem] bg-white p-6 dark:bg-DarkBG2">
        <div className="w-full">
          <section>
            <div className="relative h-48 w-full">
              <Image
                quality={100}
                priority
                src="/iconography/job-detail.svg"
                alt="background"
                className="rounded-t-xl object-cover object-left"
                fill
              />
            </div>

            <div className="z-10 mx-4 mt-[-18px] flex size-[64px] items-center justify-center rounded-lg border-2 border-white bg-white/70 p-4 backdrop-blur-md dark:border-DarkBG2">
              <div className="absolute size-12 overflow-hidden rounded-lg">
                <CompanyLogo
                  companyName={job.employer_name}
                  companyLogo={job.employer_logo}
                  jobId={job.job_id}
                />
              </div>
            </div>
          </section>
          <section className="mt-[0.875rem] flex w-full items-center justify-between sm:mt-[1.875rem] lg:mt-[1.935rem]">
            <div className="flex-1">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 max-sm:justify-between sm:flex-1">
                  <div className="semibold-16 sm:bold-24 dark:text-white max-sm:flex-1">
                    {job.job_title}
                  </div>
                </div>
                <div className="flex gap-[0.9375rem] max-sm:hidden">
                  {job.job_apply_link && (
                    <Link
                      className="hover-effect semibold-15 inline-flex h-11 w-[7.4375rem] justify-center rounded-[0.625rem] bg-Primary px-[0.875rem] py-[0.625rem] text-white"
                      href={job.job_apply_link}
                      target="_blank"
                    >
                      Apply Now
                    </Link>
                  )}
                </div>
              </div>

              <div className="medium-13 sm:semibold-16 gap-1 text-Natural7 sm:flex">
                <p>
                  <Link
                    className="hover-effect hover:underline"
                    href={`/company-details/${job.job_id}`}
                  >
                    {job.employer_name}
                  </Link>
                  {(job.job_city || job.job_country) && (
                    <span className="max-sm:hidden">{" \u2022"}</span>
                  )}
                </p>
                <div className="flex gap-1">
                  <div>
                    {formatLocation(
                      job.job_city,
                      job.job_state,
                      job.job_country,
                    )}
                  </div>
                  {"\u2022"}
                  <div className="capitalize">
                    {moment(
                      new Date(job.job_posted_at_timestamp * 1000),
                    ).fromNow()}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="lg:bold-16 grid grid-cols-2 rounded-[0.625rem] bg-Natural3 dark:bg-[#21212B] md:h-[5.4375rem] md:grid-cols-4 md:items-center md:justify-items-center md:gap-[2.5rem] md:rounded-[1.25rem]">
          <div className="flex min-w-[6.5rem] flex-col gap-y-[0.375rem] p-[.62rem] sm:w-auto">
            <h3 className="text-[.812rem] font-medium leading-5	text-Natural6 md:text-[.875rem] md:font-semibold md:leading-6">
              Experience
            </h3>
            <p className="md:semibold-16 text-[.875rem] text-Natural8 dark:text-white">
              {requiredExperience ?? "N/A"}
            </p>
          </div>
          <div className="flex min-w-[6.5rem] flex-col gap-y-[0.375rem] p-[.62rem] sm:w-auto">
            <h3 className="text-[.812rem] font-medium leading-5	text-Natural6 md:text-[.875rem] lg:font-semibold lg:leading-6">
              Remote
            </h3>
            <p className="md:semibold-16 text-[.875rem] text-Natural8 dark:text-white">
              {job.job_is_remote ? "Yes" : "No"}
            </p>
          </div>
          <div className="flex min-w-[6.5rem] flex-col gap-y-[0.375rem] border-t border-Natural5 p-[.62rem] dark:border-DarkBG2 sm:w-auto lg:border-none">
            <h3 className="text-[.812rem] font-medium leading-5	text-Natural6 md:text-[.875rem] md:font-semibold md:leading-6">
              Employee Type
            </h3>
            <p className="md:semibold-16 text-[.875rem] capitalize text-Natural8 dark:text-white">
              {job.job_employment_type.toLowerCase() ?? "N/A"}
            </p>
          </div>
          <div className="flex min-w-[6.5rem] flex-col gap-y-[0.375rem] border-t border-Natural5 p-[.62rem] dark:border-DarkBG2 sm:w-auto lg:border-none">
            <h3 className="text-[.812rem] font-medium leading-5	text-Natural6 md:text-[.875rem] md:font-semibold md:leading-6">
              Offer Salary
            </h3>

            <p className="md:semibold-16 text-[.875rem] text-Natural8 dark:text-white">
              {salaryInformation ?? "N/A"}
            </p>
          </div>
        </div>

        <div className="flex w-full items-center gap-[0.9375rem] max-sm:justify-start sm:hidden">
          {job.job_apply_link && (
            <Link
              className="hover-effect semibold-15 inline-flex h-11 w-full justify-center rounded-[0.625rem] bg-Primary px-[0.875rem] py-[0.625rem] text-white"
              href={job.job_apply_link}
              target="_blank"
            >
              Apply Now
            </Link>
          )}
        </div>

        <JobDescription job={job} />

        <section className="dark:text-white">
          <div className="border-t border-Natural2 pb-5 pt-[1.875rem] text-lg font-bold dark:border-t-DarkBG3 dark:text-white lg:flex-1">
            About the company
          </div>
          <div className="flex flex-col gap-4 pb-3 sm:flex-row sm:justify-between">
            <div className="flex flex-1 flex-col gap-6">
              <div className="flex h-14 items-center gap-4">
                <div className="relative size-[50px]">
                  <CompanyLogo
                    companyName={job.employer_name}
                    companyLogo={job.employer_logo}
                    jobId={job.job_id}
                  />
                </div>
                <Link
                  href={`/company-details/${job.job_id}`}
                  className="bold-18 hover:underline dark:text-white"
                >
                  {job.employer_name}
                </Link>
              </div>
              <p className="regular-16 text-Natural7 dark:text-Natural5">
                {companyInfo?.description}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default JobDetailCard;
