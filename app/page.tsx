import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import { cookies } from "next/headers";

import JobCard from "@/components/JobCard";
import RecommendedJobCard from "@/components/RecommendedJobCard";
import {
  getFeaturedCompanies,
  getLatestJobs,
  getRecommendedJobs,
} from "@/lib/jsearch";
import { extractRequiredSkills } from "@/lib/jobRequiredSkills";
import FeaturedCompany from "@/components/FeaturedCompany";

export default async function Home() {
  const cookieStore = cookies();
  const locationCookie = cookieStore.get("location")?.value;
  const currentDate = moment().format("dddd, D MMM YYYY");
  const latestJobData: Promise<Job> = getLatestJobs(locationCookie);
  const recommendedJobData: Promise<Job> = getRecommendedJobs(locationCookie);
  const featuredCompaniesData: Promise<Job> =
    getFeaturedCompanies(locationCookie);

  const [latestJobs, recommendedJobs, featuredCompanies] = await Promise.all([
    latestJobData,
    recommendedJobData,
    featuredCompaniesData,
  ]);

  const sortedFeaturedCompanies = featuredCompanies.data.sort(
    (
      a: { job_apply_quality_score: number },
      b: { job_apply_quality_score: number },
    ) => b.job_apply_quality_score - a.job_apply_quality_score,
  );

  return (
    <div className="mx-6 mb-[2.5rem] mt-[1.75rem] lg:mt-[3.125rem] 2xl:mx-20 2xl:max-w-[80rem] min-[1441px]:mx-auto">
      <h1 className="text-[1.25rem] font-bold not-italic leading-8 dark:text-Natural4 sm:text-[2rem] sm:leading-10">
        Welcome to the Job Search Platform for Developers
      </h1>
      <h2 className="mb-[3.06rem] mt-[0.31rem] text-Natural6 sm:flex sm:text-xl sm:font-medium sm:leading-8 xl:mt-[.88rem]">
        {currentDate}
      </h2>

      <div className="mb-[2.5rem] flex flex-col xl:flex-row xl:gap-10">
        <div className="flex flex-col">
          <div className="mb-[1.87rem] flex items-center justify-between">
            <h3 className="text-[1.25rem] font-semibold leading-8 dark:text-White md:font-bold">
              Latest Job Posts
            </h3>
            <Link
              href="/job-search?page=1"
              className="hover-effect flex items-center justify-center gap-2 rounded-[0.625rem] 
                border px-[.62rem] py-[0.44rem] text-[1rem] font-medium leading-6 text-Natural7 
                dark:border-Natural8 xl:items-center"
            >
              See All
              <div className="sm:hidden">
                <Image
                  src="/iconography/chevron.svg"
                  alt="chevron"
                  width={16}
                  height={16}
                />
              </div>
            </Link>
          </div>
          <main className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-10">
            {latestJobs.data.slice(0, 4).map((latestJob) => (
              <JobCard
                key={latestJob?.job_id}
                jobId={latestJob.job_id}
                jobTitle={latestJob?.job_title}
                // NOTE Source: https://stackoverflow.com/questions/5454235/shorten-string-without-cutting-words-in-javascript
                jobDescription={latestJob?.job_description}
                maxSalary={latestJob?.job_max_salary}
                minSalary={latestJob?.job_min_salary}
                salaryPeriod={latestJob?.job_salary_period}
                companyLogo={latestJob?.employer_logo}
                jobSkills={extractRequiredSkills(
                  latestJob?.job_description,
                ).slice(0, 4)}
                employmentType={latestJob?.job_employment_type}
                expirationDate={latestJob?.job_offer_expiration_timestamp}
                educationObj={latestJob?.job_required_education}
                companyName={latestJob?.employer_name}
              />
            ))}
          </main>

          <section className="mt-10">
            <h3 className="mb-[1.87rem] text-[1.25rem] font-semibold leading-8 dark:text-White md:font-bold">
              Featured Companies
            </h3>
            <div className="flex flex-col gap-[2.25rem] lg:flex-row">
              {sortedFeaturedCompanies
                ?.slice(0, 3)
                .map((company) => (
                  <FeaturedCompany
                    key={company?.job_id}
                    jobId={company?.job_id}
                    companyName={company?.employer_name}
                    image={company?.employer_logo}
                    city={company?.job_city}
                    country={company?.job_country}
                  />
                ))}
            </div>
          </section>
        </div>

        <aside className="mt-[3.12rem] xl:mt-0">
          <div className="mb-[1.87rem] flex justify-between gap-[0.8125rem]">
            <h3 className="text-[1.25rem] font-semibold leading-8 dark:text-White md:font-bold">
              Recommended For You
            </h3>
            <Link
              href="/job-search?page=1"
              className="hover-effect flex items-center justify-center gap-2 rounded-[0.625rem] 
                border px-[0.625rem] py-[0.4375rem] text-base font-medium text-Natural7 
                dark:border-Natural8 xl:items-center"
            >
              See All
              <Image
                src="/iconography/chevron.svg"
                alt="chevron"
                width={16}
                height={16}
                className="sm:hidden"
              />
            </Link>
          </div>

          <div className="flex flex-col gap-3 rounded-[0.625rem] bg-White px-5 py-[1.25rem] shadow-1 dark:bg-DarkBG2">
            {recommendedJobs.data.slice(0, 10).map((recommendedJob) => (
              <RecommendedJobCard
                key={recommendedJob?.job_id}
                jobId={recommendedJob?.job_id}
                employerName={recommendedJob?.employer_name}
                jobTitle={recommendedJob.job_title}
                maxSalary={recommendedJob?.job_max_salary}
                minSalary={recommendedJob?.job_min_salary}
                salaryPeriod={recommendedJob?.job_salary_period}
                companyLogo={recommendedJob?.employer_logo}
                jobState={recommendedJob?.job_state}
                jobCity={recommendedJob?.job_city}
                jobCountry={recommendedJob?.job_country}
                employmentType={recommendedJob?.job_employment_type}
              />
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
