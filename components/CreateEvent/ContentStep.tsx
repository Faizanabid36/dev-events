import { Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SectionHeader, FieldError } from "./helpers";
import type { Errors } from "./types";

interface Props {
  agenda: string[];
  agendaInput: string;
  tags: string[];
  tagInput: string;
  errors: Errors;
  onAgendaInputChange: (value: string) => void;
  onAddAgenda: () => void;
  onRemoveAgenda: (index: number) => void;
  onTagInputChange: (value: string) => void;
  onAddTag: () => void;
  onRemoveTag: (index: number) => void;
}

const AddButton = ({ onClick }: { onClick: () => void }) => (
  <Button
    type="button"
    onClick={onClick}
    size="icon"
    variant="outline"
    className="border-white/[0.07] bg-transparent hover:bg-white/[0.04] text-white/25 hover:text-white/50 shrink-0 transition-all cursor-pointer"
  >
    <Plus className="w-4 h-4" />
  </Button>
);

const ContentStep = ({
  agenda,
  agendaInput,
  tags,
  tagInput,
  errors,
  onAgendaInputChange,
  onAddAgenda,
  onRemoveAgenda,
  onTagInputChange,
  onAddTag,
  onRemoveTag,
}: Props) => (
  <div className="animate-in fade-in duration-200 flex flex-col gap-8">
    <SectionHeader
      title="Agenda & Tags"
      subtitle="Define the schedule and add searchable tags."
    />

    {/* ── Agenda ── */}
    <div className="flex flex-col gap-3">
      <div>
        <p className="text-white/35 text-xs font-medium">
          Agenda <span className="text-white/20">*</span>
        </p>
        <p className="text-white/20 text-[11px] mt-0.5">Press Enter or + to add.</p>
      </div>
      <div className="flex gap-2">
        <Input
          placeholder="e.g. Opening keynote — 9:00 AM"
          value={agendaInput}
          onChange={(e) => onAgendaInputChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onAddAgenda();
            }
          }}
          className=""
        />
        <AddButton onClick={onAddAgenda} />
      </div>
      {agenda.length > 0 && (
        <ul className="flex flex-col gap-1">
          {agenda.map((item, i) => (
            <li
              key={i}
              className="flex items-center justify-between gap-3 rounded-md px-3 py-2 group border border-transparent hover:border-white/[0.05] hover:bg-white/[0.02] transition-all"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-white/20 text-[11px] w-4 shrink-0 text-right">{i + 1}.</span>
                <span className="text-white/55 text-sm truncate">{item}</span>
              </div>
              <button
                type="button"
                onClick={() => onRemoveAgenda(i)}
                className="text-white/15 hover:text-red-400/60 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer shrink-0"
              >
                <X className="w-3 h-3" />
              </button>
            </li>
          ))}
        </ul>
      )}
      {errors.agenda && <FieldError msg={errors.agenda} />}
    </div>

    <div className="h-px bg-white/[0.05]" />

    {/* ── Tags ── */}
    <div className="flex flex-col gap-3">
      <div>
        <p className="text-white/35 text-xs font-medium">
          Tags <span className="text-white/20">*</span>
        </p>
        <p className="text-white/20 text-[11px] mt-0.5">Press Enter to add.</p>
      </div>
      <div className="flex gap-2">
        <Input
          placeholder="e.g. react, nextjs, web-dev"
          value={tagInput}
          onChange={(e) => onTagInputChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onAddTag();
            }
          }}
          className=""
        />
        <AddButton onClick={onAddTag} />
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 bg-white/[0.04] border border-white/[0.07] text-white/45 text-xs px-2.5 py-1 rounded-md"
            >
              {tag}
              <button
                type="button"
                onClick={() => onRemoveTag(i)}
                className="text-white/20 hover:text-red-400/60 transition-colors cursor-pointer"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </span>
          ))}
        </div>
      )}
      {errors.tags && <FieldError msg={errors.tags} />}
    </div>
  </div>
);

export default ContentStep;
