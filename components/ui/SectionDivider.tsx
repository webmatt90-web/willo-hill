import Image from "next/image";
import { cn } from "@/lib/utils";

type SectionDividerProps = {
  position?: "right" | "left";
};

/**
 * Yellow dot-cluster accent placed at the bottom corner of dark navy
 * sections. Parent section must be `relative` and `overflow-hidden`.
 */
export default function SectionDivider({
  position = "right",
}: SectionDividerProps) {
  return (
    <Image
      src="/images/accent-dots.svg"
      alt=""
      aria-hidden="true"
      width={480}
      height={120}
      unoptimized
      className={cn(
        "pointer-events-none absolute bottom-0 w-64 select-none md:w-96",
        position === "right" ? "right-0" : "left-0 -scale-x-100"
      )}
    />
  );
}
