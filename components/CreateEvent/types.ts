export type Fields = {
  title: string;
  description: string;
  overview: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  organizer: string;
};

export type Errors = Partial<
  Record<keyof Fields | "image" | "agenda" | "tags", string>
>;
