"use client";
import { FormEvent, useState } from "react";
import { Button } from "@/components/Button";

export default function NewJobForm() {
  const [submitting, setSubmitting] = useState(false);
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    setSubmitting(true);
    // Placeholder: no backend yet
    console.log("New job payload", payload);
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    alert("Mock submit! Backend coming in Phase 2.");
  }
  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-800 dark:text-gray-200">Title</label>
        <input name="title" required className="mt-1 w-full rounded-md border px-3 py-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900/10 dark:focus:ring-white/10" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-800 dark:text-gray-200">Location</label>
        <input name="location" required className="mt-1 w-full rounded-md border px-3 py-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900/10 dark:focus:ring-white/10" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-800 dark:text-gray-200">Tags (comma separated)</label>
        <input name="tags" placeholder="React, TypeScript" className="mt-1 w-full rounded-md border px-3 py-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900/10 dark:focus:ring-white/10" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-800 dark:text-gray-200">Type</label>
        <select name="type" className="mt-1 w-full rounded-md border px-3 py-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-900/10 dark:focus:ring-white/10">
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Contract</option>
          <option>Internship</option>
          <option>Remote</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-800 dark:text-gray-200">Salary</label>
        <input name="salary" className="mt-1 w-full rounded-md border px-3 py-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900/10 dark:focus:ring-white/10" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-800 dark:text-gray-200">Description</label>
        <textarea name="description" rows={4} className="mt-1 w-full rounded-md border px-3 py-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900/10 dark:focus:ring-white/10" />
      </div>
      <Button type="submit" disabled={submitting}>
        {submitting ? "Submitting..." : "Post Job (Mock)"}
      </Button>
    </form>
  );
}
