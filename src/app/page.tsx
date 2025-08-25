import JobList from "@/components/JobList";
import { LinkButton } from "@/components/Button";
import HeroSearch from "@/components/HeroSearch";
import CategoryBrowse from "@/components/CategoryBrowse";
import Image from "next/image";
import { getJobs } from "@/lib/api";
import RecruiterGate from "@/components/RecruiterGate";

export default async function Home() {
  const jobs = await getJobs();
  return (
    <div className="space-y-12">
      <RecruiterGate to="/employers" />
      {/* Hero */}
      <section className="py-2 sm:py-4">
        <div className="bg-hero-gradient rounded-md px-4 sm:px-10 py-4   text-white   shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <p className="text-sm sm:text-base opacity-90">Welcome,</p>
              <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
                Find talent for your job
              </h1>
              <p className="text-white/90 max-w-xl">
                Access over 130K skilled professionals ready to join
                fast-growing startups and leading companies.
              </p>
              <HeroSearch />
            </div>
            <div className="relative h-44 sm:h-56 md:h-64 lg:h-72">
              <Image
                src="/images/heroill.png"
                alt="People collaborating illustration"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <CategoryBrowse />

      {/* Featured jobs */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Featured jobs</h2>
          <LinkButton href="/jobs" variant="ghost">
            View all
          </LinkButton>
        </div>
        <JobList jobs={jobs.slice(0, 6)} />
      </section>
    </div>
  );
}
