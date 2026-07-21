import type { Metadata } from "next";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Willo-Hill Baptist Church — 4200 State Route 306, Willoughby, OH 44094. Call or text (440) 488-4024.",
};

export default function ContactPage() {
  return (
    <main>
      <section className="bg-primary px-4 py-16 text-center">
        <h1 className="text-4xl font-bold uppercase text-white md:text-5xl">
          Contact <span className="text-accent">Us</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/90">
          We&apos;d love to hear from you.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1fr_1.5fr]">
          <div className="space-y-4 text-primary/85">
            <h2 className="text-2xl font-semibold uppercase text-primary">
              Get In Touch
            </h2>
            <p>
              4200 State Route 306
              <br />
              Willoughby, OH 44094
            </p>
            <p>
              <a href="tel:+14404884024" className="font-semibold text-primary hover:text-accent">
                (440) 488-4024
              </a>{" "}
              (Call or Text)
            </p>
            <p>
              <strong>Sundays:</strong> 9:30 am &amp; 10:45 am
              <br />
              <strong>Office hours:</strong> weekdays by appointment
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
