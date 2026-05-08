"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/constants";

interface LogoProps {
  className?: string;
  onClick?: () => void;
}

export function Logo({ className, onClick }: LogoProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 shrink-0",
        className,
      )}
      aria-label={`${SITE.name} — Home`}
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
        <span className="text-sm font-bold text-primary-foreground tracking-tight">
          H
        </span>
      </div>
      <span className="hidden sm:inline-block text-lg font-bold tracking-tight text-foreground">
        {SITE.name}
      </span>
    </Link>
  );
}