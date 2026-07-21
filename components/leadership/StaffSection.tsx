import StaffCard from "@/components/leadership/StaffCard";
import type { StaffMember } from "@/lib/database.types";

type StaffSectionProps = {
  heading: string;
  members: StaffMember[];
  showEmail?: boolean;
};

export default function StaffSection({
  heading,
  members,
  showEmail = false,
}: StaffSectionProps) {
  if (members.length === 0) return null;

  return (
    <section aria-label={heading}>
      <h2 className="border-b-2 border-accent pb-2 text-center text-2xl font-semibold uppercase tracking-wide text-primary">
        {heading}
      </h2>
      <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-10">
        {members.map((member) => (
          <div
            key={member.id}
            className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
          >
            <StaffCard member={member} showEmail={showEmail} />
          </div>
        ))}
      </div>
    </section>
  );
}
