"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/new", label: "New Here?" },
  { href: "/visit", label: "Plan A Visit" },
  { href: "/next", label: "Next Steps" },
  { href: "/connect", label: "Connect" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav aria-label="Main navigation" className="bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" onClick={() => setOpen(false)} aria-label="Willo-Hill Baptist Church home">
          <Image
            src="/images/logo-color.svg"
            alt="Willo-Hill Baptist Church"
            width={139}
            height={60}
            unoptimized
            priority
            className="h-12 w-auto md:h-14"
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-heading text-sm font-medium uppercase tracking-wide text-primary transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/give"
            className="rounded-sm bg-accent px-5 py-2 font-heading text-sm font-semibold uppercase tracking-wide text-primary transition-colors hover:bg-accent/90"
          >
            Give
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="p-2 text-primary md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden bg-primary transition-[max-height] duration-300 ease-in-out md:hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-4 py-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-3 font-heading text-base font-medium uppercase tracking-wide text-white hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/give"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-sm bg-accent px-5 py-3 text-center font-heading text-base font-semibold uppercase tracking-wide text-primary"
          >
            Give
          </Link>
        </div>
      </div>
    </nav>
  );
}
