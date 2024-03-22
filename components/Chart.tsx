import { cookies } from "next/headers";

import { getEstimatedSalaries } from "@/lib/jsearch";
import { ChartBar } from "./ChartBar";
import { DarkChartBar } from "./DarkChartBar";

const Chart = async ({
  searchParams,
}: {
  searchParams: { jobTitle: string; location: string; radius: number };
}) => {
  const { jobTitle, location, radius } = searchParams;
  const cookieStore = cookies();
  const locationCookie = cookieStore.get("location")?.value;

  const estSalariesData = await getEstimatedSalaries(
    jobTitle ?? "Front-end Developer",
    location ?? locationCookie ?? "Canada",
    radius ?? 200,
  );

  const estimatedSalaries: JobSalaryEntryType[] = await estSalariesData?.data;

  if (!estimatedSalaries?.length)
    return (
      <div className="rounded-[0.5935rem] bg-White p-6 shadow-lg shadow-Natural2 dark:bg-DarkBG2 dark:shadow-none lg:mt-20">
        <h3 className="regular-16 sm:regular-22 text-Black dark:text-White">
          No Data Available for <span className="font-bold">{jobTitle} </span>in{" "}
          <span className="font-bold">{location}</span>
        </h3>
      </div>
    );

  return (
    estimatedSalaries &&
    estimatedSalaries.length > 0 && (
      <div className="rounded-[0.5935rem] bg-White p-6 shadow-lg shadow-Natural2 dark:bg-DarkBG2 dark:shadow-none">
        <h3 className="bold-16 sm:bold-22 mb-[10px] text-Black dark:text-White">
          <span className="font-bold">Estimated Salary</span> for
          <span className="font-bold">
            {" "}
            {jobTitle ?? "Front-end Developer"}{" "}
          </span>
          in
          <span className="font-bold">
            {" "}
            {location ?? locationCookie ?? "Canada"}
          </span>
        </h3>

        <section className="flex h-[250px] flex-col">
          <div className="dark:invisible dark:order-2">
            <ChartBar estimatedSalaries={estimatedSalaries} />
          </div>
          <div className="invisible dark:visible dark:order-1">
            <DarkChartBar estimatedSalaries={estimatedSalaries} />
          </div>
        </section>
      </div>
    )
  );
};

export default Chart;
