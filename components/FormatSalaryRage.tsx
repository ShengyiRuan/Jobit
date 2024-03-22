export const FormatSalaryRange = (
  minSalary: number,
  maxSalary: number,
  salaryPeriod: string,
  card: string = "",
): JSX.Element => {
  if (card === "recommendedJobCard") {
    if (salaryPeriod.toLowerCase() === "hour") {
      return (
        <div className="flex flex-row items-end justify-end">
          <span className="flex-none text-[0.8125rem] font-semibold leading-5 text-Black dark:text-White xl:text-sm xl:font-medium">
            {`$${minSalary}-${maxSalary}`}
          </span>
          <span className="flex-none text-[0.8125rem] font-normal not-italic leading-[1.375rem] text-Natural7 xl:text-[0.875rem]">{`/Hr`}</span>
        </div>
      );
    }
    const formattedMin = Math.round(minSalary / 1000) + "k";
    const formattedMax = Math.round(maxSalary / 1000) + "k";

    return (
      <div className="flex flex-row items-end justify-end">
        <span className="line-clamp-1 flex-none truncate text-[0.8125rem] font-semibold leading-5 text-Black dark:text-White xl:text-sm xl:font-medium">
          {formattedMax === formattedMin
            ? `$${formattedMax}`
            : `$${formattedMin}-${formattedMax}`}
        </span>
        <span className="flex-none text-[0.8125rem] font-normal not-italic leading-[1.375rem] text-Natural7 xl:text-[0.875rem]">{`/${salaryPeriod.toLowerCase()}`}</span>
      </div>
    );
  }

  if (salaryPeriod.toLowerCase() === "hour") {
    return (
      <>
        <span className="text-base font-semibold text-Natural8 dark:text-White lg:text-[1.125rem] lg:leading-[1.5rem]">{`$${minSalary}-${maxSalary}`}</span>
        <span className="text-sm font-medium not-italic text-Natural7 lg:text-[1.125rem] lg:font-normal lg:leading-[1.5rem]">{`/${salaryPeriod.toLowerCase()}`}</span>
      </>
    );
  }

  const formattedMin = Math.round(minSalary / 1000) + "k";
  const formattedMax = Math.round(maxSalary / 1000) + "k";
  return (
    <>
      <span className="text-base font-semibold text-Natural8 dark:text-White lg:text-[1.125rem] lg:leading-[1.5rem]">{`$${formattedMin}-${formattedMax}`}</span>
      <span className="text-sm font-medium not-italic text-Natural7 lg:text-[1.125rem] lg:font-normal lg:leading-[1.5rem]">{`/${salaryPeriod.toLowerCase()}`}</span>
    </>
  );
};
