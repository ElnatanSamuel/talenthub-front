"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import { register as apiRegister } from "@/lib/api";
import type { Role } from "@/data/types";

export default function RegisterClient() {
  const router = useRouter();
  const search = useSearchParams();
  const next = search.get("next") || "/";
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [promos, setPromos] = useState(true);
  const [role, setRole] = useState<Role>("candidate");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await apiRegister({ name, email, password, role });
      if (!res) throw new Error("Registration failed");
      try {
        localStorage.setItem("th_token", res.token);
      } catch {}
      login({ id: res.user.id, name: res.user.name, email: res.user.email, role: res.user.role, companyId: res.user.companyId });
      router.push(next);
    } catch (err: any) {
      setError(err?.message || "Could not register. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-10 py-4">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Registration form</h1>
        <p className="text-gray-600 dark:text-gray-300">Register to apply for jobs of your choice all over the world</p>
      </div>

      <div className=" rounded-2xl p-10 sm:p-8 shadow-sm shadow-indigo-500">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-4 order-2 md:order-1">
            {/* Full name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Full name<span className="text-red-500">*</span>
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full job-search-form rounded-md px-4 py-3 text-sm outline-none placeholder:text-gray-400"
                required
              />
            </div>

            {/* Role selection */}
            <div>
              <label className="block text-sm font-medium mb-2">I am a</label>
              <div className="flex gap-4">
                <label className="inline-flex items-center gap-2 text-sm">
                  <input type="radio" name="role" value="candidate" checked={role === "candidate"} onChange={() => setRole("candidate")} />
                  Candidate
                </label>
                <label className="inline-flex items-center gap-2 text-sm">
                  <input type="radio" name="role" value="recruiter" checked={role === "recruiter"} onChange={() => setRole("recruiter")} />
                  Recruiter
                </label>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Email ID<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email id"
                className="w-full job-search-form rounded-md px-4 py-3 text-sm outline-none placeholder:text-gray-400"
                required
              />
              <p className="mt-1 text-xs text-gray-500">Job notifications will be sent to this email id</p>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Password<span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="(Minimum 6 characters)"
                className="w-full job-search-form rounded-md px-4 py-3 text-sm outline-none placeholder:text-gray-400"
                required
                minLength={6}
              />
              <p className="mt-1 text-xs text-gray-500">Remember your password</p>
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Mobile number<span className="text-red-500">*</span>
              </label>
              <input
                inputMode="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter your mobile number"
                className="w-full job-search-form rounded-md px-4 py-3 text-sm outline-none placeholder:text-gray-400"
                required
              />
              <p className="mt-1 text-xs text-gray-500">Recruiters will contact you on this number</p>
            </div>

            {/* Terms */}
            <p className="text-xs text-gray-500">
              By clicking Register, you agree to the
              <Link href="#" className="text-[#7C3AED] font-medium"> Terms and Conditions </Link>
              &
              <Link href="#" className="text-[#7C3AED] font-medium"> Privacy Policy </Link>
              of TalentHub
            </p>

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
              className="inline-flex items-center justify-center rounded-md bg-[#7C3AED] px-6 py-3 text-sm font-semibold text-white hover:opacity-95 disabled:opacity-60"
            >
              {submitting ? "Registering…" : "Register now"}
            </button>
          </form>
          {/* Illustration */}
          <div className="order-1 md:order-2 flex justify-center">
            <Image src="/images/loginill.png" alt="Register illustration" width={500} height={500} className="max-w-full h-auto" priority />
          </div>
        </div>
      </div>
    </div>
  );
}
