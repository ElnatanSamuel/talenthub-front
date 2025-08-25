"use client";
import { useEffect, useState } from "react";

function getPreferredTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {}
  // Fall back to current <html> class set by layout script, else light
  const isDark = document.documentElement.classList.contains("dark");
  return isDark ? "dark" : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const initial = getPreferredTheme();
    setTheme(initial);
    const root = document.documentElement;
    if (initial === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    const root = document.documentElement;
    if (next === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  const checked = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={toggleTheme}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none border
        ${
          checked
            ? "bg-gray-700 border-gray-600"
            : "bg-gray-200 border-gray-300"
        }`}
      title={checked ? "Switch to light" : "Switch to dark"}
    >
      {/* Knob with icon */}
      <span
        className={`inline-grid place-items-center h-5 w-5 transform rounded-full bg-white shadow transition-transform
          ${checked ? "translate-x-5" : "translate-x-0"}`}
      >
        <span aria-hidden className="text-[12px] leading-none select-none">
          {checked ? "🌙" : "☀️"}
        </span>
      </span>
    </button>
  );
}
