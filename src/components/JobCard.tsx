import Image from "next/image";
import { Job } from "@/data/types";
import { companiesById } from "@/data/companies";
import { BorderButton } from "@/components/Button";
import ApplyButton from "@/components/ApplyButton";

export default function JobCard({ job, variant = "default" }: { job: Job; variant?: "default" | "outlined" }) {
  const company = companiesById[job.companyId];
  return (
    <div
      className={`jobcard rounded-xl p-5 flex flex-col gap-6 shadow drop-shadow-indigo-500 ${
        variant === "outlined"
          ? "bg-white border border-[#E9D5FF]"
          : "bg-white dark:bg-black/70"
      }`}
    >
      {/* Title + Badge + Bookmark */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-base ">{job.title}</h3>
          <div className="mt-1 flex items-center gap-3">
            <span className="inline-flex items-center rounded-md px-2.5 py-0.5 text-[11px] font-bold tracking-wide bg-[#E9D5FF] text-[#7C3AED]  ">
              {job.type.toUpperCase()}
            </span>
            {job.salary && (
              <span className="text-xs ">Salary: {job.salary}</span>
            )}
          </div>
        </div>
        <button
          aria-label="Save job"
          className="p-1.5 rounded hover:bg-white/50 dark:hover:bg-white/10"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-500"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      </div>

      {/* Company + location */}
      <div className="flex items-center gap-3">
        {company?.logoUrl ? (
          <Image
            src={company.logoUrl}
            alt={company.name}
            width={28}
            height={28}
            className="rounded"
          />
        ) : (
          <div className="w-7 h-7 rounded bg-white/70 flex items-center justify-center text-[10px] font-semibold ">
            {company?.name?.[0] ?? ""}
          </div>
        )}
        <div className="text-sm">
          <div className="font-medium ">{company?.name}</div>
          <div className="flex items-center gap-1 ">
            <svg
              aria-hidden
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-[#7C3AED]"
            >
              <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {job.location}
          </div>
        </div>
      </div>

      {/* Applicants */}
      <div className="flex items-center gap-3">
        <div className="flex -space-x-2">
          <div className="w-6 h-6 rounded-full ring-2 ring-white bg-[#FDE68A]"></div>
          <div className="w-6 h-6 rounded-full ring-2 ring-white bg-[#93C5FD]"></div>
          <div className="w-6 h-6 rounded-full ring-2 ring-white bg-[#FCA5A5]"></div>
        </div>
        <span className="text-sm ">10+ applicants</span>
      </div>

      {/* Actions */}
      <div className="mt-1 flex items-center gap-3">
        <BorderButton href={`/jobs/${job.id}`} className=" ">
          View details
        </BorderButton>
        <ApplyButton jobId={job.id} />
      </div>
    </div>
  );
}

