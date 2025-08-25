import { ComponentProps } from "react";
import Link from "next/link";

interface ButtonProps extends ComponentProps<"button"> {
  variant?: "primary" | "secondary" | "ghost";
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none px-4 py-2";
  const styles = {
    primary:
      "bg-primary text-white hover:opacity-90 dark:bg-primary dark:text-white",
    secondary:
      "bg-white text-black hover:bg-gray-200 dark:bg-white dark:text-black dark:hover:bg-gray-200",
    ghost: "hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800",
  } as const;
  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...props} />
  );
}

export function LinkButton({
  href,
  children,
  className = "",
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
}) {
  const base =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none px-4 py-2";
  const styles = {
    primary:
      "bg-[#7C3AED] text-white hover:opacity-90 dark:bg-primary dark:text-white",
    secondary:
      "bg-white text-black hover:bg-gray-200 dark:bg-white dark:text-black dark:hover:bg-gray-200",
    ghost: "hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800",
  } as const;
  return (
    <Link href={href} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export function BorderButton({
  href,
  children,
  className = "",
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
}) {
  const base =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none px-4 py-2";
  const styles = {
    primary: "border border-[#7C3AED]",
    secondary: "bg-[#7C3AED] text-white",
    ghost: "hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800",
  } as const;
  return (
    <Link href={href} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </Link>
  );
}
