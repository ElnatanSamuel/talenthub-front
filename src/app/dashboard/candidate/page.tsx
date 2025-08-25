import JobList from "@/components/JobList";
import { applications } from "@/data/applications";
import { jobs } from "@/data/jobs";
import { users } from "@/data/users";

export default function CandidateDashboard() {
  const user = users.find((u) => u.role === "candidate")!;
  const saved = jobs.filter((j) => user.savedJobs?.includes(j.id));
  const appliedJobIds = new Set(applications.filter((a) => a.userId === user.id).map((a) => a.jobId));
  const applied = jobs.filter((j) => appliedJobIds.has(j.id));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Candidate Dashboard</h1>
        <p className="text-gray-600">Welcome, {user.name}</p>
      </div>

      <section>
        <h2 className="text-lg font-semibold mb-3">Saved jobs</h2>
        {saved.length ? <JobList jobs={saved} /> : <p className="text-gray-600">No saved jobs yet.</p>}
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Applied jobs</h2>
        {applied.length ? <JobList jobs={applied} /> : <p className="text-gray-600">You haven't applied to any jobs yet.</p>}
      </section>
    </div>
  );
}
