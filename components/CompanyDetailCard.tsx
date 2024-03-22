import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import ImageErrorFallback from "./ImageErrorFallback";
import FetchCompanyDetailJobs from "./FetchCompanyDetailJobs";
import CompanyDetailSearch from "./CompanyDetailSearch";
import CompanyDetailBackButton from "./CompanyDetailBackButton";

const CompanyDetailCard = ({
  logo,
  employerName,
  companyType,
  city,
  state,
  companyLink,
  jobId,
  companyJobs,
  country,
}: CompanyDetailCardProps) => (
  <main className="flex flex-1 flex-col">
    <CompanyDetailBackButton />
    <Card className="border-0 bg-transparent shadow-none">
      <div
        className="relative h-[8.21875rem] w-full rounded-t-[1.25rem] bg-[url('/iconography/job-detail.svg')] bg-cover bg-left
          lg:h-[9.87rem]"
      >
        <ImageErrorFallback card="companyDetailCard" src={logo} />
      </div>
      <div className="flex flex-col dark:bg-DarkBG1 lg:flex-row lg:items-end lg:justify-between lg:pb-[3.19rem]">
        <div className="pl-3 pt-[2.45875rem] lg:flex lg:flex-col lg:gap-[0.63rem] lg:pl-6 lg:pt-[5.64875rem]">
          <CardTitle className="text-[1.375rem] not-italic leading-8 lg:text-[2rem] lg:font-bold">
            {employerName}
          </CardTitle>
          <CardDescription
            className="mt-2 flex flex-row items-center gap-[0.38rem] text-sm font-medium not-italic
              text-Natural7 dark:text-Natural6 lg:mt-0 lg:text-[1.125rem] lg:leading-6 lg:text-Natural8"
          >
            {city ? city + ", " : ""}
            {state ? state + ", " : ""}
            {country}
          </CardDescription>
          <CardDescription className="mt-1 flex flex-row items-center gap-[0.38rem] text-sm font-medium not-italic text-Natural7 lg:mt-0 lg:text-base">
            {companyType}
          </CardDescription>
          <Separator className="my-5 lg:hidden" />
        </div>
        {companyLink && (
          <div className="mb-[1.63rem] mr-[0.63rem] pl-3 lg:mb-[0.62rem] lg:mr-5">
            <Button
              asChild
              variant="outline"
              className={`${!companyLink && "hidden"} hover-effect flex h-11 w-full flex-row gap-[0.38rem] rounded-[0.625rem] border border-solid border-Primary
                  text-Primary hover:text-Primary dark:border-Primary dark:bg-DarkBG1 dark:hover:text-Primary`}
            >
              <Link
                href={companyLink}
                target="_blank"
                className="hover-effect text-[0.875rem] font-semibold not-italic leading-6"
              >
                Company Website
              </Link>
            </Button>
          </div>
        )}
      </div>
    </Card>
    <div className="rounded-[0.625rem] bg-white px-4 py-5 dark:bg-DarkBG2 lg:ml-6 lg:px-5 lg:pb-0 lg:pt-[1.88rem]">
      <CompanyDetailSearch jobId={jobId} />
      <FetchCompanyDetailJobs companyJobs={companyJobs} />
    </div>
  </main>
);

export default CompanyDetailCard;
