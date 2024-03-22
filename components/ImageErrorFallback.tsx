"use client";

import Image from "next/image";
import { useState } from "react";

export default function ImageErrorFallback({
  src,
  card,
}: {
  src: string;
  card?: string;
}) {
  const [error, setError] = useState(false);

  let width = 48;
  let height = 48;
  const defaultSrc = "/iconography/jobit-icon.svg";
  const alt = "Company Placeholder logo";
  let className = "object-contain shrink-0";

  if (
    card === "companyDetailJobCard" ||
    card === "jobSearchCard" ||
    card === "inlineJobCard"
  ) {
    width = 36;
    height = 36;
  }

  if (card === "companyDetailCard") {
    width = 64;
    height = 64;
    className =
      "absolute dark:bg-White left-3 top-[6.84rem] size-[2.875rem] rounded-[0.625rem] border-[2.156px] border-Natural3 bg-White object-contain dark:border-Natural8 dark:bg-[#1717250f] lg:left-6 lg:top-[8rem] lg:size-16 lg:border-[3px]";
  }

  if (!src || error) {
    return (
      <Image
        src={defaultSrc}
        width={width}
        height={height}
        alt={alt}
        className={className + " grayscale"}
      />
    );
  }

  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt="Company Logo"
      className={className}
      onError={() => setError(true)}
    />
  );
}
