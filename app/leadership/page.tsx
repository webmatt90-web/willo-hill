import type { Metadata } from "next";
import StaffSection from "@/components/leadership/StaffSection";
import { getStaffByCategory, STAFF_CATEGORIES } from "@/lib/queries/staff";

export const revalidate = 300; // staff changes infrequently

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "Meet the pastors, staff, ministry leaders, elders, and deacons who serve the Willo-Hill Baptist Church family.",
};

const EMAIL_CATEGORIES = new Set(["Staff", "Elders"]);

export default async function LeadershipPage() {
  const grouped = await getStaffByCategory();
  const isEmpty = STAFF_CATEGORIES.every((c) => grouped[c].length === 0);

  return (
    <main>
      <section className="bg-primary px-4 py-16 text-center">
        <h1 className="text-4xl font-bold uppercase text-white md:text-5xl">
          Our <span className="text-accent">Leadership</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/90">
          The people who serve, shepherd, and lead our church family.
        </p>
      </section>

      <div className="mx-auto max-w-5xl space-y-16 px-4 py-12 md:py-16">
        {isEmpty ? (
          <p className="py-12 text-center text-lg text-primary/70">
            Leadership profiles are coming soon.
          </p>
        ) : (
          STAFF_CATEGORIES.map((category) => (
            <StaffSection
              key={category}
              heading={category}
              members={grouped[category]}
              showEmail={EMAIL_CATEGORIES.has(category)}
            />
          ))
        )}
      </div>
    </main>
  );
}
