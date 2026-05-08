"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth-store";

interface AccountButtonProps {
  className?: string;
  mobile?: boolean;
  onItemClick?: () => void;
}

export function AccountButton({ className, mobile = false, onItemClick }: AccountButtonProps) {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuthStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (mobile) {
    return (
      <Button
        variant="ghost"
        size="sm"
        asChild
        className={cn("w-full justify-start gap-3 px-3 py-2.5 h-auto", className)}
      >
        <Link href={isAuthenticated ? "/account" : "/login"} onClick={onItemClick}>
          <User className="h-5 w-5" strokeWidth={1.5} />
          <span className="text-base">{isAuthenticated ? "Account" : "Sign In"}</span>
        </Link>
      </Button>
    );
  }

  if (!isAuthenticated) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn("p-2 rounded-full", className)}
        aria-label="Sign in"
        onClick={() => router.push("/login")}
      >
        <User className="h-5 w-5" strokeWidth={1.5} />
      </Button>
    );
  }

  return (
    <div ref={ref} className="relative">
      <Button
        variant="ghost"
        size="icon"
        className={cn("p-2 rounded-full", className)}
        aria-label="Account menu"
        onClick={() => setOpen(!open)}
      >
        <User className="h-5 w-5" strokeWidth={1.5} />
      </Button>

      {open && (
        <div
          className="absolute right-0 top-full z-50 mt-1 w-48 origin-top-right rounded-lg border bg-popover p-1 text-popover-foreground shadow-md"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <Link
            href="/account"
            className="relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-none select-none hover:bg-accent hover:text-accent-foreground"
            onClick={() => setOpen(false)}
          >
            My Account
          </Link>
          <Link
            href="/account/orders"
            className="relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-none select-none hover:bg-accent hover:text-accent-foreground"
            onClick={() => setOpen(false)}
          >
            Orders
          </Link>
          <div className="-mx-1 my-1 h-px bg-border" />
          <button
            onClick={() => { logout(); setOpen(false); }}
            className="relative flex w-full cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-none select-none text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
