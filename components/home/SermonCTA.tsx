import Button from "@/components/ui/Button";
import SectionDivider from "@/components/ui/SectionDivider";

export default function SermonCTA() {
  return (
    <section className="relative overflow-hidden bg-primary px-4 py-16 text-center md:py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl font-bold uppercase text-accent md:text-4xl">
          Listen Now!
        </h2>
        <p className="mt-4 leading-relaxed text-white/90">
          Miss a Sunday, or want to hear a message again? Every week&apos;s
          sermon is available online — watch past messages or join us live.
        </p>
        <div className="relative z-10 mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/sermons">Past Sermons</Button>
          <Button href="/live">Listen Live</Button>
        </div>
      </div>
      <SectionDivider />
    </section>
  );
}
