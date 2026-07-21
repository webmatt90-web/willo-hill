import Button from "@/components/ui/Button";

const STEPS = [
  {
    title: "Know God",
    description:
      "Your journey begins with a relationship with Jesus Christ. Discover who He is and what He has done for you.",
  },
  {
    title: "Find Freedom",
    description:
      "Walk out of what holds you back. Through community and God's Word, find the freedom Christ promises.",
  },
  {
    title: "Discover Purpose",
    description:
      "God made you on purpose, for a purpose. Uncover the gifts He has given you and how He wants to use them.",
  },
  {
    title: "Make a Difference",
    description:
      "Use your gifts to serve others — in our church, our community, and around the world.",
  },
];

export default function JourneySteps() {
  return (
    <section className="bg-white px-4 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap justify-center gap-8">
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              className="w-full text-center sm:w-[calc(50%-16px)] lg:w-[calc(25%-24px)]"
            >
              <span
                className="font-heading text-4xl font-bold text-accent"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <h2 className="mt-2 text-2xl font-semibold uppercase text-primary">
                {step.title}
              </h2>
              <p className="mt-3 leading-relaxed text-primary/80">
                {step.description}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button href="/next" size="lg">
            Start the Journey
          </Button>
        </div>
      </div>
    </section>
  );
}
