import JobList from "@/components/JobList";
import { jobs } from "@/data/jobs";
import { users } from "@/data/users";
import NewJobForm from "@/components/NewJobForm";

export default function RecruiterDashboard() {
  const recruiter = users.find((u) => u.role === "recruiter")!;
  const posted = jobs.filter((j) => j.companyId === recruiter.companyId);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Recruiter Dashboard</h1>
        <p className="text-gray-600">Manage your postings</p>
      </div>

      <section>
        <h2 className="text-lg font-semibold mb-3">Your posted jobs</h2>
        {posted.length ? <JobList jobs={posted} /> : <p className="text-gray-600">No postings yet.</p>}
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Post a new job</h2>
        <NewJobForm />
      </section>
    </div>
  );
}
