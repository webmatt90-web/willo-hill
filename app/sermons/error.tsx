"use client";

import Button from "@/components/ui/Button";

export default function SermonsError({ reset }: { reset: () => void }) {
  return (
    <main className="flex min-h-[50vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="text-2xl font-semibold uppercase text-primary">
        We couldn&apos;t load the sermons
      </h1>
      <p className="text-primary/70">
        Please try again — you can also watch on our YouTube channel.
      </p>
      <Button onClick={reset}>Try Again</Button>
    </main>
  );
}
