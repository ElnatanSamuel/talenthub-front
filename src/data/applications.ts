import { Application } from "@/data/types";

export const applications: Application[] = [
  {
    id: "a1",
    jobId: "j1",
    userId: "u1",
    status: "applied",
    appliedAt: new Date().toISOString(),
  },
  {
    id: "a2",
    jobId: "j3",
    userId: "u1",
    status: "interview",
    appliedAt: new Date().toISOString(),
  },
];
