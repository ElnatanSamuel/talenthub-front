"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import { login as apiLogin } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const search = useSearchParams();
  const next = search.get("next") || "/";
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await apiLogin({ email, password });
      if (!res) throw new Error("Login failed");
      try {
        localStorage.setItem("th_token", res.token);
      } catch {}
      login({ id: res.user.id, name: res.user.name, email: res.user.email, role: res.user.role, companyId: res.user.companyId });
      router.push(next);
    } catch (err: any) {
      setError(err?.message || "Could not login. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-10 py-4">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Login to your Account
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Welcome back! Select the below login methods.
        </p>
      </div>

      <div className=" rounded-2xl p-10 sm:p-8 shadow-sm shadow-indigo-500">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-4 order-2 md:order-1">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Email ID / Username
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email id / username"
                className="w-full job-search-form rounded-md px-4 py-3 text-sm outline-none placeholder:text-gray-400"
                required
              />
            </div>

            {/* Password with Show */}
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full job-search-form rounded-md pr-16 px-4 py-3 text-sm outline-none placeholder:text-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-[#7C3AED]"
                >
                  {show ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="accent-[#7C3AED]"
                />
                Remember me
              </label>
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            )}

            {/* Action */}
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center rounded-md bg-[#7C3AED] px-10 py-3 text-sm font-semibold text-white hover:opacity-95 disabled:opacity-60"
            >
              {submitting ? "Logging in…" : "Login"}
            </button>

            {/* Register link */}
            <p className="text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link
                href={`/register?next=${encodeURIComponent(next)}`}
                className="text-[#7C3AED] font-medium"
              >
                Register
              </Link>
            </p>
          </form>

          {/* Illustration */}
          <div className="order-1 md:order-2 flex justify-center">
            <Image
              src="/images/loginill.png"
              alt="Login illustration"
              width={500}
              height={500}
              className="max-w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
