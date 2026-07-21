import HeroSlider from "@/components/home/HeroSlider";
import NewHereAndServiceTimes from "@/components/home/NewHereAndServiceTimes";
import JourneySteps from "@/components/home/JourneySteps";
import SermonCTA from "@/components/home/SermonCTA";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import GiveCTA from "@/components/home/GiveCTA";

export const revalidate = 60;

export default function HomePage() {
  return (
    <main>
      <HeroSlider />
      <NewHereAndServiceTimes />
      <JourneySteps />
      <SermonCTA />
      <UpcomingEvents />
      <GiveCTA />
    </main>
  );
}
