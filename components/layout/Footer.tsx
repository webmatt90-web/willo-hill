import Link from "next/link";
import Image from "next/image";
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
} from "@/components/ui/SocialIcons";

const LINK_COLUMNS: { heading: string; links: { href: string; label: string }[] }[] = [
  {
    heading: "Explore",
    links: [
      { href: "/new", label: "New Here?" },
      { href: "/visit", label: "Plan A Visit" },
      { href: "/about", label: "About" },
      { href: "/leadership", label: "Leadership" },
      { href: "/app", label: "Church App" },
    ],
  },
  {
    heading: "Sermons",
    links: [
      { href: "/sermons", label: "Past Sermons" },
      { href: "/live", label: "Listen Live" },
      { href: "/music", label: "Music" },
    ],
  },
  {
    heading: "Family",
    links: [
      { href: "/kids", label: "Kids" },
      { href: "/youth", label: "Youth" },
      { href: "/family", label: "Family Ministry" },
      { href: "/groups", label: "LifeGroups" },
    ],
  },
  {
    heading: "Spiritual Life",
    links: [
      { href: "/next", label: "Next Steps" },
      { href: "/jesus", label: "Meet Jesus" },
      { href: "/baptism", label: "Baptism" },
      { href: "/events", label: "Events" },
    ],
  },
  {
    heading: "Serve",
    links: [
      { href: "/teams", label: "Teams" },
      { href: "/missions", label: "Missions" },
      { href: "/internships", label: "Internships" },
      { href: "/give", label: "Give" },
    ],
  },
];

const SOCIAL_LINKS = [
  { href: "https://www.facebook.com/willohill", label: "Facebook", Icon: FacebookIcon },
  { href: "https://www.instagram.com/willohill", label: "Instagram", Icon: InstagramIcon },
  { href: "https://www.youtube.com/@willohill", label: "YouTube", Icon: YoutubeIcon },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
          {/* Church info */}
          <div className="lg:w-64 lg:shrink-0">
            <Image
              src="/images/logo-white.svg"
              alt="Willo-Hill Baptist Church"
              width={185}
              height={80}
              unoptimized
              className="h-16 w-auto"
            />
            <address className="mt-4 text-sm not-italic leading-relaxed text-white/80">
              4200 State Route 306
              <br />
              Willoughby, OH 44094
              <br />
              <a href="tel:+14404884024" className="hover:text-accent">
                (440) 488-4024
              </a>{" "}
              (Call or Text)
            </address>
            <div className="mt-4 flex gap-4">
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Willo-Hill on ${label}`}
                  className="text-white/80 transition-colors hover:text-accent"
                >
                  <Icon size={22} />
                </a>
              ))}
            </div>
            <Link
              href="/give"
              className="mt-6 inline-block rounded-sm bg-accent px-6 py-3 font-heading text-sm font-semibold uppercase tracking-wide text-primary transition-colors hover:bg-accent/90"
            >
              Give
            </Link>
          </div>

          {/* Link columns */}
          <div className="grid flex-1 grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          {LINK_COLUMNS.map((col) => (
            <div key={col.heading}>
              <h2 className="font-heading text-sm font-semibold uppercase tracking-widest text-accent">
                {col.heading}
              </h2>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/80 transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 border-t border-white/20 pt-6 text-center text-xs text-white/60">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link href="/privacy" className="hover:text-accent">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-accent">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-accent">
              Contact
            </Link>
          </div>
          <p>© {new Date().getFullYear()} Willo-Hill Baptist Church</p>
          <a
            href="https://weblaunchacademy.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-80"
          >
            Built with Web Launch Academy
          </a>
        </div>
      </div>
    </footer>
  );
}
