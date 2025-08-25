import { Suspense } from "react";
import RegisterClient from "./RegisterClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="p-4">Loading…</div>}>
      <RegisterClient />
    </Suspense>
  );
}
