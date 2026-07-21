import Image from "next/image";
import type { StaffMember } from "@/lib/database.types";

function initials(name: string): string {
  return name
    .replace(/^Pastor\s+/i, "")
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

type StaffCardProps = {
  member: StaffMember;
  showEmail?: boolean;
};

export default function StaffCard({ member, showEmail = false }: StaffCardProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative h-32 w-32 overflow-hidden rounded-full bg-primary">
        {member.photo_url ? (
          <Image
            src={member.photo_url}
            alt={`Photo of ${member.name}`}
            fill
            sizes="128px"
            className="object-cover"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center font-heading text-3xl font-bold text-accent"
            aria-hidden="true"
          >
            {initials(member.name)}
          </div>
        )}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-primary">{member.name}</h3>
      <p className="text-sm text-primary/70">{member.title}</p>
      {showEmail && member.email && (
        <a
          href={`mailto:${member.email}`}
          className="mt-1 text-sm text-accent underline-offset-2 hover:underline"
        >
          {member.email}
        </a>
      )}
    </div>
  );
}
