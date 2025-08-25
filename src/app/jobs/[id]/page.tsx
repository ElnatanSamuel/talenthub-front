import Image from "next/image";
import { notFound } from "next/navigation";
import { companiesById } from "@/data/companies";
import ApplyButton from "@/components/ApplyButton";
import { getJob } from "@/lib/api";

export default async function JobDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = await getJob(id);
  if (!job) return notFound();
  const company = companiesById[job.companyId];
  const companyName = job.companyName || company?.name || "";
  const category = /design/i.test(job.title)
    ? "Design"
    : /engineer|frontend|backend|fullstack|data/i.test(job.title)
    ? "Engineering"
    : companyName;

  const aboutRole = [
    "Build solid, secure, performant and scalable APIs to serve our front-end platforms",
    "Optimize existing codes to improve performance and efficiency",
    "Collaborate with Product, QA and IT team to deliver features and improvements",
    "Implement best practices in code quality, security and data protection",
  ];

  const whatYouNeed = [
    "Plan design efforts with PMs",
    "Deliver design concepts and solutions to meet business needs and its intended audience, in varying degrees of fidelity and detail",
    "Translate research, business requirements and business flow diagrams into user flows, wireframes, visual design mockups and functional prototypes",
    "Plan and participate in foundational user research and analysis, including translation of user insights into product implications and new ideas",
    "Participate in projects with very broadly defined concepts, and sometimes on narrowly defined, tactical deliverables",
    "Attend presentations and workshops to facilitate discussion on design feedback and alignment",
    "Manage stakeholders on design progress",
    "Work across cross-functional teams to bring concepts from ideation to execution",
    "Create design processes for respective work streams where necessary and actively shape the interdisciplinary collaboration along the process",
    "Proactively identify tasks, workflows and anticipate implications to improve the overall product experience",
    "Work closely with other designers to expand product pattern library, asset libraries and design system",
    "Prepare clear and detailed design specifications for developers",
    "Partner with developers to ensure designs are properly implemented",
  ];

  const values = [
    {
      title: "Make It Happen",
      text: "We strive to deliver results with the highest impact and are committed to following through.",
    },
    {
      title: "Be Proactive",
      text: "We seize the initiative and are always looking for continual improvement.",
    },
    {
      title: "Trust Facts Over Opinions",
      text: "Our decisions are evidence-based, weighing reason and logic.",
    },
    {
      title: "Stay Curious",
      text: "We ask questions, challenge assumptions and learn from mistakes.",
    },
    {
      title: "Do More With Less",
      text: "We balance our priorities and think strategically about impact vs. investment.",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_20rem] gap-8">
        {/* Main content */}
        <div>
          {/* Header card */}
          <div className="detail-card rounded-xl  p-8 shadow-sm shadow-indigo-500">
            <div className="flex flex-col items-center text-center">
              <h1 className="mt-3 text-2xl sm:text-2xl font-semibold">
                {job.title}
              </h1>
              <div className="mt-1 text-lg ">{companyName}</div>
              <div className="mt-1 text-sm ">
                {job.salary} - {job.type.replace(/-/g, " ")}
              </div>
              <div className="mt-2 inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {job.location}
              </div>
              {typeof job.vacancies === "number" && job.vacancies > 0 && (
                <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                  Vacancies: {job.vacancies}
                </div>
              )}
            </div>
          </div>

          <div className="pt-10 font-bold text-2xl">Job Description</div>
          <div className="pt-2">{job.description}</div>
        </div>

        {/* Sidebar */}
        <aside className="">
          <div className="">
            <ApplyButton jobId={job.id} className="w-full" />
          </div>
        </aside>
      </div>
    </div>
  );
}
