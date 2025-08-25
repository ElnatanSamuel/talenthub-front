import JobList from "@/components/JobList";
import JobsSearchBar from "@/components/JobsSearchBar";
import JobsFilters from "@/components/JobsFilters";
import { getJobs } from "@/lib/api";
import RecruiterGate from "@/components/RecruiterGate";

type SearchParams = { [key: string]: string | string[] | undefined };

export default async function JobsPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const q = (searchParams?.q as string) || undefined;
  const location = (searchParams?.location as string) || undefined;
  const typeParam = (searchParams?.type as string) || undefined; // kebab-case, comma-separated
  const types = (typeParam || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .map((t) => {
      switch (t) {
        case "full-time":
          return "Full-time" as const;
        case "part-time":
          return "Part-time" as const;
        case "contract":
          return "Contract" as const;
        case "internship":
          return "Internship" as const;
        default:
          return undefined;
      }
    })
    .filter(Boolean) as ("Full-time" | "Part-time" | "Contract" | "Internship")[];

  const modeParam = (searchParams?.mode as string) || undefined; // on-site,remote,hybrid
  const modes = (modeParam || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean) as ("on-site" | "remote" | "hybrid")[];

  const expParam = (searchParams?.exp as string) || undefined; // entry,junior,mid,senior,lead,director
  const exps = (expParam || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean) as string[];

  const salaryMin = searchParams?.salaryMin ? Number(searchParams.salaryMin) : undefined;
  const salaryMax = searchParams?.salaryMax ? Number(searchParams.salaryMax) : undefined;

  const jobs = await getJobs({ q, location, types, modes, exps, salaryMin, salaryMax });
  return (
    <div className="space-y-6">
      <RecruiterGate to="/employers" />
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold">Job Search</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Search for your desired job matching your skills
        </p>
      </div>

      {/* Search bar */}
      <JobsSearchBar />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[18rem_1fr]">
        {/* Left: Filters column */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-semibold">Filter</h2>
          </div>
          <JobsFilters />
        </div>

        {/* Right: Results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">All Jobs ({jobs.length})</h3>
          </div>

          <JobList
            jobs={jobs}
            variant="outlined"
            className="sm:grid-cols-2 md:!grid-cols-2 gap-6"
          />
        </div>
      </div>
    </div>
  );
}
