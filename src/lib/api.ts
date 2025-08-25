// Simple API client for TalentHub web to talk to the Express server
// Configure base URL via NEXT_PUBLIC_API_BASE_URL, default http://localhost:4000

import type { Job as WebJob } from "@/data/types";
import type { User as WebUser, Role } from "@/data/types";

// const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_BASE = "http://localhost:4000";

type ApiResponse<T> = { ok: boolean; data?: T; error?: string };

type UserServer = {
  id: string;
  name: string;
  email: string;
  role: Role;
  companyId?: string;
  savedJobs?: string[];
};

type JobServer = {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  type: "full-time" | "part-time" | "contract" | "internship";
  location: string;
  salary?: string;
  description?: string;
  applicationsCount?: number;
  vacancies?: number;
};

type ApplicationServer = {
  id: string;
  jobId: string;
  userId: string;
  status: "applied" | "review" | "interview" | "rejected" | "hired";
  submittedAt: string;
  note?: string;
};

type RecruiterApplicationServer = {
  id: string;
  jobId: string;
  jobTitle: string;
  userId: string;
  candidateName: string;
  candidateEmail: string;
  status: "applied" | "review" | "interview" | "rejected" | "hired";
  submittedAt: string;
};

export type ApplicationWeb = {
  id: string;
  jobId: string;
  userId: string;
  status: "applied" | "reviewed" | "interview" | "offer" | "rejected";
  appliedAt: string;
};

export type RecruiterApplicationWeb = {
  id: string;
  jobId: string;
  jobTitle: string;
  userId: string;
  candidateName: string;
  candidateEmail: string;
  status: "applied" | "reviewed" | "interview" | "offer" | "rejected";
  appliedAt: string;
};

function toTitleCaseType(t: JobServer["type"]): WebJob["type"] {
  switch (t) {
    case "full-time":
      return "Full-time";
    case "part-time":
      return "Part-time";
    case "contract":
      return "Contract";
    case "internship":
      return "Internship";
    default:
      return "Remote"; // fallback, not present on server but exists on web types
  }
}

function mapJob(s: JobServer): WebJob {
  return {
    id: s.id,
    title: s.title,
    companyId: s.companyId,
    companyName: s.companyName,
    location: s.location,
    tags: [],
    description: s.description ?? "",
    type: toTitleCaseType(s.type),
    salary: s.salary,
    createdAt: new Date().toISOString(),
    applicationsCount: s.applicationsCount,
    vacancies: s.vacancies,
  };
}

function mapApplication(a: ApplicationServer): ApplicationWeb {
  const statusMap: Record<
    ApplicationServer["status"],
    ApplicationWeb["status"]
  > = {
    applied: "applied",
    review: "reviewed",
    interview: "interview",
    rejected: "rejected",
    hired: "offer",
  };
  return {
    id: a.id,
    jobId: a.jobId,
    userId: a.userId,
    status: statusMap[a.status],
    appliedAt: a.submittedAt,
  };
}

function mapRecruiterApplication(
  a: RecruiterApplicationServer
): RecruiterApplicationWeb {
  const statusMap: Record<
    RecruiterApplicationServer["status"],
    RecruiterApplicationWeb["status"]
  > = {
    applied: "applied",
    review: "reviewed",
    interview: "interview",
    rejected: "rejected",
    hired: "offer",
  };
  return {
    id: a.id,
    jobId: a.jobId,
    jobTitle: a.jobTitle,
    userId: a.userId,
    candidateName: a.candidateName,
    candidateEmail: a.candidateEmail,
    status: statusMap[a.status],
    appliedAt: a.submittedAt,
  };
}

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const authHeader: Record<string, string> = (() => {
    try {
      if (typeof window !== "undefined") {
        const t = localStorage.getItem("th_token");
        return t ? { Authorization: `Bearer ${t}` } : {};
      }
    } catch {}
    return {} as Record<string, string>;
  })();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...authHeader,
    ...(init?.headers as Record<string, string> | undefined),
  };
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers,
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`API ${res.status} ${res.statusText}`);
  return res.json();
}

function mapUser(u: UserServer): WebUser {
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    companyId: u.companyId,
    savedJobs: u.savedJobs,
  };
}

export async function getJobs(params?: {
  q?: string;
  location?: string;
  types?: WebJob["type"][]; // e.g., ["Full-time", "Contract"]
  companyId?: string;
  modes?: ("on-site" | "remote" | "hybrid")[];
  exps?: string[]; // ["entry","junior","mid","senior","lead","director"]
  salaryMin?: number;
  salaryMax?: number;
}): Promise<WebJob[]> {
  const query = new URLSearchParams();
  if (params?.q) query.set("q", params.q);
  if (params?.location) query.set("location", params.location);
  if (params?.companyId) query.set("companyId", params.companyId);
  if (params?.types && params.types.length) {
    const typeMap: Record<WebJob["type"], string> = {
      "Full-time": "full-time",
      "Part-time": "part-time",
      Contract: "contract",
      Internship: "internship",
      Remote: "full-time",
    };
    const list = params.types
      .map((t) => typeMap[t])
      .filter(Boolean)
      .join(",");
    if (list) query.set("type", list);
  }
  const path = query.toString() ? `/jobs?${query.toString()}` : "/jobs";
  const json = await fetchJson<ApiResponse<JobServer[]>>(path);
  if (!json.ok || !json.data) return [];
  const jobs = json.data.map(mapJob);

  // Client-side filtering for mode/experience/salary (backend not yet supporting these)
  const modes = params?.modes?.length ? new Set(params.modes) : null;
  const exps = params?.exps?.length ? new Set(params.exps) : null;
  const salaryMin = params?.salaryMin;
  const salaryMax = params?.salaryMax;

  function deriveMode(j: WebJob): "on-site" | "remote" | "hybrid" {
    const loc = (j.location || "").toLowerCase();
    const text = `${j.title} ${j.description || ""}`.toLowerCase();
    if (loc.includes("remote") || text.includes("remote")) return "remote";
    if (text.includes("hybrid")) return "hybrid";
    return "on-site";
  }

  function deriveExp(j: WebJob): "entry" | "junior" | "mid" | "senior" | "lead" | "director" {
    const t = `${j.title} ${j.description || ""}`.toLowerCase();
    if (t.includes("director") || t.includes("executive")) return "director";
    if (t.includes("lead") || t.includes("manager")) return "lead";
    if (t.includes("senior") || /\bsr\b/.test(t)) return "senior";
    if (t.includes("mid") || t.includes("intermediate")) return "mid";
    if (t.includes("junior") || /\bjr\b/.test(t)) return "junior";
    if (t.includes("intern") || t.includes("entry") || t.includes("fresher")) return "entry";
    // default bucket
    return "mid";
  }

  function parseSalaryBounds(s?: string): { min?: number; max?: number } {
    if (!s) return {};
    const nums: number[] = [];
    const re = /([\d,.]+)\s*(k)?/gi;
    let m: RegExpExecArray | null;
    while ((m = re.exec(s))) {
      const raw = m[1].replace(/,/g, "");
      let val = parseFloat(raw);
      if (!isFinite(val)) continue;
      if (m[2]) val *= 1000; // handle 'k'
      nums.push(val);
    }
    if (!nums.length) return {};
    const min = Math.min(...nums);
    const max = Math.max(...nums);
    return { min, max };
  }

  const filtered = jobs.filter((j) => {
    if (modes) {
      const m = deriveMode(j);
      if (!modes.has(m)) return false;
    }
    if (exps) {
      const e = deriveExp(j);
      if (!exps.has(e)) return false;
    }
    if (typeof salaryMin === "number" || typeof salaryMax === "number") {
      const { min, max } = parseSalaryBounds(j.salary);
      if (typeof salaryMin === "number" && (max == null || max < salaryMin)) return false;
      if (typeof salaryMax === "number" && (min == null || min > salaryMax)) return false;
    }
    return true;
  });

  return filtered;
}

export async function getJob(id: string): Promise<WebJob | null> {
  const json = await fetchJson<ApiResponse<JobServer>>(`/jobs/${id}`);
  if (!json.ok || !json.data) return null;
  return mapJob(json.data);
}

export async function getRecruiterApplications(
  companyId?: string
): Promise<RecruiterApplicationWeb[]> {
  const path = companyId
    ? `/applications/recruiter?companyId=${encodeURIComponent(companyId)}`
    : `/applications/recruiter`;
  const json = await fetchJson<ApiResponse<RecruiterApplicationServer[]>>(path);
  if (!json.ok || !json.data) return [];
  return json.data.map(mapRecruiterApplication);
}

export async function getUser(id: string): Promise<WebUser | null> {
  const json = await fetchJson<ApiResponse<UserServer>>(`/users/${id}`);
  if (!json.ok || !json.data) return null;
  return mapUser(json.data);
}

export async function getApplications(
  userId: string
): Promise<ApplicationWeb[]> {
  const json = await fetchJson<ApiResponse<ApplicationServer[]>>(
    `/applications?userId=${encodeURIComponent(userId)}`
  );
  if (!json.ok || !json.data) return [];
  return json.data.map(mapApplication);
}

export async function applyToJob(params: {
  jobId: string;
  userId: string;
  note?: string;
  applicantName?: string;
  applicantEmail?: string;
  linkedin?: string;
  portfolio?: string;
  coverLetter?: string;
  resumeUrl?: string;
}): Promise<ApplicationWeb | null> {
  const json = await fetchJson<ApiResponse<ApplicationServer>>(
    `/applications`,
    {
      method: "POST",
      body: JSON.stringify(params),
    }
  );
  if (!json.ok || !json.data) return null;
  return mapApplication(json.data);
}

// Application detail for recruiters
export type ApplicationDetail = {
  id: string;
  status: ApplicationWeb["status"];
  submittedAt: string;
  note?: string;
  applicantName?: string;
  applicantEmail?: string;
  linkedin?: string;
  portfolio?: string;
  coverLetter?: string;
  resumeUrl?: string;
  job: { id: string; title: string; companyId: string; companyName: string };
  candidate: { id: string; name: string; email: string };
};

export async function getApplicationDetail(
  id: string
): Promise<ApplicationDetail | null> {
  const json = await fetchJson<ApiResponse<any>>(`/applications/${id}`);
  if (!json.ok || !json.data) return null;
  const s = json.data as any;
  const statusMap: Record<string, ApplicationWeb["status"]> = {
    applied: "applied",
    review: "reviewed",
    interview: "interview",
    rejected: "rejected",
    hired: "offer",
  };
  return {
    id: s.id,
    status: statusMap[s.status] ?? "applied",
    submittedAt: s.submittedAt,
    note: s.note,
    applicantName: s.applicantName,
    applicantEmail: s.applicantEmail,
    linkedin: s.linkedin,
    portfolio: s.portfolio,
    coverLetter: s.coverLetter,
    resumeUrl: s.resumeUrl,
    job: s.job,
    candidate: s.candidate,
  };
}

export async function updateApplicationStatus(
  id: string,
  status: ApplicationWeb["status"]
): Promise<{ id: string; status: ApplicationWeb["status"] } | null> {
  // Map web -> server
  const toServer: Record<ApplicationWeb["status"], string> = {
    applied: "applied",
    reviewed: "review",
    interview: "interview",
    rejected: "rejected",
    offer: "hired",
  };
  const json = await fetchJson<ApiResponse<{ id: string; status: string }>>(
    `/applications/${id}/status`,
    {
      method: "PATCH",
      body: JSON.stringify({ status: toServer[status] }),
    }
  );
  if (!json.ok || !json.data) return null;
  const back = json.data.status;
  const fromServer: Record<string, ApplicationWeb["status"]> = {
    applied: "applied",
    review: "reviewed",
    interview: "interview",
    rejected: "rejected",
    hired: "offer",
  };
  return { id: json.data.id, status: fromServer[back] ?? "applied" };
}

export async function uploadResume(file: File): Promise<string | null> {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(`${API_BASE}/upload/resume`, {
    method: "POST",
    body: form,
    cache: "no-store",
  });
  if (!res.ok) return null;
  const json = (await res.json()) as ApiResponse<{ url: string }>;
  if (!json.ok || !json.data) return null;
  return json.data.url;
}

// Auth
export async function login(params: {
  email: string;
  password: string;
}): Promise<{ token: string; user: WebUser } | null> {
  const json = await fetchJson<
    ApiResponse<{ token: string; user: UserServer }>
  >(`/auth/login`, {
    method: "POST",
    body: JSON.stringify(params),
  });
  if (!json || !json.ok || !json.data) return null;
  const { token, user } = json.data;
  return { token, user: mapUser(user) };
}

export async function register(params: {
  name: string;
  email: string;
  password: string;
  role?: Role;
}): Promise<{ token: string; user: WebUser } | null> {
  const json = await fetchJson<
    ApiResponse<{ token: string; user: UserServer }>
  >(`/auth/register`, {
    method: "POST",
    body: JSON.stringify(params),
  });
  if (!json || !json.ok || !json.data) return null;
  const { token, user } = json.data;
  return { token, user: mapUser(user) };
}

export async function logout(): Promise<boolean> {
  try {
    const json = await fetchJson<ApiResponse<null>>(`/auth/logout`, {
      method: "POST",
    });
    return !!json && json.ok;
  } catch {
    return false;
  }
}

// Jobs (create)
export async function createJob(params: {
  title: string;
  type: WebJob["type"]; // "Full-time" | "Part-time" | "Contract" | "Internship" | "Remote"
  location: string;
  salary?: string;
  description?: string;
  companyId?: string;
  companyName?: string;
  vacancies?: number;
}): Promise<WebJob | null> {
  // Map UI type to server format (kebab-case)
  const typeMap: Record<WebJob["type"], string> = {
    "Full-time": "full-time",
    "Part-time": "part-time",
    Contract: "contract",
    Internship: "internship",
    Remote: "full-time", // fallback
  };
  const payload = { ...params, type: typeMap[params.type] };
  const json = await fetchJson<ApiResponse<JobServer>>(`/jobs`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (!json.ok || !json.data) return null;
  return mapJob(json.data);
}
