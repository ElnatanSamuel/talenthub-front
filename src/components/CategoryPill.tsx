export default function CategoryPill({ label }: { label: string }) {
  return (
    <span className="category-pill inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border shadow-sm bg-white text-black border-gray-200 dark:shadow-none dark:bg-gray-800 dark:text-white dark:border-gray-700">
      {label}
    </span>
  );
}
