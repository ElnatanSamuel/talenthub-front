import { Company } from "@/data/types";

export const companies: Company[] = [
  {
    id: "c1",
    name: "Acme Corp",
    location: "San Francisco, CA",
    website: "https://acme.example.com",
    logoUrl: "/next.svg",
  },
  {
    id: "c2",
    name: "Globex",
    location: "New York, NY",
    website: "https://globex.example.com",
    logoUrl: "/vercel.svg",
  },
  {
    id: "c3",
    name: "Initech",
    location: "Remote",
    website: "https://initech.example.com",
    logoUrl: "/globe.svg",
  },
];

export const companiesById = Object.fromEntries(
  companies.map((c) => [c.id, c])
) as Record<string, Company>;
