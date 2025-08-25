import { Job } from "@/data/types";

export const jobs: Job[] = [
  {
    id: "j1",
    title: "Senior Frontend Engineer",
    companyId: "c1",
    location: "San Francisco, CA",
    tags: ["React", "TypeScript", "Next.js"],
    description:
      "We are looking for a Senior Frontend Engineer to build delightful experiences with React and Next.js.",
    type: "Full-time",
    salary: "$160k - $190k + equity",
    createdAt: new Date().toISOString(),
  },
  {
    id: "j2",
    title: "Product Designer",
    companyId: "c2",
    location: "New York, NY",
    tags: ["Figma", "UX", "UI"],
    description:
      "Design intuitive product flows and beautiful interfaces. Collaborate closely with PM and Engineering.",
    type: "Full-time",
    salary: "$120k - $150k",
    createdAt: new Date().toISOString(),
  },
  {
    id: "j3",
    title: "Backend Engineer (Node.js)",
    companyId: "c3",
    location: "Remote",
    tags: ["Node.js", "Express", "PostgreSQL"],
    description:
      "Build robust APIs and services with Node.js and PostgreSQL. Experience with cloud infra is a plus.",
    type: "Remote",
    salary: "$140k - $170k",
    createdAt: new Date().toISOString(),
  },
  {
    id: "j4",
    title: "Data Analyst",
    companyId: "c2",
    location: "Hybrid - NYC",
    tags: ["SQL", "Python", "Dashboards"],
    description:
      "Analyze data and build dashboards to surface insights for business and product teams.",
    type: "Contract",
    salary: "$70 - $90/hr",
    createdAt: new Date().toISOString(),
  },
];
