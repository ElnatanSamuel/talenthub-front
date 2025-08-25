"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { applyToJob, uploadResume } from "@/lib/api";
import { useAuth } from "@/components/AuthContext";

export default function ApplyModal({
  open,
  onClose,
  jobId,
}: {
  open: boolean;
  onClose: () => void;
  jobId: string;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  if (!open) return null;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!user) {
      const next =
        typeof window !== "undefined" ? window.location.pathname : "/";
      router.push(`/login?next=${encodeURIComponent(next)}`);
      return;
    }

    const form = e.currentTarget as HTMLFormElement;
    const fd = new FormData(form);
    const applicantName = String(fd.get("name") || "").trim() || undefined;
    const applicantEmail = String(fd.get("email") || "").trim() || undefined;
    const linkedin = String(fd.get("linkedin") || "").trim() || undefined;
    const portfolio = String(fd.get("portfolio") || "").trim() || undefined;
    const coverLetter = String(fd.get("coverLetter") || "").trim() || undefined;

    setLoading(true);
    try {
      let resumeUrl: string | undefined;
      if (resumeFile) {
        const url = await uploadResume(resumeFile);
        if (url) resumeUrl = url;
      }
      const app = await applyToJob({
        jobId,
        userId: user.id,
        applicantName,
        applicantEmail,
        linkedin,
        portfolio,
        coverLetter,
        resumeUrl,
      });
      if (!app) throw new Error("Failed to apply");
      setSuccess("Application submitted successfully!");
      form.reset();
      setResumeFile(null);
    } catch (err: any) {
      setError(
        err?.message || "Could not submit application. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="apply-modal dark relative z-10 w-full max-w-lg rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Apply to this job</h2>
          <button onClick={onClose} aria-label="Close" className="rounded p-1 ">
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                name="name"
                defaultValue={user?.name || ""}
                placeholder="Your full name"
                className="w-full rounded-md border px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                name="email"
                type="email"
                defaultValue={user?.email || ""}
                placeholder="you@example.com"
                className="w-full rounded-md border px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">LinkedIn</label>
              <input
                name="linkedin"
                placeholder="https://linkedin.com/in/.."
                className="w-full rounded-md border px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Portfolio
              </label>
              <input
                name="portfolio"
                placeholder="https://yourportfolio.com"
                className="w-full rounded-md border px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Cover Letter
            </label>
            <textarea
              name="coverLetter"
              rows={4}
              className="w-full rounded-md border px-3 py-2 text-sm"
              placeholder="Briefly introduce yourself and why you're a great fit"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Resume (PDF)
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
              className="block w-full text-sm"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md px-4 py-2 text-sm hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-[#1E40AF] px-5 py-2 text-sm font-semibold text-white hover:opacity-95 disabled:opacity-60"
            >
              {loading ? "Submitting…" : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
