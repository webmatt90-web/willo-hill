"use client";

import Button from "@/components/ui/Button";

export default function EventsError({ reset }: { reset: () => void }) {
  return (
    <main className="flex min-h-[50vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="text-2xl font-semibold uppercase text-primary">
        We couldn&apos;t load the events
      </h1>
      <p className="text-primary/70">
        Please try again — or call the church office at (440) 488-4024.
      </p>
      <Button onClick={reset}>Try Again</Button>
    </main>
  );
}
