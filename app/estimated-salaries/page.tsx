import moment from "moment";
import { Suspense } from "react";

import Chart from "@/components/Chart";
import SalariesInputs from "@/components/SalariesInputs";
import { Skeleton } from "@/components/ui/skeleton";

export default function EstimatedSalaries({
  searchParams,
}: {
  searchParams: { jobTitle: string; location: string; radius: number };
}) {
  return (
    <main className="mx-auto flex max-w-[1440px] flex-col gap-x-[85px] overflow-hidden px-6 pb-8 pt-10 lg:flex-row lg:pt-[3.25rem] xl:px-20">
      <div className="mb-10 lg:w-1/2">
        <h1 className="bold-22 sm:bold-32 mb-1 text-Black dark:text-white sm:mb-3">
          Estimated Salaries
        </h1>
        <h2 className="mb-[30px] text-base font-medium leading-6 text-Natural6 sm:text-[20px] sm:leading-8">
          {moment().format("dddd, DD MMM YYYY")}
        </h2>
        <SalariesInputs />
      </div>
      <div className="lg:w-1/2">
        <Suspense
          fallback={
            <Skeleton className="h-[372px] w-full rounded-[10px] !bg-White shadow-lg shadow-Natural2 dark:!bg-DarkBG2 dark:shadow-none" />
          }
        >
          <Chart searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
