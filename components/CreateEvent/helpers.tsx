export const STEPS = [
  { id: 1, title: "Overview" },
  { id: 2, title: "Details" },
  { id: 3, title: "Content" },
] as const;

// Error-state border override — base styles live in Input/Textarea components
export const inputCls = (hasError?: boolean) =>
  hasError ? "border-red-500/30 focus-visible:border-red-500/30" : "";

export const selectTriggerCls =
  "bg-white/[0.03] border border-white/[0.07] text-white/80 focus:ring-0 focus:border-white/20 transition-colors data-[placeholder]:text-white/20";

export const selectContentCls = "bg-[#0e151a] border border-white/[0.07] text-white/80";

export const selectItemCls = "focus:bg-white/[0.04] focus:text-white/80 cursor-pointer";

export const SectionHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => (
  <div className="flex items-center gap-3">
    <div>
      <p className="font-semibold text-[15px] text-foreground leading-none">
        {title}
      </p>
      <p className="text-white/35 text-xs mt-1">{subtitle}</p>
    </div>
  </div>
);

export const FieldError = ({ msg }: { msg: string }) => (
  <p className="text-red-400/70 text-[11px]">{msg}</p>
);

export const FormField = ({
  label,
  htmlFor,
  required,
  error,
  hint,
  counter,
  children,
}: {
  label: string;
  htmlFor?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  counter?: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-1.5">
    <label
      htmlFor={htmlFor}
      className="text-white/35 text-xs font-medium select-none"
    >
      {label}
      {required && <span className="text-white/20 ml-0.5">*</span>}
    </label>
    {children}
    {(error || hint || counter) && (
      <div className="flex items-center justify-between min-h-[14px]">
        {error ? (
          <FieldError msg={error} />
        ) : hint ? (
          <p className="text-white/25 text-[11px]">{hint}</p>
        ) : (
          <span />
        )}
        {counter && <p className="text-white/20 text-[11px]">{counter}</p>}
      </div>
    )}
  </div>
);
