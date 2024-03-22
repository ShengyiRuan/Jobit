import Image from "next/image";
import Link from "next/link";
import { PiGraduationCap } from "react-icons/pi";

import briefcase from "@/public/iconography/outline-briefcase.svg";
import clock from "@/public/iconography/outline-clock.svg";
import { FormatSalaryRange } from "./FormatSalaryRage";
import ImageErrorFallback from "./ImageErrorFallback";

type EducationType = {
  postgraduate_degree: boolean;
  professional_certification: boolean;
  high_school: boolean;
  associates_degree: boolean;
  bachelors_degree: boolean;
  degree_mentioned: boolean;
  degree_preferred: boolean;
  professional_certification_mentioned: boolean;
};

type Props = {
  jobId: string;
  jobTitle: string;
  jobDescription: string;
  minSalary: number | null;
  maxSalary: number | null;
  salaryPeriod: string | null;
  companyLogo: string;
  jobSkills: string[] | null;
  employmentType: string;
  expirationDate: number;
  educationObj: EducationType;
  companyName: string;
};

const JobCard = (props: Props) => {
  function calculateDaysLeft(expirationTimestamp: number | null) {
    const currentTimestamp = Math.floor(Date.now() / 1000); // Current timestamp in seconds
    const secondsInADay = 86400; // 24 * 60 * 60 seconds

    if (!expirationTimestamp) {
      return null;
    }

    const timeDifference = expirationTimestamp - currentTimestamp;
    const daysLeft = Math.ceil(timeDifference / secondsInADay);

    return `${daysLeft} day${daysLeft !== 1 ? "s" : ""} left`;
  }

  const educationRequired = (educationObj: EducationType) => {
    for (const value of Object.values(educationObj)) {
      if (value) return true;
    }
    return false;
  };

  const daysLeft = calculateDaysLeft(props?.expirationDate);
  const educationNeeded = educationRequired(props?.educationObj);
  return (
    <div className="flex flex-col gap-7 rounded-[10px] bg-white p-5 shadow-1 dark:bg-DarkBG2">
      <div className="flex rounded">
        <Link
          href={`/company-details/${props?.jobId}`}
          className="relative flex h-16 w-full max-w-[64px] shrink-0 items-center 
              justify-center overflow-hidden rounded-xl border-[3px] border-[#FAFAFB] 
              bg-[#F1F1F2] dark:border-DarkBG4 dark:bg-White max-sm:size-14"
        >
          <ImageErrorFallback src={props?.companyLogo} />
        </Link>
        <div className="flex flex-col justify-between pl-[18px] sm:pl-5">
          <h1 className="line-clamp-1 font-semibold text-gray-900 dark:text-white sm:text-lg">
            {props?.jobTitle}
          </h1>

          {/* Conditionally render skills */}
          <div className="flex gap-1">
            {props?.jobSkills &&
              props?.jobSkills.slice(0, 3).map((skill) => (
                <p
                  key={skill}
                  className="flex justify-start rounded bg-Natural3 px-[6px] py-[3px] text-[13px] text-Natural6 dark:bg-DarkBG3 sm:px-[10px] sm:py-[5px] sm:text-sm"
                >
                  {skill}
                </p>
              ))}
          </div>
        </div>
      </div>

      <p className="line-clamp-6 grow text-[15px] text-Natural7 dark:text-Natural6 sm:text-base">
        {props?.jobDescription}
      </p>

      <div className="flex justify-start gap-[0.3125rem] sm:gap-3">
        <div className="flex items-center justify-center gap-x-2 rounded bg-Natural3 px-1 py-[6px] text-[13px] text-Natural6 dark:bg-DarkBG3 sm:px-[10px] sm:text-sm sm:leading-[1.375rem]">
          <Image width={18} height={18} src={briefcase} alt="briefcase icon" />
          <p className="capitalize">{props?.employmentType.toLowerCase()}</p>
        </div>
        <div className="flex items-center justify-center gap-x-2 rounded bg-Natural3 px-1 py-[6px] text-[13px] text-Natural6 dark:bg-DarkBG3 sm:px-[10px] sm:text-sm sm:leading-[1.375rem]">
          <PiGraduationCap className="size-[1.125rem]" />
          {educationNeeded ? "Required" : "Not Required"}
        </div>
        {daysLeft && (
          <div className="flex items-center justify-center gap-x-2 rounded bg-Natural3 px-1 py-[6px] text-[13px] text-Natural6 dark:bg-DarkBG3 sm:px-[10px] sm:text-sm sm:leading-[1.375rem]">
            <Image width={18} height={18} src={clock} alt="clock_icon" />
            <p className="line-clamp-1">{daysLeft}</p>
          </div>
        )}
      </div>

      {/* Conditionally render salaries */}
      <div className="flex items-center justify-between">
        <div>
          {props.minSalary && props.maxSalary && props.salaryPeriod ? (
            FormatSalaryRange(
              props.minSalary,
              props.maxSalary,
              props.salaryPeriod,
            )
          ) : (
            <span className="ml-2 text-sm font-medium not-italic text-Natural7 dark:text-White">
              No salary range provided
            </span>
          )}
        </div>
        <Link
          className="medium-15 hover-effect rounded-[0.625rem] bg-Primary px-3.5 py-2 text-white md:py-3"
          href={`/job-details/${props.jobId}`}
        >
          View details
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
