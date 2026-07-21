"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/sermons", label: "Sermons" },
  { href: "/admin/staff", label: "Staff" },
  { href: "/admin/announcements", label: "Announcements" },
];

export default function AdminNav({ email }: { email: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const signOut = async () => {
    await createClient().auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <nav aria-label="Admin navigation" className="bg-primary text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
        <span className="font-heading font-bold uppercase tracking-wide text-accent">
          Admin
        </span>
        <div className="flex flex-wrap gap-x-5 gap-y-1">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "font-heading text-sm font-medium uppercase tracking-wide transition-colors hover:text-accent",
                pathname === link.href ? "text-accent" : "text-white/85"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-4">
          <span className="hidden text-xs text-white/60 sm:inline">{email}</span>
          <button
            type="button"
            onClick={signOut}
            className="inline-flex items-center gap-1.5 rounded-sm border border-white/30 px-3 py-1.5 font-heading text-xs font-semibold uppercase tracking-wide hover:border-accent hover:text-accent"
          >
            <LogOut size={14} aria-hidden="true" /> Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
}
