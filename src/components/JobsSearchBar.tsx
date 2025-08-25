"use client";

export default function JobsSearchBar() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="job-search-form mt-4 rounded-md  p-3 sm:p-4  dark"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex min-h-[44px] flex-1 items-center gap-4 rounded-lg px-3 sm:px-4">
          <div className="flex flex-1 items-center gap-2 text-sm text-gray-500">
            <IconSearch className="h-4 w-4 text-gray-400" />
            <input
              className="w-full bg-transparent outline-none placeholder:text-gray-400"
              placeholder="Enter Job title"
            />
          </div>
          <span className="hidden h-6 w-px bg-gray-300 sm:block" />
          <div className="flex flex-1 items-center gap-2 text-sm text-gray-500">
            <IconLocation className="h-4 w-4 text-gray-400" />
            <input
              className="w-full bg-transparent outline-none placeholder:text-gray-400"
              placeholder="Enter location"
            />
          </div>
          <span className="hidden h-6 w-px bg-gray-300 sm:block" />
          <div className="flex flex-1 items-center gap-2 text-sm text-gray-500">
            <IconBriefcase className="h-4 w-4 text-gray-400" />
            <input
              className="w-full bg-transparent outline-none placeholder:text-gray-400"
              placeholder="Years of experience"
            />
          </div>
        </div>
        <button
          type="submit"
          className="h-[44px] shrink-0 rounded-md bg-[#7C3AED] px-5 text-sm font-semibold text-white hover:opacity-95"
        >
          Search
        </button>
      </div>
    </form>
  );
}

function IconSearch({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  );
}
function IconLocation({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function IconBriefcase({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
    </svg>
  );
}
