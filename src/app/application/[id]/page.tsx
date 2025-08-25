"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  getApplicationDetail,
  updateApplicationStatus,
  type ApplicationDetail,
} from "@/lib/api";
import { useAuth } from "@/components/AuthContext";

function formatDate(iso?: string) {
  if (!iso) return "-";
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

function StatusPill({ status }: { status: ApplicationDetail["status"] }) {
  const map: Record<ApplicationDetail["status"], string> = {
    applied: "bg-yellow-100 text-yellow-800",
    reviewed: "bg-blue-100 text-blue-800",
    interview: "bg-indigo-100 text-indigo-800",
    offer: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };
  const label: Record<ApplicationDetail["status"], string> = {
    applied: "Applied",
    reviewed: "Reviewed",
    interview: "Interview",
    offer: "Offer",
    rejected: "Rejected",
  };
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${map[status]}`}>
      {label[status]}
    </span>
  );
}

export default function ApplicationDetailPage() {
  const params = useParams<{ id: string }>();
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [app, setApp] = useState<ApplicationDetail | null>(null);

  useEffect(() => {
    let cancelled = false;
    const id = params?.id;
    async function run() {
      if (!id) {
        setError("Missing application id");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const detail = await getApplicationDetail(id);
        if (!cancelled) setApp(detail);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Failed to load application");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [params?.id]);

  const canAct = user?.role === "recruiter";

  async function setStatus(next: ApplicationDetail["status"]) {
    if (!app) return;
    try {
      const updated = await updateApplicationStatus(app.id, next);
      if (updated) setApp({ ...app, status: updated.status });
    } catch (e) {
      setError("Failed to update status");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Application Details</h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Review candidate application and take action</p>
        </div>
        <button
          className="hidden md:inline-flex items-center justify-center rounded-md bg-[#1E40AF] px-5 py-2 text-sm font-semibold text-white hover:opacity-95"
          onClick={() => router.push("/application")}
        >
          Back to Applications
        </button>
      </div>

      {loading && (
        <div className="rounded-xl detail-card p-4">
          <p className="text-sm">Loading…</p>
        </div>
      )}

      {error && (
        <div className="rounded-xl detail-card p-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {!loading && app && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Candidate */}
          <div className="rounded-xl detail-card p-4 space-y-3 lg:col-span-2">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold">{app.candidate.name}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">{app.candidate.email}</p>
              </div>
              <StatusPill status={app.status} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="text-xs uppercase text-gray-500">Job</div>
                <div className="font-medium">
                  <Link href={`/jobs/${app.job.id}`} className="hover:text-[#1E40AF]">
                    {app.job.title}
                  </Link>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{app.job.companyName}</div>
              </div>

              <div>
                <div className="text-xs uppercase text-gray-500">Submitted</div>
                <div className="font-medium">{formatDate(app.submittedAt)}</div>
              </div>

              {app.applicantName && (
                <div>
                  <div className="text-xs uppercase text-gray-500">Applicant Name</div>
                  <div className="font-medium">{app.applicantName}</div>
                </div>
              )}
              {app.applicantEmail && (
                <div>
                  <div className="text-xs uppercase text-gray-500">Applicant Email</div>
                  <div className="font-medium">{app.applicantEmail}</div>
                </div>
              )}

              {app.linkedin && (
                <div>
                  <div className="text-xs uppercase text-gray-500">LinkedIn</div>
                  <a href={app.linkedin} target="_blank" className="text-[#1E40AF] underline break-all">
                    {app.linkedin}
                  </a>
                </div>
              )}
              {app.portfolio && (
                <div>
                  <div className="text-xs uppercase text-gray-500">Portfolio</div>
                  <a href={app.portfolio} target="_blank" className="text-[#1E40AF] underline break-all">
                    {app.portfolio}
                  </a>
                </div>
              )}

              {/* Resume viewer removed per request */}
            </div>

            {app.coverLetter && (
              <div className="pt-2">
                <div className="text-xs uppercase text-gray-500 mb-1">Cover Letter</div>
                <div className="whitespace-pre-wrap text-sm leading-6">{app.coverLetter}</div>
              </div>
            )}

            {app.note && (
              <div className="pt-2">
                <div className="text-xs uppercase text-gray-500 mb-1">Candidate Note</div>
                <div className="whitespace-pre-wrap text-sm leading-6">{app.note}</div>
              </div>
            )}
          </div>

          {/* Right: Actions */}
          <div className="rounded-xl detail-card p-4 space-y-4">
            <h3 className="font-semibold">Actions</h3>
            {canAct ? (
              <div className="space-y-3">
                <button
                  onClick={() => setStatus("interview")}
                  className="w-full inline-flex items-center justify-center rounded-md bg-[#10B981] px-4 py-2 text-sm font-semibold text-white hover:opacity-95"
                >
                  Advance to Interview
                </button>
                <button
                  onClick={() => setStatus("reviewed")}
                  className="w-full inline-flex items-center justify-center rounded-md bg-[#1E40AF] px-4 py-2 text-sm font-semibold text-white hover:opacity-95"
                >
                  Mark as Reviewed
                </button>
                <button
                  onClick={() => setStatus("rejected")}
                  className="w-full inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:opacity-95"
                >
                  Reject
                </button>
              </div>
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-300">Only recruiters can update status.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
