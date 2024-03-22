import { cookies } from "next/headers";

import CompanyDetailCard from "@/components/CompanyDetailCard";
import SimilarCompanies from "@/components/SimilarCompanies";
import {
  getSimilarCompanies,
  getCompanyDetails,
  getTheCompanyJobs,
  getCompanyTypes,
} from "@/lib/jsearch";

const CompanyDetails = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { query: string };
}) => {
  const cookieStore = cookies();
  const location = cookieStore?.get("location")?.value;
  const searchQuery = searchParams.query;
  const jobId = params.id;
  const companyDetails = await getCompanyDetails(jobId);
  const companyWebsite = companyDetails.data[0]?.employer_website;
  const companyName = companyDetails.data[0]?.employer_name;
  const companyTypes = await getCompanyTypes(companyName);
  const companyType = companyTypes?.data.company_types[0];
  const similarCompanies = await getSimilarCompanies(
    companyType?.value,
    location,
  );
  const companyJobs = await getTheCompanyJobs(
    searchQuery ?? "developer jobs",
    companyName,
  );

  const filteredSimilarCompanies = similarCompanies?.data.filter(
    (company) =>
      company.employer_name !== companyDetails.data[0]?.employer_name,
  );

  const filteredCompanyJobs = companyJobs?.data.filter(
    (job) =>
      job.employer_name === companyName &&
      job.employer_website === companyWebsite,
  );

  return (
    <div className="mx-6 mb-[4.5rem] mt-[1.37rem] flex flex-col lg:mb-11 lg:mt-[2.87rem] lg:flex-row lg:gap-10 2xl:mx-20 2xl:max-w-[80rem] min-[1441px]:mx-auto">
      <CompanyDetailCard
        logo={companyDetails.data[0]?.employer_logo}
        employerName={companyDetails.data[0]?.employer_name}
        companyType={companyDetails.data[0]?.employer_company_type}
        city={companyDetails.data[0]?.job_city}
        state={companyDetails.data[0]?.job_state}
        companyLink={companyDetails.data[0]?.employer_website}
        jobId={jobId}
        companyJobs={filteredCompanyJobs}
        country={companyDetails.data[0]?.job_country}
      />
      {filteredSimilarCompanies.length ? (
        <aside className="lg:max-w-[25rem]">
          <h2 className="mb-[1.87rem] mt-[2.875rem] text-[1.375rem] font-bold not-italic leading-8 text-Black dark:text-White md:mt-14 lg:mb-5 lg:mt-[4.25rem]">
            Similar Companies
          </h2>
          <div className="flex flex-col gap-6">
            {filteredSimilarCompanies.slice(0, 8).map((company) => (
              <SimilarCompanies
                key={company?.job_id}
                companyName={company?.employer_name}
                companyType={company?.employer_company_type}
                logo={company?.employer_logo}
                jobId={company?.job_id}
              />
            ))}
          </div>
        </aside>
      ) : (
        ""
      )}
    </div>
  );
};

export default CompanyDetails;
