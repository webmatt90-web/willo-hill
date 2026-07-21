export default function SermonsLoading() {
  return (
    <main aria-busy="true">
      <section className="bg-primary px-4 py-16 text-center">
        <div className="mx-auto h-12 w-72 max-w-full animate-pulse rounded-sm bg-white/10" />
      </section>
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-wrap justify-center gap-6">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="aspect-video w-full animate-pulse rounded-sm bg-primary/5 sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            />
          ))}
        </div>
      </section>
    </main>
  );
}
