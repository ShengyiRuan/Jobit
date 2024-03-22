import Image from "next/image";

interface JobHighlightsType {
  Qualifications: string[];
  Responsibilities: string[];
  Benefits: string[];
}

const JobDescription = ({ job }: { job: JobResult }) => {
  const { Responsibilities: responsibilities, Qualifications: qualifications } =
    job?.job_highlights as JobHighlightsType;

  return (
    <section className="mt-5 flex w-full flex-col gap-4 dark:text-white">
      <div className="flex flex-col">
        {job.job_description ? (
          <>
            <p className="bold-18 text-Black dark:text-White">About The Job</p>
            <p className="regular-16 mt-[0.625rem] whitespace-break-spaces text-justify text-Natural7 dark:text-Natural5">
              {job.job_description}
            </p>
          </>
        ) : (
          <>
            <div>
              <Image
                src="/images/not-found.svg"
                alt="not-found"
                height={30}
                width={53}
              />
            </div>
            <p className="body-l-bold">No description provided</p>
          </>
        )}
      </div>
      <div
        className={`${
          responsibilities ? "flex" : "hidden"
        } my-2 flex-col gap-6 py-3`}
      >
        {responsibilities?.length > 0 && (
          <div>
            <h3 className="bold-18 text-Black dark:text-White">
              Responsibilities
            </h3>
            <div className="mt-2 flex flex-col gap-2">
              {responsibilities?.map((responsibility: string) => (
                <div className="flex items-baseline gap-3" key={responsibility}>
                  <Image
                    src="/iconography/Oval (2).svg"
                    alt="oval"
                    height={15}
                    width={10}
                  />
                  <p className="text-Natural7 dark:text-Natural5">
                    {responsibility}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        {qualifications?.length > 0 && (
          <div>
            <h3 className="bold-18 text-Black dark:text-White">
              Qualifications
            </h3>
            <div className="mt-2 flex flex-col gap-2">
              {qualifications?.map((qualification: string) => (
                <div className="flex items-baseline gap-3" key={qualification}>
                  <Image
                    src="/iconography/Oval (2).svg"
                    alt="oval"
                    height={15}
                    width={10}
                  />
                  <p className="text-Natural7 dark:text-Natural5">
                    {qualification}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default JobDescription;
