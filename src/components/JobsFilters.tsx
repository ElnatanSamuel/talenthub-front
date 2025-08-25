export default function JobsFilters() {
  return (
    <aside className="hidden md:block w-[18rem] shrink-0">
      <div className="space-y-6">
        <section className="salary-range">
          <div className="mb-3 flex items-center justify-between text-sm">
            <h3 className="font-semibold">Salary Range</h3>
          </div>
          <div className="flex items-center gap-3">
            <input
              placeholder="Min"
              className="inner-input w-full rounded-md   px-3 py-2 text-sm outline-none placeholder:text-gray-400  "
            />
            <input
              placeholder="Max"
              className="inner-input w-full rounded-md    px-3 py-2 text-sm outline-none placeholder:text-gray-400 "
            />
          </div>
        </section>

        <FilterGroup
          title="Job Type"
          options={["All", "Full-Time", "Part-Time", "Internship", "Contract"]}
        />
        <FilterGroup
          title="Work Mode"
          options={["On-Site", "Remote", "Hybrid"]}
        />

        <FilterGroup
          title="Experience Level"
          options={[
            "Fresher/Entry-Level",
            "Junior",
            "Mid-Level",
            "Senior",
            "Lead/Managerial",
            "Director/Executive",
          ]}
        />
      </div>
    </aside>
  );
}

function FilterGroup({ title, options }: { title: string; options: string[] }) {
  return (
    <section className="">
      <div className="mb-3 flex items-center justify-between text-sm">
        <h3 className="font-semibold">{title}</h3>
      </div>
      <div className="space-y-2">
        {options.map((opt, idx) => (
          <label
            key={idx}
            className="flex cursor-pointer items-center gap-2 text-sm"
          >
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-[#7C3AED] focus:ring-[#7C3AED]"
            />
            <span>{opt}</span>
          </label>
        ))}
      </div>
    </section>
  );
}
