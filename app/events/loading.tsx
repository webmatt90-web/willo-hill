export default function EventsLoading() {
  return (
    <main aria-busy="true">
      <section className="bg-primary px-4 py-16 text-center">
        <div className="mx-auto h-12 w-72 max-w-full animate-pulse rounded-sm bg-white/10" />
      </section>
      <section className="mx-auto max-w-4xl space-y-4 px-4 py-12">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-28 animate-pulse rounded-sm bg-primary/5"
          />
        ))}
      </section>
    </main>
  );
}
