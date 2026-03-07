import ExploreButton from "@/components/ExploreBtn";

export default function Home() {
  const events = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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
        <ul className="event">
          {events.map((event) => (
            <li
              key={event}
              className="border-dark-200 bg-dark-100 flex cursor-pointer items-center justify-between rounded-lg border px-5 py-3"
            >
              <div>
                <h2 className="text-lg font-medium">Event {event}</h2>
                <p className="text-sm text-dark-300">Location {event}</p>
              </div>

              <p className="text-sm text-dark-300">Date {event}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
