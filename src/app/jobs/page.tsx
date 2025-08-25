import JobList from "@/components/JobList";
import JobsSearchBar from "@/components/JobsSearchBar";
import JobsFilters from "@/components/JobsFilters";
import { getJobs } from "@/lib/api";
import RecruiterGate from "@/components/RecruiterGate";

export default async function JobsPage() {
  const jobs = await getJobs();
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
