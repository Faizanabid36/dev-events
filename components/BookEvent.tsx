"use client";

import { useState } from "react";
import { createBooking } from "@/libs/actions/booking.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const BookEvent = ({ eventId, slug }: { eventId: string; slug: string }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { success } = await createBooking({ eventId, slug, email });

    if (success) {
      setSubmitted(true);
    } else {
      console.error("Booking creation failed");
    }
    setIsLoading(false);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">
          You&apos;re all set!
        </h3>
        <p className="text-white/70">
          Thank you for signing up. We&apos;ll send you the details soon.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white/[0.02] border border-white/[0.07] rounded-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Book Your Spot</h2>
        <p className="text-white/70">
          Enter your email to reserve your place at this event.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white/90">
            Email Address
          </Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            placeholder="your@email.com"
            required
            className="bg-white/[0.03] border-white/[0.07] text-white placeholder:text-white/50"
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-white text-black hover:bg-white/90 disabled:opacity-50"
        >
          {isLoading ? "Booking..." : "Book Event"}
        </Button>
      </form>
    </div>
  );
};

export default BookEvent;
