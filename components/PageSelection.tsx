"use client";

import { useEffect, useState } from "react";
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { v4 as uuidv4 } from "uuid";

import { addOrReplaceJobSearchParams } from "@/lib/utils";

const PageSelection = ({
  numPages = 10,
}: {
  numPages?: number | null | undefined;
}) => {
  const router = useRouter();
  const totalPages = numPages || 10;
  const searchParams: ReadonlyURLSearchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState(
    (Number(searchParams.get("page")) &&
      (Number(searchParams.get("page")) > totalPages
        ? 10
        : Number(searchParams.get("page")))) ||
      1,
  );

  useEffect(() => {
    if (currentPage > totalPages) return;
    addOrReplaceJobSearchParams([{ page: currentPage.toString() }], router);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [currentPage, totalPages]);

  const handlePaginationClick = (page: number) => {
    page > totalPages ? setCurrentPage(totalPages) : setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage >= totalPages) return;
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage <= 1) return;
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flex justify-between">
      <button
        onClick={handlePreviousPage}
        className={`${
          currentPage <= 1 && "invisible"
        } hover-effect bold-14 flex items-center gap-2 rounded-lg border border-Natural4 bg-White px-[14px] py-2 font-bold text-Natural8 shadow-paginationButton dark:border-DarkBG3 dark:bg-DarkBG2 dark:text-Natural5`}
      >
        <Arrow direction="left" />
        <span className="hidden sm:block">Previous</span>
      </button>

      <div className="hidden items-center gap-2 text-sm sm:flex">
        {Array.from({ length: totalPages }).map((_, i) => {
          i++;
          if (
            i <= 3 ||
            i >= totalPages - 2 ||
            (i >= currentPage - 1 && i <= currentPage + 1)
          ) {
            return (
              <button
                key={uuidv4()}
                disabled={currentPage === i}
                className={
                  currentPage === i
                    ? "flex size-[40px] items-center justify-center rounded-lg border-Natural4 bg-Primary font-medium text-White"
                    : "hover-effect flex size-[40px] items-center justify-center rounded-lg border-Natural4 font-medium dark:border-Natural8 dark:text-Natural6"
                }
                onClick={() => {
                  handlePaginationClick(i);
                }}
              >
                {i}
              </button>
            );
          } else if (
            (i >= currentPage + 2 && i < currentPage + 3) ||
            (i <= currentPage - 2 && i > currentPage - 3) ||
            (i === 4 && currentPage === 1) ||
            (i === totalPages - 3 && currentPage === totalPages)
          ) {
            return (
              <div key={uuidv4()} className="font-medium dark:text-Natural6">
                ...
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="semibold-14 flex items-center gap-2 text-Natural7 sm:hidden">
        Page
        <span className="bold-14 text-Natural8 dark:text-White">
          {currentPage}
        </span>{" "}
        of 10
      </div>
      <button
        onClick={handleNextPage}
        className={`${
          currentPage >= totalPages && "invisible"
        } hover-effect bold-14 flex items-center gap-2 rounded-lg border border-Natural4 bg-White px-[14px] py-2 font-bold text-Natural8 shadow-paginationButton dark:border-DarkBG3 dark:bg-DarkBG2 dark:text-Natural5`}
      >
        <span className="hidden sm:block">Next</span>
        <Arrow direction="right" />
      </button>
    </div>
  );
};

export default PageSelection;

const Arrow = ({ direction = "left" }: { direction: "left" | "right" }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${
        direction !== "left" && "rotate-180"
      } stroke-Natural8 dark:stroke-Natural5`}
    >
      <path
        d="M15.8333 10H4.16666M4.16666 10L9.99999 15.8334M4.16666 10L9.99999 4.16669"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
