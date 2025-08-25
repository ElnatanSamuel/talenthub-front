import { User } from "@/data/types";

export const users: User[] = [
  {
    id: "u1",
    name: "Jane Candidate",
    email: "jane@example.com",
    role: "candidate",
    savedJobs: ["j1", "j3"],
  },
  {
    id: "u2",
    name: "Mike Recruiter",
    email: "mike@acme.com",
    role: "recruiter",
    companyId: "c1",
  },
];
