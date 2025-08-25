import { Job } from "@/data/types";
import JobCard from "@/components/JobCard";

export default function JobList({
  jobs,
  variant = "default",
  className = "",
}: {
  jobs: Job[];
  variant?: "default" | "outlined";
  className?: string;
}) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} variant={variant} />
      ))}
    </div>
  );
}
