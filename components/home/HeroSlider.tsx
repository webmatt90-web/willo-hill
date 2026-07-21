"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";

const HERO_IMAGES = [
  { src: "/images/hero-1.jpg", alt: "Worship service at Willo-Hill Baptist Church" },
  { src: "/images/hero-2.jpg", alt: "The Willo-Hill congregation gathered on a Sunday morning" },
  { src: "/images/hero-3.jpg", alt: "Members of the Willo-Hill church family in fellowship" },
  { src: "/images/hero-4.jpg", alt: "The Willo-Hill Baptist Church building and grounds" },
];

const INTERVAL_MS = 4000;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (paused || reducedMotion) return;

    timer.current = setInterval(
      () => setCurrent((c) => (c + 1) % HERO_IMAGES.length),
      INTERVAL_MS
    );
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused]);

  return (
    <section
      className="relative flex min-h-[85vh] flex-col justify-center overflow-hidden bg-primary"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Welcome to Willo-Hill Baptist Church"
    >
      {HERO_IMAGES.map((image, i) => (
        <Image
          key={image.src}
          src={image.src}
          alt={i === current ? image.alt : ""}
          fill
          priority={i === 0}
          sizes="100vw"
          className={`object-cover transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Uniform wash for text readability */}
      <div className="absolute inset-0 bg-primary/70" aria-hidden="true" />

      <div className="relative mx-auto max-w-4xl px-4 py-24 text-center">
        <h1 className="text-4xl font-bold uppercase leading-snug text-white md:text-6xl md:leading-snug">
          Following Christ <span className="text-accent">Together</span>
        </h1>
        <p className="mt-6 text-lg text-white/90">
          Willo-Hill Baptist Church
          <span className="mx-2 text-accent" aria-hidden="true">
            •
          </span>
          4200 State Route 306, Willoughby, OH
        </p>
        <div className="mt-8">
          <Button href="/new" size="lg">
            Learn More About Us
          </Button>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="relative mb-8 flex justify-center gap-3">
        {HERO_IMAGES.map((image, i) => (
          <button
            key={image.src}
            type="button"
            aria-label={`Show slide ${i + 1}`}
            aria-current={i === current}
            onClick={() => setCurrent(i)}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              i === current ? "bg-accent" : "bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
