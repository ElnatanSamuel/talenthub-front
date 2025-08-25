import Link from "next/link";

type Cat = {
  title: string;
  jobs: number;
  icon: keyof typeof Icons;
  href: string;
  featured?: boolean;
};

const categories: Cat[] = [
  {
    title: "Frontend",
    jobs: 58,
    icon: "Code",
    href: "/jobs?category=frontend",
  },
  {
    title: "Backend",
    jobs: 48,
    icon: "Server",
    href: "/jobs?category=backend",
  },
  {
    title: "Full‑Stack",
    jobs: 78,
    icon: "Stack",
    href: "/jobs?category=fullstack",
    featured: true,
  },
  { title: "Mobile", jobs: 36, icon: "Mobile", href: "/jobs?category=mobile" },
  { title: "DevOps", jobs: 52, icon: "Cloud", href: "/jobs?category=devops" },
  {
    title: "Data Engineering",
    jobs: 31,
    icon: "Database",
    href: "/jobs?category=data",
  },
  {
    title: "Security",
    jobs: 40,
    icon: "Shield",
    href: "/jobs?category=security",
  },
  {
    title: "QA / Testing",
    jobs: 29,
    icon: "Beaker",
    href: "/jobs?category=qa",
  },
];

export default function CategoryBrowse() {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Browse by category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((c) => (
          <CategoryCard key={c.title} cat={c} />
        ))}
      </div>
    </section>
  );
}

function CategoryCard({ cat }: { cat: Cat }) {
  const Icon = Icons[cat.icon];
  const base =
    "group dark category-card rounded-md px-5 py-4 flex items-center justify-between shadow drop-shadow-indigo-500  transition-colors";
  const normal =
    "bg-white border-gray-200 text-black hover:bg-gray-50 dark:bg-gray-900 dark:text-white dark:border-gray-800";
  const featured =
    "bg-[#1E40AF] border-transparent text-white hover:bg-[#1E40AF]";

  return (
    <Link href={cat.href} className={`${base}`}>
      <div className="flex items-center gap-3">
        <span
          className={`inline-flex items-center justify-ce   nter w-9 h-9 rounded-full`}
        >
          <Icon className="w-5 h-5" />
        </span>
        <div className="leading-tight">
          <div className={`font-semibold `}>{cat.title}</div>
          <div className={`text-xs`}>{cat.jobs} Jobs Available</div>
        </div>
      </div>
      <span
        className={`inline-flex items-center justify-center w-8 h-8 rounded-full border`}
      >
        <ChevronRight className="w-4 h-4" />
      </span>
    </Link>
  );
}

function ChevronRight({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

const Icons = {
  Code: ({ className = "" }: { className?: string }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <path d="M16 18l6-6-6-6" />
      <path d="M8 6L2 12l6 6" />
    </svg>
  ),
  Server: ({ className = "" }: { className?: string }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <rect x="3" y="4" width="18" height="6" rx="2" />
      <rect x="3" y="14" width="18" height="6" rx="2" />
      <path d="M7 7h.01M7 17h.01" />
    </svg>
  ),
  Stack: ({ className = "" }: { className?: string }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <path d="M12 2l9 5-9 5-9-5 9-5z" />
      <path d="M3 12l9 5 9-5" />
      <path d="M3 17l9 5 9-5" />
    </svg>
  ),
  Mobile: ({ className = "" }: { className?: string }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M11 18h2" />
    </svg>
  ),
  Cloud: ({ className = "" }: { className?: string }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <path d="M20 17.5A4.5 4.5 0 0016 13h-1a6 6 0 10-11 3" />
      <path d="M7 20h12a3 3 0 100-6" />
    </svg>
  ),
  Database: ({ className = "" }: { className?: string }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v6c0 1.7 4 3 9 3s9-1.3 9-3V5" />
      <path d="M3 11v6c0 1.7 4 3 9 3s9-1.3 9-3v-6" />
    </svg>
  ),
  Shield: ({ className = "" }: { className?: string }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <path d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z" />
    </svg>
  ),
  Beaker: ({ className = "" }: { className?: string }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <path d="M10 2v5l-6 10a3 3 0 003 5h10a3 3 0 003-5L14 7V2" />
      <path d="M8 7h8" />
    </svg>
  ),
} as const;
