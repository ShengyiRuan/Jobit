import Link from "next/link";

import ImageErrorFallback from "@/components/ImageErrorFallback";

type SimilarCompaniesProps = {
  companyName: string;
  companyType: string;
  logo: string;
  jobId: string;
};

const SimilarCompanies = ({
  companyName,
  companyType,
  logo,
  jobId,
}: SimilarCompaniesProps) => (
  <div className="rounded-[0.625rem] bg-white p-[1.25rem] shadow-[0_6px_14px_0_rgba(23,23,37,0.02)] dark:bg-DarkBG2">
    <div className="flex w-full flex-row items-center justify-between gap-[0.69rem]">
      <div className="flex items-center gap-[0.62rem] lg:gap-[0.9375rem]">
        <ImageErrorFallback src={logo} card={"similarCompany"} />
        <div className="flex flex-col items-start justify-between">
          <p className="line-clamp-1 flex-initial text-[1rem] font-medium not-italic leading-6 text-black dark:text-White lg:text-[1.125rem] lg:font-semibold">
            {companyName}
          </p>
          <p className="line-clamp-1 flex-initial text-[0.875rem] font-medium not-italic leading-5 text-Natural6">
            {companyType}
          </p>
        </div>
      </div>
      <Link
        className="hover-effect flex h-[1.875rem] w-[5.25rem] flex-none items-center justify-center gap-[0.375rem] rounded-[0.625rem] border border-solid border-[#0BAB7C] 
            p-[0.38rem_0.62rem] lg:h-[2.25rem]"
        href={`/company-details/${jobId}`}
      >
        <span className="text-[0.8125rem] font-medium not-italic text-Primary lg:text-[0.875rem] lg:font-semibold lg:leading-6">
          Visit
        </span>
      </Link>
    </div>
  </div>
);
export default SimilarCompanies;
