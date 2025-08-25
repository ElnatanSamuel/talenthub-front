"use client";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function JobsFilters() {
  return (
    <aside className="hidden md:block w-[18rem] shrink-0">
      <div className="space-y-6">
        <SalaryRangeFilter />

        <JobTypeFilter />

        <WorkModeFilter />
        <ExperienceFilter />
      </div>
    </aside>
  );
}

function JobTypeFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const initial = useMemo(() => (sp.get("type") || "").split(",").filter(Boolean), [sp]);
  const [selected, setSelected] = useState<string[]>(initial);

  useEffect(() => {
    setSelected((sp.get("type") || "").split(",").filter(Boolean));
  }, [sp]);

  const options = [
    { label: "Full-Time", value: "full-time" },
    { label: "Part-Time", value: "part-time" },
    { label: "Internship", value: "internship" },
    { label: "Contract", value: "contract" },
  ];

  function onToggle(value: string) {
    const next = new URLSearchParams(sp.toString());
    let nextValues = new Set(selected);
    if (nextValues.has(value)) nextValues.delete(value);
    else nextValues.add(value);
    // apply
    const list = Array.from(nextValues);
    if (list.length) next.set("type", list.join(","));
    else next.delete("type");
    router.push(next.toString() ? `${pathname}?${next}` : pathname);
  }

  function onClear() {
    const next = new URLSearchParams(sp.toString());
    next.delete("type");
    router.push(next.toString() ? `${pathname}?${next}` : pathname);
  }

  return (
    <section>
      <div className="mb-3 flex items-center justify-between text-sm">
        <h3 className="font-semibold">Job Type</h3>
        <button onClick={onClear} className="text-xs text-[#7C3AED] hover:underline">
          Reset
        </button>
      </div>
      <div className="space-y-2">
        {options.map((opt) => (
          <label key={opt.value} className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={selected.includes(opt.value)}
              onChange={() => onToggle(opt.value)}
              className="h-4 w-4 rounded border-gray-300 text-[#7C3AED] focus:ring-[#7C3AED]"
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
    </section>
  );
}

function StaticFilterGroup({ title, options }: { title: string; options: string[] }) {
  return (
    <section className="">
      <div className="mb-3 flex items-center justify-between text-sm">
        <h3 className="font-semibold">{title}</h3>
      </div>
      <div className="space-y-2">
        {options.map((opt, idx) => (
          <label key={idx} className="flex cursor-pointer items-center gap-2 text-sm">
            <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-[#7C3AED] focus:ring-[#7C3AED]" />
            <span>{opt}</span>
          </label>
        ))}
      </div>
    </section>
  );
}

function SalaryRangeFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const [min, setMin] = useState<string>(sp.get("salaryMin") || "");
  const [max, setMax] = useState<string>(sp.get("salaryMax") || "");

  useEffect(() => {
    setMin(sp.get("salaryMin") || "");
    setMax(sp.get("salaryMax") || "");
  }, [sp]);

  function apply() {
    const next = new URLSearchParams(sp.toString());
    const minNum = Number(min);
    const maxNum = Number(max);
    if (Number.isFinite(minNum) && min !== "") next.set("salaryMin", String(minNum));
    else next.delete("salaryMin");
    if (Number.isFinite(maxNum) && max !== "") next.set("salaryMax", String(maxNum));
    else next.delete("salaryMax");
    router.push(next.toString() ? `${pathname}?${next}` : pathname);
  }

  function reset() {
    setMin("");
    setMax("");
    const next = new URLSearchParams(sp.toString());
    next.delete("salaryMin");
    next.delete("salaryMax");
    router.push(next.toString() ? `${pathname}?${next}` : pathname);
  }

  return (
    <section className="salary-range">
      <div className="mb-3 flex items-center justify-between text-sm">
        <h3 className="font-semibold">Salary Range</h3>
        <div className="flex items-center gap-3">
          <button onClick={reset} className="text-xs text-[#7C3AED] hover:underline">Reset</button>
          <button onClick={apply} className="text-xs bg-[#7C3AED] text-white px-2 py-1 rounded">Apply</button>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <input
          placeholder="Min"
          value={min}
          onChange={(e) => setMin(e.target.value)}
          inputMode="numeric"
          className="inner-input w-full rounded-md px-3 py-2 text-sm outline-none placeholder:text-gray-400"
        />
        <input
          placeholder="Max"
          value={max}
          onChange={(e) => setMax(e.target.value)}
          inputMode="numeric"
          className="inner-input w-full rounded-md px-3 py-2 text-sm outline-none placeholder:text-gray-400"
        />
      </div>
    </section>
  );
}

function WorkModeFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const initial = useMemo(() => (sp.get("mode") || "").split(",").filter(Boolean), [sp]);
  const [selected, setSelected] = useState<string[]>(initial);

  useEffect(() => {
    setSelected((sp.get("mode") || "").split(",").filter(Boolean));
  }, [sp]);

  const options = [
    { label: "On-Site", value: "on-site" },
    { label: "Remote", value: "remote" },
    { label: "Hybrid", value: "hybrid" },
  ];

  function onToggle(value: string) {
    const next = new URLSearchParams(sp.toString());
    let nextValues = new Set(selected);
    if (nextValues.has(value)) nextValues.delete(value);
    else nextValues.add(value);
    const list = Array.from(nextValues);
    if (list.length) next.set("mode", list.join(","));
    else next.delete("mode");
    router.push(next.toString() ? `${pathname}?${next}` : pathname);
  }

  function onClear() {
    const next = new URLSearchParams(sp.toString());
    next.delete("mode");
    router.push(next.toString() ? `${pathname}?${next}` : pathname);
  }

  return (
    <section>
      <div className="mb-3 flex items-center justify-between text-sm">
        <h3 className="font-semibold">Work Mode</h3>
        <button onClick={onClear} className="text-xs text-[#7C3AED] hover:underline">Reset</button>
      </div>
      <div className="space-y-2">
        {options.map((opt) => (
          <label key={opt.value} className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={selected.includes(opt.value)}
              onChange={() => onToggle(opt.value)}
              className="h-4 w-4 rounded border-gray-300 text-[#7C3AED] focus:ring-[#7C3AED]"
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
    </section>
  );
}

function ExperienceFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const initial = useMemo(() => (sp.get("exp") || "").split(",").filter(Boolean), [sp]);
  const [selected, setSelected] = useState<string[]>(initial);

  useEffect(() => {
    setSelected((sp.get("exp") || "").split(",").filter(Boolean));
  }, [sp]);

  const options = [
    { label: "Fresher/Entry-Level", value: "entry" },
    { label: "Junior", value: "junior" },
    { label: "Mid-Level", value: "mid" },
    { label: "Senior", value: "senior" },
    { label: "Lead/Managerial", value: "lead" },
    { label: "Director/Executive", value: "director" },
  ];

  function onToggle(value: string) {
    const next = new URLSearchParams(sp.toString());
    let nextValues = new Set(selected);
    if (nextValues.has(value)) nextValues.delete(value);
    else nextValues.add(value);
    const list = Array.from(nextValues);
    if (list.length) next.set("exp", list.join(","));
    else next.delete("exp");
    router.push(next.toString() ? `${pathname}?${next}` : pathname);
  }

  function onClear() {
    const next = new URLSearchParams(sp.toString());
    next.delete("exp");
    router.push(next.toString() ? `${pathname}?${next}` : pathname);
  }

  return (
    <section>
      <div className="mb-3 flex items-center justify-between text-sm">
        <h3 className="font-semibold">Experience Level</h3>
        <button onClick={onClear} className="text-xs text-[#7C3AED] hover:underline">Reset</button>
      </div>
      <div className="space-y-2">
        {options.map((opt) => (
          <label key={opt.value} className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={selected.includes(opt.value)}
              onChange={() => onToggle(opt.value)}
              className="h-4 w-4 rounded border-gray-300 text-[#7C3AED] focus:ring-[#7C3AED]"
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
    </section>
  );
}
