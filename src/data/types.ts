export type Role = "candidate" | "recruiter";
export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship" | "Remote";

export interface Company {
  id: string;
  name: string;
  location: string;
  website?: string;
  logoUrl?: string;
}

export interface Job {
  id: string;
  title: string;
  companyId: string;
  companyName?: string;
  location: string;
  tags: string[];
  description: string;
  type: JobType;
  salary?: string;
  createdAt: string; // ISO date
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  savedJobs?: string[]; // job IDs
  companyId?: string; // for recruiters
}

export interface Application {
  id: string;
  jobId: string;
  userId: string;
  status: "applied" | "reviewed" | "interview" | "offer" | "rejected";
  appliedAt: string; // ISO date
}
