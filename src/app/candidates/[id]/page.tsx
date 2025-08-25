import Link from "next/link";
import { getUser, getApplications, getJobs } from "@/lib/api";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString();
  } catch {
    return iso;
  }
}

export default async function CandidatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getUser(id);
  if (!user) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Candidate not found</h1>
        <p className="text-gray-600 dark:text-gray-300">The candidate you are looking for does not exist.</p>
        <Link href="/application" className="text-blue-700 font-medium">Back to Applications</Link>
      </div>
    );
  }

  const [apps, jobs] = await Promise.all([getApplications(user.id), getJobs()]);
  const jobsById = new Map(jobs.map((j) => [j.id, j] as const));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">{user.name}</h1>
        <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
      </div>

      <div className="rounded-xl detail-card p-4 shadow-sm shadow-indigo-500">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Applications</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left ">
                <th className="py-3 px-3 font-semibold">Job Title</th>
                <th className="py-3 px-3 font-semibold">Company</th>
                <th className="py-3 px-3 font-semibold">Applied</th>
                <th className="py-3 px-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {apps.map((a) => {
                const job = jobsById.get(a.jobId);
                return (
                  <tr key={a.id}>
                    <td className="py-3 px-3">
                      <Link href={`/jobs/${a.jobId}`} className="hover:text-blue-800 font-medium">
                        {job?.title || "Unknown"}
                      </Link>
                    </td>
                    <td className="py-3 px-3">{job?.companyName || "Unknown"}</td>
                    <td className="py-3 px-3">{formatDate(a.appliedAt)}</td>
                    <td className="py-3 px-3">{a.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
