import { useRef } from "react";
import Image from "next/image";
import { Upload, ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeader, FormField, inputCls } from "./helpers";
import type { Fields, Errors } from "./types";

interface Props {
  fields: Fields;
  errors: Errors;
  imagePreview: string | null;
  isDragging: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
}

const OverviewStep = ({
  fields,
  errors,
  imagePreview,
  isDragging,
  onChange,
  onImageChange,
  onDrop,
  onDragOver,
  onDragLeave,
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="animate-in fade-in duration-200 flex flex-col gap-6">
      <SectionHeader
        title="Tell us about your event"
        subtitle="Start with the basics — what is this event about?"
      />

      <FormField
        label="Event Title"
        htmlFor="title"
        required
        error={errors.title}
      >
        <Input
          id="title"
          name="title"
          maxLength={100}
          placeholder="e.g. Next.js Summit 2026"
          value={fields.title}
          onChange={onChange}
          className={inputCls(!!errors.title)}
        />
      </FormField>

      <FormField label="Event Banner" required error={errors.image}>
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={`relative w-full h-40 rounded-lg border border-dashed cursor-pointer overflow-hidden transition-colors duration-150 flex-center flex-col gap-2 group ${
            isDragging
              ? "border-white/20 bg-white/[0.03]"
              : errors.image
                ? "border-red-500/25"
                : "border-white/[0.08] hover:border-white/[0.14]"
          }`}
        >
          {imagePreview ? (
            <>
              <Image src={imagePreview} alt="Banner preview" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex-center flex-col gap-1.5">
                <Upload className="w-4 h-4 text-white/70" />
                <p className="text-white/60 text-xs">Change banner</p>
              </div>
            </>
          ) : (
            <>
              <ImageIcon className="w-5 h-5 text-white/18" />
              <p className="text-sm text-white/30 mt-1">
                {isDragging ? "Drop it here" : (
                  <>Drop image, or <span className="text-white/50">browse</span></>
                )}
              </p>
              <p className="text-[11px] text-white/18">PNG · JPG · WEBP — 1200 × 600</p>
            </>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onImageChange}
          className="hidden"
        />
      </FormField>

      <FormField
        label="Description"
        htmlFor="description"
        required
        error={errors.description}
        counter={`${fields.description.length}/1000`}
      >
        <Textarea
          id="description"
          name="description"
          maxLength={1000}
          rows={5}
          placeholder="Full description of the event..."
          value={fields.description}
          onChange={onChange}
          className={`${inputCls(!!errors.description)}`}
        />
      </FormField>

      <FormField
        label="Overview"
        htmlFor="overview"
        required
        error={errors.overview}
        hint="Short summary shown on the event listing card."
        counter={`${fields.overview.length}/500`}
      >
        <Textarea
          id="overview"
          name="overview"
          maxLength={500}
          rows={3}
          placeholder="Short summary shown on the event card..."
          value={fields.overview}
          onChange={onChange}
          className={`${inputCls(!!errors.overview)}`}
        />
      </FormField>
    </div>
  );
};

export default OverviewStep;
