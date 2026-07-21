import Button from "@/components/ui/Button";
import SectionDivider from "@/components/ui/SectionDivider";

export default function GiveCTA() {
  return (
    <section className="relative overflow-hidden bg-primary px-4 py-16 text-center md:py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl font-bold uppercase text-white md:text-4xl">
          <span className="text-accent">Give</span>
        </h2>
        <p className="mt-4 leading-relaxed text-white/90">
          As a church family, we consider it a privilege to give back to the
          One who has given us everything.
        </p>
        <div className="relative z-10 mt-8">
          <Button href="/give" size="lg">
            Give Online
          </Button>
        </div>
      </div>
      <SectionDivider />
    </section>
  );
}
