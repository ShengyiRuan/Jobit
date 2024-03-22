import { DEFAULT_LOCATION, DEFAULT_TYPE, datePostedOptions } from "@/constants";

const jSearchApiKey = process.env.X_RAPID_API_KEY;
const requestHeaders = new Headers();
requestHeaders.set("X-RapidAPI-Key", jSearchApiKey || "");
requestHeaders.set("X-RapidAPI-Host", "jsearch.p.rapidapi.com");

export async function fetchJobSearch(
  searchParams: {
    page: string;
    employment_types: string;
    date_posted: string;
    job_requirements: string[];
    remote: boolean;
    query: string;
  },
  locationCookie: string | null | undefined,
) {
  const page = searchParams.page ?? 1;
  let datePosted = searchParams.date_posted ?? "";
  const jobRequirements = searchParams.job_requirements
    ? `&job_requirements=${searchParams.job_requirements}`
    : "";
  const employmentTypes = searchParams.employment_types
    ? `&employment_types=${searchParams.employment_types}`
    : "";
  const query =
    searchParams.query ?? `Developer in ${locationCookie ?? DEFAULT_LOCATION}`;

  const isRemote = searchParams.remote ? "&remote_jobs_only=true" : "";

  if (
    datePosted &&
    datePosted
      .split(",")
      .some((dateOptions) => datePostedOptions.includes(dateOptions))
  ) {
    if (datePosted.includes("all")) {
      datePosted = `&date_posted=all`;
    } else if (datePosted.includes("month")) {
      datePosted = `&date_posted=month`;
    } else if (datePosted.includes("week")) {
      datePosted = `&date_posted=week`;
    } else if (datePosted.includes("3days")) {
      datePosted = `&date_posted=3days`;
    } else if (datePosted.includes("today")) {
      datePosted = `&date_posted=today`;
    }
  }

  const res = await fetch(
    `https://jsearch.p.rapidapi.com/search?query=${query}${employmentTypes}${isRemote}&page=${page}${jobRequirements}${datePosted}`,
    { headers: requestHeaders },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getLatestJobs(locationCookie: string | null | undefined) {
  const res = await fetch(
    `https://jsearch.p.rapidapi.com/search?query=software%20Developer%20in%20${
      locationCookie ?? DEFAULT_LOCATION
    }&page=1&num_pages=1&date_posted=today`,
    { headers: requestHeaders },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getRecommendedJobs(
  locationCookie: string | null | undefined,
) {
  const res = await fetch(
    `https://jsearch.p.rapidapi.com/search?query=Developer%20in%20${
      locationCookie ?? DEFAULT_LOCATION
    }&page=1&num_pages=1&date_posted=today&remote_jobs_only=true`,
    { headers: requestHeaders },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getJobDetails(id: string): Promise<Job | undefined> {
  const url = `https://jsearch.p.rapidapi.com/job-details?job_id=${id}`;

  try {
    const res = await fetch(url, { headers: requestHeaders });

    if (!res.ok) {
      throw new Error("Failed to Fetch Job Details");
    }

    return res.json();
  } catch (error) {
    console.error(error);
  }
}

export async function getSimilarJobs(
  jobTitle: string | null,
  locationCookie: string | null | undefined,
) {
  const url = `https://jsearch.p.rapidapi.com/search?query=${jobTitle}%20in%20${
    locationCookie ?? DEFAULT_LOCATION
  }&page=1`;

  try {
    const res = await fetch(url, { headers: requestHeaders });
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to Fetch Job Details");
    }

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getCompanyDetails(id: string): Promise<Job> {
  const res = await fetch(
    `https://jsearch.p.rapidapi.com/job-details?job_id=${id}`,
    {
      headers: requestHeaders,
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

type CompanyTypes = {
  data: {
    categories: string[];
    job_titles: string[];
    company_types: {
      name: string;
      value: string;
      est_count: number;
    }[];
  };
};

export async function getCompanyTypes(
  companyName: string,
): Promise<CompanyTypes | undefined> {
  try {
    const res = await fetch(
      `https://jsearch.p.rapidapi.com/search-filters?query=${companyName}`,
      {
        headers: requestHeaders,
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    console.error(error);
  }
}

export async function getSimilarCompanies(
  companyType: string | null | undefined,
  locationCookie: string | null | undefined,
): Promise<Job> {
  const type = companyType ? `&company_types=${companyType}` : DEFAULT_TYPE;

  const res = await fetch(
    `https://jsearch.p.rapidapi.com/search?query=software%20developer%20in%20${locationCookie ?? DEFAULT_LOCATION}${type}`,
    {
      headers: requestHeaders,
    },
  );

  console.log(res);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getEstimatedSalaries(
  jobTitle: string,
  location: string,
  radius: number,
) {
  const url = `https://jsearch.p.rapidapi.com/estimated-salary?job_title=${jobTitle}&location=${location}&radius=${radius}`;
  try {
    const res = await fetch(url, { headers: requestHeaders });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.error(error);
  }
}

export async function getTheCompanyJobs(
  query: string,
  companyName: string,
): Promise<Job> {
  const res = await fetch(
    `https://jsearch.p.rapidapi.com/search?query=${query}%20${companyName}`,
    {
      headers: requestHeaders,
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getFeaturedCompanies(
  locationCookie: string | null | undefined,
) {
  const res = await fetch(
    `https://jsearch.p.rapidapi.com/search?query=Software${
      locationCookie ?? DEFAULT_LOCATION
    }&page=1&num_pages=1`,
    { headers: requestHeaders },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getAboutTheCompany(companyName: string | null) {
  try {
    const url = `https://api.thecompaniesapi.com/v1/companies/by-name?name=${companyName}`;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Basic ${process.env.COMPANIES_API_KEY}`,
      },
    };

    const response = await fetch(url, options);
    const { companies } = await response.json();
    return companies[0];
  } catch (e) {
    console.error(e);
  }
}
