"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowRight, ArrowLeft, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import StepIndicator from "./CreateEvent/StepIndicator";
import OverviewStep from "./CreateEvent/OverviewStep";
import DetailsStep from "./CreateEvent/DetailsStep";
import ContentStep from "./CreateEvent/ContentStep";
import type { Fields, Errors } from "./CreateEvent/types";

const CreateEventForm = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<Errors>({});

  const [fields, setFields] = useState<Fields>({
    title: "",
    description: "",
    overview: "",
    venue: "",
    location: "",
    date: "",
    time: "",
    mode: "online",
    audience: "",
    organizer: "",
  });

  const [agenda, setAgenda] = useState<string[]>([]);
  const [agendaInput, setAgendaInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof Fields]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const applyImageFile = (file: File) => {
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
    setErrors((prev) => ({ ...prev, image: "" }));
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) applyImageFile(file);
  }, []);

  const addAgendaItem = () => {
    const trimmed = agendaInput.trim();
    if (!trimmed) return;
    setAgenda((prev) => [...prev, trimmed]);
    setAgendaInput("");
    setErrors((prev) => ({ ...prev, agenda: "" }));
  };

  const addTag = () => {
    const trimmed = tagInput.trim().toLowerCase();
    if (!trimmed || tags.includes(trimmed)) return;
    setTags((prev) => [...prev, trimmed]);
    setTagInput("");
    setErrors((prev) => ({ ...prev, tags: "" }));
  };

  const validateStep = (s: number): boolean => {
    const newErrors: Errors = {};
    if (s === 1) {
      if (!fields.title.trim()) newErrors.title = "Event title is required";
      if (!image) newErrors.image = "Event banner is required";
      if (!fields.description.trim())
        newErrors.description = "Description is required";
      if (!fields.overview.trim()) newErrors.overview = "Overview is required";
    }
    if (s === 2) {
      if (!fields.venue.trim()) newErrors.venue = "Venue is required";
      if (!fields.location.trim()) newErrors.location = "Location is required";
      if (!fields.date) newErrors.date = "Date is required";
      if (!fields.time) newErrors.time = "Time is required";
      if (!fields.organizer.trim())
        newErrors.organizer = "Organizer is required";
      if (!fields.audience.trim())
        newErrors.audience = "Target audience is required";
    }
    if (s === 3) {
      if (agenda.length === 0)
        newErrors.agenda = "Add at least one agenda item";
      if (tags.length === 0) newErrors.tags = "Add at least one tag";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    const toastId = toast.loading("Creating your event...");

    try {
      const data = new FormData();
      Object.entries(fields).forEach(([key, value]) => data.append(key, value));
      data.append("image", image!);
      data.append("tags", JSON.stringify(tags));
      data.append("agenda", JSON.stringify(agenda));

      const res = await fetch("/api/events", { method: "POST", body: data });
      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Failed to create event");

      toast.success("Event created!", {
        id: toastId,
        description: `"${fields.title}" is now live.`,
      });

      setTimeout(() => router.push(`/events/${result.event.slug}`), 1200);
    } catch (err) {
      toast.error("Failed to create event", {
        id: toastId,
        description:
          err instanceof Error ? err.message : "Something went wrong.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full">
      <StepIndicator step={step} />

      <div className="border border-white/[0.06] bg-white/[0.1] rounded-xl p-8 max-sm:p-5">
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <OverviewStep
              fields={fields}
              errors={errors}
              imagePreview={imagePreview}
              isDragging={isDragging}
              onChange={handleChange}
              onImageChange={(e) => {
                const file = e.target.files?.[0];
                if (file) applyImageFile(file);
              }}
              onDrop={handleDrop}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
            />
          )}

          {step === 2 && (
            <DetailsStep
              fields={fields}
              errors={errors}
              onChange={handleChange}
              onModeChange={(v) => setFields((prev) => ({ ...prev, mode: v }))}
            />
          )}

          {step === 3 && (
            <ContentStep
              agenda={agenda}
              agendaInput={agendaInput}
              tags={tags}
              tagInput={tagInput}
              errors={errors}
              onAgendaInputChange={setAgendaInput}
              onAddAgenda={addAgendaItem}
              onRemoveAgenda={(i) =>
                setAgenda((prev) => prev.filter((_, idx) => idx !== i))
              }
              onTagInputChange={setTagInput}
              onAddTag={addTag}
              onRemoveTag={(i) =>
                setTags((prev) => prev.filter((_, idx) => idx !== i))
              }
            />
          )}

          {/* Navigation */}
          <div
            className={`flex mt-8 gap-3 pt-5 border-t border-white/[0.05] ${
              step === 1 ? "justify-end" : "justify-between"
            }`}
          >
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setErrors({});
                  setStep((s) => s - 1);
                }}
                className="border-white/[0.07] bg-transparent hover:bg-white/[0.03] text-white/35 hover:text-white/55 gap-2 cursor-pointer transition-all text-sm"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back
              </Button>
            )}
            {step < 3 ? (
              <Button
                type="button"
                onClick={() => {
                  if (validateStep(step)) setStep((s) => s + 1);
                }}
                className="bg-white hover:bg-white/90 text-black font-medium gap-2 min-w-28 cursor-pointer text-sm"
              >
                Continue
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-white hover:bg-white/90 text-black font-medium gap-2 min-w-36 cursor-pointer text-sm"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Event"
                )}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventForm;
