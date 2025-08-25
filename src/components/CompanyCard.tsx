import { Company } from "@/data/types";

export default function CompanyCard({ company }: { company: Company }) {
  return (
    <div className="rounded-lg border p-4 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
      <h3 className="font-semibold text-gray-900 dark:text-gray-100">{company.name}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">{company.location}</p>
      {company.website && (
        <a
          href={company.website}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          Visit Website
        </a>
      )}
    </div>
  );
}
