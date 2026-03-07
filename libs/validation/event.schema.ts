import { z } from "zod";

export const createEventSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title cannot exceed 100 characters"),
  description: z.string().min(1, "Description is required"),
  overview: z.string().min(1, "Overview is required"),
  venue: z.string().min(1, "Venue is required"),
  location: z.string().min(1, "Location is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  mode: z.enum(["online", "offline", "hybrid"], {
    message: "Mode must be online, offline, or hybrid",
  }),
  organizer: z.string().min(1, "Organizer is required"),
  audience: z.string().min(1, "Target audience is required"),
  tags: z.array(z.string().min(1)).min(1, "At least one tag is required"),
  agenda: z
    .array(z.string().min(1))
    .min(1, "At least one agenda item is required"),
});

export type CreateEventInput = z.infer<typeof createEventSchema>;
