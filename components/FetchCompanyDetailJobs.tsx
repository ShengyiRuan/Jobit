"use client";
import { useState } from "react";

import { extractRequiredSkills } from "@/lib/jobRequiredSkills";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import CompanyDetailJobCard from "./CompanyDetailJobCard";
import { Button } from "@/components/ui/button";

const FetchCompanyDetailJobs = ({
  companyJobs,
}: {
  companyJobs: JobResult[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        className={`${!companyJobs?.length && "text-center"} py-5 text-base font-bold text-Black dark:text-White lg:pb-[1.25rem] lg:pt-[1.87rem] lg:text-[1.125rem] lg:font-bold lg:leading-7`}
      >
        {companyJobs?.length
          ? "Recently Posted Job"
          : "No available jobs found."}
      </div>

      <div className="grid grid-cols-1 gap-2 xl:grid-cols-2 xl:gap-[1.88rem]">
        {!!companyJobs?.length &&
          companyJobs
            .slice(0, 4)
            .map((jobResult) => (
              <CompanyDetailJobCard
                key={jobResult?.job_id}
                jobId={jobResult?.job_id}
                logo={jobResult?.employer_logo}
                jobTitle={jobResult?.job_title}
                description={jobResult?.job_description}
                minSalary={jobResult?.job_min_salary}
                maxSalary={jobResult?.job_max_salary}
                salaryPeriod={jobResult?.job_salary_period}
                skills={extractRequiredSkills(jobResult?.job_description).slice(
                  0,
                  3,
                )}
              />
            ))}
      </div>

      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleContent>
          <div className="mt-2 grid grid-cols-1 gap-2 xl:mt-[1.88rem] xl:grid-cols-2 xl:gap-[1.88rem]">
            {!!companyJobs?.length &&
              companyJobs
                .slice(5, 10)
                .map((jobResult) => (
                  <CompanyDetailJobCard
                    key={jobResult?.job_id}
                    jobId={jobResult?.job_id}
                    logo={jobResult?.employer_logo}
                    jobTitle={jobResult?.job_title}
                    description={jobResult?.job_description}
                    minSalary={jobResult?.job_min_salary}
                    maxSalary={jobResult?.job_max_salary}
                    salaryPeriod={jobResult?.job_salary_period}
                    skills={extractRequiredSkills(
                      jobResult?.job_description,
                    ).slice(0, 3)}
                  />
                ))}
          </div>
        </CollapsibleContent>
        {companyJobs?.length > 4 ? (
          <div className="mb-[1.875rem] flex items-center justify-center lg:mb-[3.25rem] lg:mt-[3.75rem]">
            <CollapsibleTrigger>
              <Button
                className="hover-effect hidden rounded-[0.625rem] border border-solid border-Natural5 px-[0.875rem] py-2 dark:border-DarkBG3 dark:bg-DarkBG3 lg:block"
                variant="outline"
              >
                <span className="text-[0.9375rem] font-semibold not-italic leading-6 text-Natural6">
                  {isOpen ? "See Less Jobs" : "See All Jobs"}
                </span>
              </Button>
            </CollapsibleTrigger>
          </div>
        ) : (
          <div className={`${!!companyJobs.length && "pb-12"}`} />
        )}
      </Collapsible>
    </>
  );
};

export default FetchCompanyDetailJobs;
