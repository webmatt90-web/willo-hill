type PageHeroProps = {
  title: string;
  accent?: string;
  subtitle?: string;
};

/** Dark navy page hero: `title` in white, `accent` in yellow after it. */
export default function PageHero({ title, accent, subtitle }: PageHeroProps) {
  return (
    <section className="bg-primary px-4 py-16 text-center">
      <h1 className="text-4xl font-bold uppercase text-white md:text-5xl">
        {title}
        {accent && <span className="text-accent"> {accent}</span>}
      </h1>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-white/90">
          {subtitle}
        </p>
      )}
    </section>
  );
}
