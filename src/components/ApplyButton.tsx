"use client";
import { useState } from "react";
import ApplyModal from "@/components/ApplyModal";
import { useAuth } from "@/components/AuthContext";
import { useRouter } from "next/navigation";

export default function ApplyButton({ jobId, className = "" }: { jobId: string; className?: string }) {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  return (
    <>
      <button
        onClick={() => {
          if (!user) {
            const next = typeof window !== "undefined" ? window.location.pathname : "/";
            router.push(`/login?next=${encodeURIComponent(next)}`);
            return;
          }
          setOpen(true);
        }}
        className={`inline-flex items-center justify-center rounded-md bg-[#1E40AF] px-6 py-3 text-sm font-semibold text-white hover:opacity-95 ${className}`}
      >
        Apply Now
      </button>
      <ApplyModal open={open} onClose={() => setOpen(false)} jobId={jobId} />
    </>
  );
}
