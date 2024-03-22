"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleBackClick() {
    if (searchParams.get("search")) {
      router.push("/");
    } else {
      router.back();
    }
  }

  return (
    <button
      onClick={handleBackClick}
      className="hover-effect flex items-center rounded-[0.625rem] bg-Natural2 px-3 py-2 dark:bg-DarkBG3"
    >
      <Image
        src="/iconography/ChevronLeft.svg"
        alt="back"
        height={18}
        width={18}
      />
      <p className="px-1 text-sm text-Natural7">Back</p>
    </button>
  );
};

export default BackButton;
