import CreateEventForm from "@/components/CreateEventForm";

const Create = () => {
  return (
    <section className="py-5 flex flex-col gap-8">
      <div className="text-center">
        <h1>Create an Event</h1>
        <p className="subheading">
          Create and share your event with the world!
        </p>
      </div>
      <CreateEventForm />
    </section>
  );
};

export default Create;
