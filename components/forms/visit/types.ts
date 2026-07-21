import type { Child } from "@/lib/database.types";

export type VisitChoice = "this-weekend" | "next-weekend" | "another";

export type VisitFormData = {
  visitChoice: VisitChoice;
  customDate: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bringingKids: boolean | null;
  otherAdultName: string;
  childList: Child[];
  wantsHost: boolean | null;
  needsRide: boolean | null;
  pickupAddress: string;
  coffeeOrder: string;
  website: string; // honeypot
};

export const EMPTY_VISIT_DATA: VisitFormData = {
  visitChoice: "this-weekend",
  customDate: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  bringingKids: null,
  otherAdultName: "",
  childList: [],
  wantsHost: null,
  needsRide: null,
  pickupAddress: "",
  coffeeOrder: "",
  website: "",
};

export type StepProps = {
  data: VisitFormData;
  update: (patch: Partial<VisitFormData>) => void;
};

function nextSunday(weeksAhead: number): Date {
  const date = new Date();
  const daysUntilSunday = (7 - date.getDay()) % 7 || 7;
  date.setDate(date.getDate() + daysUntilSunday + weeksAhead * 7);
  return date;
}

export function describeVisitDate(data: VisitFormData): string {
  if (data.visitChoice === "another") return data.customDate;
  const date = nextSunday(data.visitChoice === "this-weekend" ? 0 : 1);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
