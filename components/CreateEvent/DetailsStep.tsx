import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SectionHeader,
  FormField,
  inputCls,
  selectTriggerCls,
  selectContentCls,
  selectItemCls,
} from "./helpers";
import type { Fields, Errors } from "./types";

interface Props {
  fields: Fields;
  errors: Errors;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onModeChange: (value: string) => void;
}

const DetailsStep = ({ fields, errors, onChange, onModeChange }: Props) => (
  <div className="animate-in fade-in duration-200 flex flex-col gap-6">
    <SectionHeader
      title="Where & When"
      subtitle="Add the location, date, and other event details."
    />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <FormField label="Venue" htmlFor="venue" required error={errors.venue}>
        <Input
          id="venue"
          name="venue"
          placeholder="e.g. Convention Center Hall A"
          value={fields.venue}
          onChange={onChange}
          className={inputCls(!!errors.venue)}
        />
      </FormField>
      <FormField
        label="City / Location"
        htmlFor="location"
        required
        error={errors.location}
      >
        <Input
          id="location"
          name="location"
          placeholder="e.g. San Francisco, CA"
          value={fields.location}
          onChange={onChange}
          className={inputCls(!!errors.location)}
        />
      </FormField>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
      <FormField label="Date" htmlFor="date" required error={errors.date}>
        <Input
          id="date"
          name="date"
          type="date"
          value={fields.date}
          onChange={onChange}
          className={`${inputCls(!!errors.date)} [color-scheme:dark]`}
        />
      </FormField>
      <FormField label="Time" htmlFor="time" required error={errors.time}>
        <Input
          id="time"
          name="time"
          type="time"
          value={fields.time}
          onChange={onChange}
          className={`${inputCls(!!errors.time)} [color-scheme:dark]`}
        />
      </FormField>
      <FormField label="Mode" required>
        <Select value={fields.mode} onValueChange={onModeChange}>
          <SelectTrigger className={selectTriggerCls}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className={selectContentCls}>
            <SelectItem value="online" className={selectItemCls}>Online</SelectItem>
            <SelectItem value="offline" className={selectItemCls}>Offline</SelectItem>
            <SelectItem value="hybrid" className={selectItemCls}>Hybrid</SelectItem>
          </SelectContent>
        </Select>
      </FormField>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <FormField
        label="Organizer"
        htmlFor="organizer"
        required
        error={errors.organizer}
      >
        <Input
          id="organizer"
          name="organizer"
          placeholder="e.g. Vercel"
          value={fields.organizer}
          onChange={onChange}
          className={inputCls(!!errors.organizer)}
        />
      </FormField>
      <FormField
        label="Target Audience"
        htmlFor="audience"
        required
        error={errors.audience}
      >
        <Input
          id="audience"
          name="audience"
          placeholder="e.g. Frontend Developers"
          value={fields.audience}
          onChange={onChange}
          className={inputCls(!!errors.audience)}
        />
      </FormField>
    </div>
  </div>
);

export default DetailsStep;
