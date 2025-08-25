"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";

export default function RecruiterGate({ to = "/employers" }: { to?: string }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user?.role === "recruiter") {
      router.replace(to);
    }
  }, [user, router, to]);

  return null;
}
