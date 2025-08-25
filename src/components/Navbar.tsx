"use client";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();
  const isRecruiter = user?.role === "recruiter";

  const linkCls = (href: string) => {
    const isActive =
      pathname === href || (!!href && pathname?.startsWith(href + "/"));
    const base = "hover:text-[#7C3AED]";
    const active = "text-[#7C3AED] font-semibold";
    const inactive = "text-black dark:text-white";
    return `${base} ${isActive ? active : inactive}`;
  };
  return (
    <header className="tl-navbar sticky top-0 z-40  bg-white dark:border-gray-800 dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: logo */}
        <Link
          href="/"
          className="logo-link font-semibold text-xl text-black dark:text-white"
        >
          <span className="text-[#10b981]">Talent</span>
          <span>Hub</span>
        </Link>

        {/* Center: nav links */}
        <nav className="nav-links hidden md:flex items-center gap-6 text-sm">
          {!isRecruiter && (
            <>
              <Link href="/" className={linkCls("/")}>
                Home
              </Link>
              <Link href="/jobs" className={linkCls("/jobs")}>
                Jobs
              </Link>
            </>
          )}
          <Link href="/employers" className={linkCls("/employers")}>
            Employers
          </Link>
          <Link href="/application" className={linkCls("/application")}>
            Applications
          </Link>
        </nav>

        {/* Right: toggle + auth */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {user ? (
            <button
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="inline-flex items-center justify-center rounded-md bg-[#7C3AED] px-6 py-2 text-sm font-semibold text-white hover:opacity-95"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-md bg-[#7C3AED] px-6 py-2 text-sm font-semibold text-white hover:opacity-95"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
