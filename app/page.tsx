import EventCard from "@/components/EventCard";
import ExploreButton from "@/components/ExploreBtn";
import { IEvent } from "@/database";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default async function Home() {
  const response = await fetch(`${BASE_URL}/api/events`);
  const { events } = await response.json();

  return (
    <section className="py-5">
      <h1 className="text-center">
        The Hub for Every Dev <br />
        Events you can&apos;t miss
      </h1>

      <p className="text-center mt-5">Hackathons, meetups, and more!</p>

      <ExploreButton />

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>
        <ul className="events">
          {events.map((event: IEvent) => (
            <EventCard key={event.slug} {...event} />
          ))}
        </ul>
      </div>
    </section>
  );
}
