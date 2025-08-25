"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";

export default function ApplyNowButton({ next = "/application" }: { next?: string }) {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <button
      onClick={() => {
        if (!user) router.push(`/login?next=${encodeURIComponent(next)}`);
        else router.push(next);
      }}
      className="inline-flex items-center justify-center rounded-md bg-[#7C3AED] px-6 py-3 text-sm font-semibold text-white hover:opacity-95 w-full"
    >
      Apply Now
    </button>
  );
}
