"use client";

import Link from "next/link";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AccountButtonProps {
  className?: string;
  mobile?: boolean;
  onItemClick?: () => void;
}

export function AccountButton({ className, mobile = false, onItemClick }: AccountButtonProps) {
  if (mobile) {
    return (
      <Button
        variant="ghost"
        size="sm"
        asChild
        className={cn("w-full justify-start gap-3 px-3 py-2.5 h-auto", className)}
      >
        <Link href="/account" onClick={onItemClick}>
          <User className="h-5 w-5" strokeWidth={1.5} />
          <span className="text-base">Account</span>
        </Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("p-2 rounded-full", className)}
          aria-label="Account menu"
        >
          <User className="h-5 w-5" strokeWidth={1.5} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 mt-1">
        <DropdownMenuItem asChild>
          <Link href="/account">My Account</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/orders">Orders</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/sign-in">Sign In</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}