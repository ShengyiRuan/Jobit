import { programmingLanguages } from "@/constants";
import { type ClassValue, clsx } from "clsx";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateString(str: string, num: number) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}

/* {Calculate Days left for job posting} */
export function calculateDaysLeft(expTime: number): number {
  if (!expTime) {
    return 0;
  }
  const expDate = new Date(expTime * 1000); // Convert to milliseconds
  const currentDate = new Date();

  const timeDiff = expDate.getTime() - currentDate.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  return daysLeft;
}

export function findKeywords(jobDescription: string, maxKeywords: number = 7) {
  const descriptionLowerCase = jobDescription.toLowerCase();
  const uniqueKeywords = new Set<string>();

  for (const programmingLanguage of programmingLanguages) {
    if (uniqueKeywords.size >= maxKeywords) {
      break; // Stop the loop if we've reached the maximum number of keywords
    }
    // Only use the lowercase version for comparison
    if (descriptionLowerCase.includes(programmingLanguage.toLowerCase())) {
      uniqueKeywords.add(programmingLanguage); // Add the original case version to the Set
    }
  }

  return Array.from(uniqueKeywords);
}

/* {Calculate Days since job posting} */
export function calculatePostDate(expTime: number): number {
  if (!expTime) {
    return 0;
  }
  const postDate = new Date(expTime * 1000); // Convert to milliseconds
  const currentDate = new Date();

  const timeDiff = currentDate.getTime() - postDate.getTime();
  const daysPosted = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  return daysPosted;
}

export const addOrReplaceJobSearchParams = (
  paramsArray: Record<string, string>[],
  router: AppRouterInstance,
  url: string = "/job-search",
) => {
  if (!router) return;
  if (!window) return;

  const queryParams = new URLSearchParams(window.location.search);

  paramsArray.forEach((param) => {
    const key = Object.keys(param)[0];
    const value = param[key];
    if (key && value !== undefined) {
      // Ensure the key is not empty and the value is not undefined
      queryParams.set(key, value);
    }
  });

  router.push(`${url}?${queryParams.toString()}`, { scroll: false });
};

export function formatLocation(
  city?: string | null,
  state?: string | null,
  country?: string | null,
): string | null {
  const locationParts = [city, state, country].filter(Boolean);
  return locationParts.length > 0 ? locationParts.join(", ") : null;
}
