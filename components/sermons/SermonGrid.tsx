"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import SermonCard from "@/components/sermons/SermonCard";
import type { Sermon } from "@/lib/database.types";

export default function SermonGrid({ sermons }: { sermons: Sermon[] }) {
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const filtered = q
    ? sermons.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.pastor?.toLowerCase().includes(q) ||
          s.series_name?.toLowerCase().includes(q)
      )
    : sermons;

  return (
    <div>
      <div className="relative mx-auto max-w-md">
        <Search
          size={18}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-primary/40"
          aria-hidden="true"
        />
        <label htmlFor="sermon-search" className="sr-only">
          Search sermons by title, pastor, or series
        </label>
        <input
          id="sermon-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, pastor, or series…"
          className="w-full rounded-sm border border-primary/20 py-2.5 pl-10 pr-4 text-primary placeholder:text-primary/40 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-lg text-primary/70">
          {sermons.length === 0
            ? "Sermons are coming soon — check back after Sunday!"
            : "No sermons match your search."}
        </p>
      ) : (
        <div className="mt-10 flex flex-wrap justify-center gap-6">
          {filtered.map((sermon) => (
            <div
              key={sermon.id}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            >
              <SermonCard sermon={sermon} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
