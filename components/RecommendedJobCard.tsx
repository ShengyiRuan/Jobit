import Link from "next/link";

import ImageErrorFallback from "@/components/ImageErrorFallback";
import { FormatSalaryRange } from "./FormatSalaryRage";

type RecommendedJobCardProps = {
  jobId: string;
  employerName: string;
  jobTitle: string;
  minSalary: number | null;
  maxSalary: number | null;
  salaryPeriod: string | null;
  companyLogo: string;
  jobState: string;
  jobCity: string;
  jobCountry: string;
  employmentType: string;
};

const RecommendedJobCard = ({
  minSalary,
  maxSalary,
  salaryPeriod,
  jobId,
  jobCountry,
  jobCity,
  jobState,
  jobTitle,
  companyLogo,
  employerName,
  employmentType,
}: RecommendedJobCardProps) => {
  const country = jobCountry ? `･ ${jobCountry}` : "";
  return (
    <Link
      href={`/job-details/${jobId}`}
      className="group gap-5 rounded-[10px] bg-Natural3 px-3 py-3.5 dark:bg-DarkBG3 xl:w-[22.5rem]"
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-[0.56rem] rounded">
          <div className="flex size-12 shrink-0 items-center rounded-[0.46rem]">
            <ImageErrorFallback src={companyLogo} />
          </div>
          <div className="flex flex-col gap-1 pl-0 text-start">
            <h1 className="line-clamp-1 text-[1rem] font-semibold text-gray-900 group-hover:underline dark:text-white sm:text-base">
              {jobTitle}
            </h1>
            <p className="line-clamp-1 text-[0.875rem] font-normal leading-tight text-Natural7 sm:text-sm">
              {`${employerName} ${jobCity ? "･" + jobCity + "," : country} ${
                jobState ?? ""
              }`}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end justify-between gap-1">
          {minSalary && maxSalary && salaryPeriod ? (
            FormatSalaryRange(
              minSalary,
              maxSalary,
              salaryPeriod,
              "recommendedJobCard",
            )
          ) : (
            <span className="ml-2 line-clamp-1 text-sm font-medium not-italic text-Natural7 dark:text-White">
              -
            </span>
          )}
          <p className="text-center text-[0.875rem] font-medium capitalize leading-tight text-Natural7">
            {employmentType.toLowerCase()}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default RecommendedJobCard;
