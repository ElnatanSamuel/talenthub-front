# TalentHub Frontend (Next.js)

- Framework: Next.js (App Router) + React 19 + Tailwind 4
- Env: `NEXT_PUBLIC_API_BASE_URL` → API base (default `http://localhost:4000`)
- API client: `src/lib/api.ts` (fetch wrapper with optional `Authorization` header from `localStorage` key `th_token`)

## Pages (`src/app/`)

- `page.tsx` — Landing/hero + featured jobs via `getJobs()`
- `jobs/page.tsx` — Jobs listing; supports `q`, `location`, `types` filters; uses `getJobs()`
- `jobs/[id]/page.tsx` — Job detail via `getJob(id)` and Apply button
- `application/page.tsx` — Applications overview
  - Candidate view: lists user applications
  - Recruiter view: lists recruiter applications (by `companyId` if known)
- `application/[id]/page.tsx` — Application detail view for recruiters
- `login/page.tsx` — Suspense wrapper for client login component
- `register/page.tsx` — Suspense wrapper for client register component
- `candidates/[id]/page.tsx` — Candidate profile + applications list
- `companies/page.tsx` — Placeholder
- `appointments/page.tsx` — Placeholder
- `dashboard/candidate/page.tsx` — Demo dashboard (local data)
- `dashboard/recruiter/page.tsx` — Demo dashboard (local data)

## API Client (`src/lib/api.ts`)

- Auth
  - `login({ email, password })` → `/auth/login` → stores token at app-layer
  - `register({ name, email, password, role? })` → `/auth/register`
  - `logout()` → `/auth/logout`
- Jobs
  - `getJobs({ q, location, types, companyId, modes?, exps?, salaryMin?, salaryMax? })`
    - Maps UI types ("Full-time", etc.) → server kebab-case ("full-time", etc.)
    - Applies client-side filters for mode/experience/salary
  - `getJob(id)` → single job
  - `createJob({...})` → `/jobs`
- Applications
  - `getApplications(userId)` → `/applications?userId=...`
  - `getRecruiterApplications(companyId?)` → `/applications/recruiter`
  - `applyToJob({...})` → `/applications`
  - `getApplicationDetail(id)` → `/applications/:id`
  - `updateApplicationStatus(id, status)` → `/applications/:id/status`
    - Status mapping (web ↔ server):
      - web: `applied | reviewed | interview | rejected | offer`
      - server: `applied | review | interview | rejected | hired`
  - `uploadResume(file)` → `/upload/resume`

## Data Mapping and UI Notes

- Job `type` mapping: server uses kebab-case; UI displays title-case.
- `applicationsCount` is displayed in job cards/lists.
- Company name fallback: when not provided at creation, backend assigns a fallback company `"private"` with name `"Private Client"`.
- Resume links: API may return absolute or relative URLs; UI should handle both (API detail already normalizes absolute for application detail).

## Styling / Branding

- TailwindCSS used; brand colors (guideline):
  - Primary: `#1E40AF`
  - Secondary: `#10B981`
  - Background: `#FFFFFF`

## Running

```bash
npm install
npm run dev
# http://localhost:3000
```
