"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { companiesById } from "@/data/companies";
import { getApplications, getJobs, getRecruiterApplications } from "@/lib/api";
import { useAuth } from "@/components/AuthContext";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString();
  } catch {
    return iso;
  }
}

function mapStatus(status: string): { label: string; cls: string } {
  switch (status) {
    case "applied":
      return { label: "Applied", cls: "bg-yellow-100 text-yellow-800" };
    case "reviewed":
      return { label: "Reviewed", cls: "bg-blue-100 text-blue-800" };
    case "interview":
      return { label: "Interview", cls: "bg-indigo-100 text-indigo-800" };
    case "rejected":
      return { label: "Rejected", cls: "bg-red-100 text-red-700" };
    case "offer":
      return { label: "Accepted", cls: "bg-green-100 text-green-700" };
    default:
      return { label: "Ongoing", cls: "bg-yellow-100 text-yellow-800" };
  }
}

export default function ApplicationsPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [apps, setApps] = useState<Awaited<ReturnType<typeof getApplications>>>([]);
  const [allJobs, setAllJobs] = useState<Awaited<ReturnType<typeof getJobs>>>([]);
  const [recruiterApps, setRecruiterApps] = useState<Awaited<ReturnType<typeof getRecruiterApplications>>>([]);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (!user) {
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        if (user.role === "recruiter") {
          // If recruiter has no companyId, fetch across all companies
          const ra = await getRecruiterApplications(user.companyId);
          if (!cancelled) setRecruiterApps(ra);
        } else {
          const [a, j] = await Promise.all([getApplications(user.id), getJobs()]);
          if (!cancelled) {
            setApps(a);
            setAllJobs(j);
          }
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Failed to load applications");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [user]);

  const rows = useMemo(() => {
    const jobsById = new Map(allJobs.map((j) => [j.id, j] as const));
    return apps.map((a) => {
      const job = jobsById.get(a.jobId);
      const company = job ? companiesById[job.companyId] : undefined;
      const status = mapStatus(a.status);
      return {
        id: a.id,
        jobId: a.jobId,
        title: job?.title ?? "Unknown",
        company: company?.name ?? "Unknown",
        type: job?.type ?? "-",
        applied: formatDate(a.appliedAt),
        status,
      };
    });
  }, [apps, allJobs]);

  // Candidate rows mapping
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">
          {user?.role === "recruiter" ? "Applicants to Your Jobs" : "My Applications"}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          {user?.role === "recruiter"
            ? "Review candidates who applied to your job posts"
            : "Track the status of jobs you've applied to"}
        </p>
      </div>

      {!user && (
        <div className="rounded-xl detail-card p-4">
          <p className="text-sm">
            Please <Link href={`/login?next=/application`} className="text-blue-700 font-medium">log in</Link> to view your applications.
          </p>
        </div>
      )}

      {user && loading && (
        <div className="rounded-xl detail-card p-4">
          <p className="text-sm">Loading applications…</p>
        </div>
      )}

      {user && error && (
        <div className="rounded-xl detail-card p-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {user && user.role !== "recruiter" && !loading && !error && (
        <div className="rounded-xl detail-card p-4 shadow-sm shadow-indigo-500">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left ">
                  <th className="py-3 px-3 font-semibold">Title</th>
                  <th className="py-3 px-3 font-semibold">Company</th>
                  <th className="py-3 px-3 font-semibold">Job Type</th>
                  <th className="py-3 px-3 font-semibold">Applied Date</th>
                  <th className="py-3 px-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className=" ">
                    <td className="py-3 px-3">
                      <Link
                        href={`/jobs/${r.jobId}`}
                        className="hover:text-blue-800 font-medium"
                      >
                        {r.title}
                      </Link>
                    </td>
                    <td className="py-3 px-3">{r.company}</td>
                    <td className="py-3 px-3">{r.type}</td>
                    <td className="py-3 px-3">{r.applied}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${r.status.cls}`}
                      >
                        {r.status.label}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Recruiter view */}
      {user && user.role === "recruiter" && !loading && !error && (
        <div className="rounded-xl detail-card p-4 shadow-sm shadow-indigo-500">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left ">
                  <th className="py-3 px-3 font-semibold">Candidate</th>
                  <th className="py-3 px-3 font-semibold">Email</th>
                  <th className="py-3 px-3 font-semibold">Job Title</th>
                  <th className="py-3 px-3 font-semibold">Applied</th>
                  <th className="py-3 px-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {recruiterApps.map((a) => (
                  <tr key={a.id}>
                    <td className="py-3 px-3">
                      <Link href={`/application/${a.id}`} className="hover:text-blue-800 font-medium">
                        {a.candidateName || "Unknown"}
                      </Link>
                    </td>
                    <td className="py-3 px-3">{a.candidateEmail || "-"}</td>
                    <td className="py-3 px-3">
                      <Link href={`/jobs/${a.jobId}`} className="hover:text-blue-800 font-medium">
                        {a.jobTitle}
                      </Link>
                    </td>
                    <td className="py-3 px-3">{formatDate(a.appliedAt)}</td>
                    <td className="py-3 px-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${mapStatus(a.status).cls}`}>
                        {mapStatus(a.status).label}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
