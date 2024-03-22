interface JobRequiredExperienceType {
  no_experience_required?: boolean;
  required_experience_in_months: number | null;
  experience_mentioned?: boolean;
  experience_preferred?: boolean;
}

const JobSmallInfo = ({ job }: { job: JobResult }) => {
  const {
    job_employment_type: employmentType,
    job_salary_period: salaryPeriod,
    job_salary_currency: currencyType,
    job_max_salary: maxSalary,
    job_min_salary: minSalary,
    job_job_title: workLevel,
  } = job;

  const salaryInformation =
    currencyType && salaryPeriod
      ? minSalary && maxSalary
        ? `${currencyType}${minSalary} - ${maxSalary} / ${salaryPeriod}`
        : `${currencyType}${minSalary || maxSalary} / ${salaryPeriod}`
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

  const informationObject = {
    requiredExperience,
    workLevel,
    employmentType,
    salaryInformation,
  };

  const renderInfo = () => {
    const infoCards = [];
    for (const [key, value] of Object.entries(informationObject)) {
      if (value) {
        infoCards.push(<JobInfo key={key} title={key} body={value} />);
      }
    }

    return infoCards;
  };

  return (
    <section className="mt-4">
      <div className="flex w-full items-start justify-evenly gap-2 rounded-[1.25rem] bg-Natural3 py-4 dark:bg-DarkBG3 max-md:mx-auto max-md:flex-col md:items-center md:gap-4">
        {renderInfo()}
      </div>
    </section>
  );
};

export default JobSmallInfo;

const JobInfo = ({ title, body }: { title: string; body: string }) => {
  const spacedOutTitle = Array.from(title).reduce((newStr, currentValue) => {
    if (currentValue === currentValue.toUpperCase()) {
      newStr += ` ${currentValue}`;
    } else {
      newStr += currentValue;
    }
    return newStr;
  }, "");

  return (
    <div className="flex flex-col gap-1 border-black/20 pb-2 last:border-b-0 last:pb-0 max-md:w-full max-md:border-b max-md:px-4 md:gap-2">
      <p className="text-sm text-Natural6">
        {`${spacedOutTitle[0].toUpperCase()}${spacedOutTitle.substring(1)}
        `}
      </p>
      <p className="dark:text-white">{body}</p>
    </div>
  );
};
