"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

const CompanyDetailBackButton = () => {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.back()}
      className="hover-effect mb-[1.73rem] h-8 w-[4.625rem] gap-[0.375rem] rounded-[0.625rem] bg-Natural2 px-[0.63rem]
          py-[0.44rem] text-[0.8125rem] font-medium not-italic leading-[1.125rem] text-Natural6
          dark:border-DarkBG3 dark:bg-DarkBG3 dark:text-Natural6 lg:mb-9 lg:w-[4.625rem]"
    >
      <Image
        src="/iconography/ChevronLeft.svg"
        width={18}
        height={18}
        alt="Back button"
      />
      Back
    </Button>
  );
};

export default CompanyDetailBackButton;
