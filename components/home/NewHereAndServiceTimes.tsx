import Button from "@/components/ui/Button";
import SectionDivider from "@/components/ui/SectionDivider";

const SERVICE_TIMES = [
  {
    day: "Sundays",
    items: [
      { time: "9:30 am", label: "Youth Sunday School & Adult Classes" },
      { time: "10:45 am", label: "Worship Service" },
    ],
    note: "Nursery provided for both",
  },
  {
    day: "Wednesdays (September–May)",
    items: [
      { time: "10:00 am", label: "Morning Bible Study" },
      { time: "6:45 pm", label: "AWANA" },
      { time: "6:45 pm", label: "Youth Group" },
      { time: "7:00 pm", label: "Evening Bible Study" },
    ],
  },
];

export default function NewHereAndServiceTimes() {
  return (
    <section className="grid md:grid-cols-2">
      {/* New Here? */}
      <div className="relative overflow-hidden bg-primary px-6 py-16 text-white md:px-12 md:py-20">
        <h2 className="text-3xl font-bold uppercase md:text-4xl">
          New <span className="text-accent">Here?</span>
        </h2>
        <p className="mt-4 max-w-md leading-relaxed text-white/90">
          We&apos;d love to meet you. Find out what to expect on a Sunday
          morning, where to park, and what&apos;s available for your kids —
          then let us know you&apos;re coming so we can roll out the welcome
          mat.
        </p>
        <div className="relative z-10 mt-8">
          <Button href="/new">Learn More</Button>
        </div>
        <SectionDivider />
      </div>

      {/* Join Us / Service Times */}
      <div className="bg-white px-6 py-16 md:px-12 md:py-20">
        <h2 className="text-3xl font-bold uppercase text-primary md:text-4xl">
          Join Us:
        </h2>
        <div className="mt-6 space-y-8">
          {SERVICE_TIMES.map((group) => (
            <div key={group.day}>
              <h3 className="text-xl font-semibold text-primary">
                {group.day}
              </h3>
              <ul className="mt-3 space-y-2">
                {group.items.map((item) => (
                  <li
                    key={item.time + item.label}
                    className="flex gap-3 text-primary/90"
                  >
                    <span className="w-20 shrink-0 font-heading font-semibold text-accent">
                      {item.time}
                    </span>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
              {group.note && (
                <p className="mt-2 text-sm italic text-primary/60">
                  {group.note}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
