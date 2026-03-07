import { z } from "zod";

export const createBookingSchema = z.object({
  eventId: z
    .string()
    .min(1, "Event ID is required")
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid event ID format"),
  slug: z
    .string()
    .min(1, "Event slug is required")
    .max(100, "Slug cannot exceed 100 characters")
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please provide a valid email address")
    .max(254, "Email cannot exceed 254 characters"),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;