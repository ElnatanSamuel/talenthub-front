"use client";
import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import { createJob } from "@/lib/api";

export default function Employers() {
  const { user } = useAuth();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!user) router.replace("/login?next=/employers");
  }, [user, router]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const title = String(formData.get("jobTitle") || "").trim();
    const country = String(formData.get("country") || "").trim();
    const city = String(formData.get("city") || "").trim();
    const location = [city, country].filter(Boolean).join(", ");
    const minSalary = String(formData.get("minSalary") || "").trim();
    const maxSalary = String(formData.get("maxSalary") || "").trim();
    const salaryType = String(formData.get("salaryType") || "").trim();
    const companyName = String(formData.get("companyName") || "").trim();
    const jd = String(formData.get("jd") || "").trim();
    const vacanciesRaw = String(formData.get("vacancies") || "").trim();
    const baseSalary = minSalary || maxSalary ? `${minSalary}${minSalary && maxSalary ? "-" : ""}${maxSalary}` : undefined;
    const salary = baseSalary && salaryType
      ? `${baseSalary} ${salaryType.toLowerCase()}`
      : baseSalary || undefined;
    if (!title || !location) {
      setError("Please fill required fields: Job Title and Location.");
      return;
    }
    setSubmitting(true);
    try {
      const payload: any = {
        title,
        type: "Full-time",
        location,
        description: jd,
      };
      if (salary) payload.salary = salary;
      if (user?.companyId) payload.companyId = user.companyId;
      if (companyName) payload.companyName = companyName;
      const vacanciesNum = Number(vacanciesRaw);
      if (Number.isFinite(vacanciesNum) && vacanciesNum > 0) payload.vacancies = vacanciesNum;
      const job = await createJob(payload);
      if (!job) throw new Error("Failed to create job");
      form.reset();
      setSuccess("Job posted successfully!");
    } catch (err: any) {
      setError(err?.message || "Could not post job. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Post a job</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Find the best talent for your company
        </p>
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} className="space-y-6">
        {/* Job Title */}
        <div>
          <label htmlFor="jobTitle" className="block text-sm font-medium mb-2">
            Job Title
          </label>
          <input
            id="jobTitle"
            name="jobTitle"
            placeholder="Add job title, role vacancies etc"
            className="w-full job-search-form rounded-md  px-4 py-3 text-sm outline-none placeholder:text-gray-400 "
          />
        </div>

        {/* Company Name (optional) */}
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium mb-2">
            Company Name (optional)
          </label>
          <input
            id="companyName"
            name="companyName"
            placeholder="e.g., Private Client or Acme Corp"
            className="w-full job-search-form rounded-md px-4 py-3 text-sm outline-none placeholder:text-gray-400 "
          />
        </div>

        {/* Grid rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium mb-2">
              Tags
            </label>
            <input
              id="tags"
              name="tags"
              placeholder="Job keyword, tags etc."
              className="w-full job-search-form rounded-md px-4 py-3 text-sm outline-none placeholder:text-gray-400 "
            />
          </div>

          {/* Job Role */}
          <div>
            <label className="block text-sm font-medium mb-2">Job Role</label>
            <div className="relative">
              <select name="jobRole" className="w-full appearance-none job-search-form rounded-md px-4 py-3 text-sm outline-none ">
                <option value="">Select..</option>
                <option>Designer</option>
                <option>Frontend Engineer</option>
                <option>Backend Engineer</option>
                <option>Product Manager</option>
              </select>
              <ChevronDownIcon />
            </div>
          </div>

          {/* Salary section label (full width) */}
          <div className="md:col-span-2">
            <div className="text-sm font-medium mb-2">Salary</div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4">
              {/* Min Salary */}
              <div>
                <label
                  htmlFor="minSalary"
                  className="block text-xs font-medium text-gray-600 mb-1"
                >
                  Min Salary
                </label>
                <div className="relative">
                  <input
                    id="minSalary"
                    name="minSalary"
                    placeholder="Minimum Salary.."
                    className="w-full job-search-form pl-4 pr-12 py-3 text-sm outline-none placeholder:text-gray-400"
                  />
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-gray-500">
                    USD
                  </span>
                </div>
              </div>
              {/* Max Salary */}
              <div>
                <label
                  htmlFor="maxSalary"
                  className="block text-xs font-medium text-gray-600 mb-1"
                >
                  Max Salary
                </label>
                <div className="relative">
                  <input
                    id="maxSalary"
                    name="maxSalary"
                    placeholder="Maximum Salary.."
                    className="w-full job-search-form pl-4 pr-12 py-3 text-sm outline-none placeholder:text-gray-400"
                  />
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-gray-500">
                    USD
                  </span>
                </div>
              </div>
              {/* Salary Type */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  &nbsp;
                </label>
                <div className="relative">
                  <select name="salaryType" className="w-full appearance-none job-search-form rounded-md px-4 py-3 text-sm outline-none ">
                    <option value="">Select..</option>
                    <option>Per Month</option>
                    <option>Per Year</option>
                    <option>Per Hour</option>
                  </select>
                  <ChevronDownIcon />
                </div>
              </div>
            </div>
          </div>

          {/* Vacancies */}
          <div>
            <label htmlFor="vacancies" className="block text-sm font-medium mb-2">Vacancies</label>
            <input
              id="vacancies"
              name="vacancies"
              type="number"
              min={1}
              step={1}
              placeholder="Number of open positions"
              className="w-full job-search-form rounded-md px-4 py-3 text-sm outline-none placeholder:text-gray-400 "
            />
          </div>

          {/* Job Level */}
          <div>
            <label className="block text-sm font-medium mb-2">Job Level</label>
            <div className="relative">
              <select name="jobLevel" className="w-full appearance-none job-search-form rounded-md px-4 py-3 text-sm outline-none ">
                <option value="">Select..</option>
                <option>Fresher / Entry-Level</option>
                <option>Junior</option>
                <option>Mid-Level</option>
                <option>Senior</option>
                <option>Lead / Managerial</option>
              </select>
              <ChevronDownIcon />
            </div>
          </div>

          {/* Location */}
          <div>
            <label htmlFor="country" className="block text-sm font-medium mb-2">Country</label>
            <input
              id="country"
              name="country"
              placeholder="e.g., India"
              className="w-full job-search-form rounded-md px-4 py-3 text-sm outline-none placeholder:text-gray-400 "
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium mb-2">City</label>
            <input
              id="city"
              name="city"
              placeholder="e.g., Bengaluru"
              className="w-full job-search-form rounded-md px-4 py-3 text-sm outline-none placeholder:text-gray-400 "
            />
          </div>

          {/* Description (full width) */}
          <div className="md:col-span-2">
            <label htmlFor="jd" className="block text-sm font-medium mb-2">
              Job Description
            </label>
            <div className="job-search-form rounded-md ">
              <textarea
                id="jd"
                name="jd"
                rows={6}
                placeholder="Add your description.."
                className="w-full resize-none bg-transparent px-4 py-3 text-sm outline-none placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center rounded-md bg-[#1E40AF] px-6 py-3 text-sm font-semibold text-white hover:opacity-95 disabled:opacity-60"
          >
            {submitting ? "Posting…" : "Post Job"}
          </button>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          {success && <p className="mt-2 text-sm text-green-600">{success}</p>}
        </div>
      </form>
    </div>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function ToolbarButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="inline-flex h-8 w-8 items-center justify-center rounded hover:bg-gray-100 text-sm"
    >
      {children}
    </button>
  );
}
