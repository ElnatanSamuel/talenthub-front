"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [loc, setLoc] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (loc.trim()) params.set("location", loc.trim());
    router.push(`/jobs${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <form onSubmit={onSubmit} className="mt-6" aria-label="Job search">
      <div className="flex items-stretch gap-2 rounded-md bg-white text-gray-700 shadow-lg  px-2 py-2">
        {/* Query */}
        <label className="sr-only" htmlFor="hero-q">
          Job title or keywords
        </label>
        <div className="flex items-center gap-2 flex-1 px-2">
          {/* search icon */}
          <svg
            aria-hidden
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-400"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            id="hero-q"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Job title, Keyword..."
            className="w-full bg-transparent outline-none placeholder:text-gray-400"
          />
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px bg-gray-200 my-1" />

        {/* Location */}
        <label className="sr-only" htmlFor="hero-loc">
          Location
        </label>
        <div className="hidden sm:flex items-center gap-2 flex-[0.8] min-w-[140px] px-2">
          {/* location icon */}
          <svg
            aria-hidden
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-purple-600"
          >
            <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <input
            id="hero-loc"
            value={loc}
            onChange={(e) => setLoc(e.target.value)}
            placeholder="Location"
            className="w-full bg-transparent outline-none placeholder:text-gray-400"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="rounded-md bg-[#10b981] text-white px-5 py-2.5 font-medium"
        >
          Find Job
        </button>
      </div>

      {/* Suggestions */}
      <p className="mt-2 text-xs sm:text-sm text-white/90">
        Suggestion: UI/UX Designer, Programing,{" "}
        <span className="underline">Digital Marketing</span>, Video, Animation.
      </p>
    </form>
  );
}
