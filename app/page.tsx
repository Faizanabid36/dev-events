import EventCard from "@/components/EventCard";
import ExploreButton from "@/components/ExploreBtn";

interface Props {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

export default function Home() {
  const events: Props[] = [
    {
      title: "Hack the Future",
      image: "/events/hack-the-future.jpg",
      slug: "hack-the-future",
      location: "Oslo, Norway",
      date: "2024-07-15",
      time: "10:00 AM - 6:00 PM",
    },
    {
      title: "Code & Coffee Meetup",
      image: "/events/code-coffee.jpg",
      slug: "code-coffee-meetup",
      location: "San Francisco, USA",
      date: "2024-08-20",
      time: "9:00 AM - 11:00 AM",
    },
    {
      title: "AI in Action Conference",
      image: "/events/ai-in-action.jpg",
      slug: "ai-in-action-conference",
      location: "Berlin, Germany",
      date: "2024-09-10",
      time: "8:00 AM - 5:00 PM",
    },

    {
      title: "Hack the Future",
      image: "/events/hack-the-future.jpg",
      slug: "hack-the-future",
      location: "Oslo, Norway",
      date: "2024-07-15",
      time: "10:00 AM - 6:00 PM",
    },
    {
      title: "Code & Coffee Meetup",
      image: "/events/code-coffee.jpg",
      slug: "code-coffee-meetup",
      location: "San Francisco, USA",
      date: "2024-08-20",
      time: "9:00 AM - 11:00 AM",
    },
    {
      title: "AI in Action Conference",
      image: "/events/ai-in-action.jpg",
      slug: "ai-in-action-conference",
      location: "Berlin, Germany",
      date: "2024-09-10",
      time: "8:00 AM - 5:00 PM",
    },
  ];
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
          {events.map((event) => (
            <EventCard key={event.slug} {...event} />
          ))}
        </ul>
      </div>
    </section>
  );
}
