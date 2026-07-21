import { BELIEFS } from "@/lib/content/beliefs";

export default function BeliefsList() {
  return (
    <div className="mx-auto max-w-3xl space-y-5">
      {BELIEFS.map((belief) => (
        <p
          key={belief.slice(0, 40)}
          className="border-l-2 border-accent pl-4 leading-relaxed text-primary/85"
        >
          {belief}
        </p>
      ))}
    </div>
  );
}
