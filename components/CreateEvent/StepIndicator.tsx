import { Check } from "lucide-react";
import { STEPS } from "./helpers";

const StepIndicator = ({ step }: { step: number }) => (
  <div className="mb-8">
    <div className="relative flex items-start justify-between">
      {/* track */}
      <div className="absolute top-[14px] left-0 right-0 h-px bg-white/[0.06]" />
      {/* fill */}
      <div
        className="absolute top-[14px] left-0 h-px bg-white/20 transition-all duration-500 ease-out"
        style={{ width: step === 1 ? "0%" : step === 2 ? "50%" : "100%" }}
      />

      {STEPS.map((s) => {
        const isComplete = step > s.id;
        const isActive = step === s.id;
        return (
          <div key={s.id} className="relative z-10 flex flex-col items-center gap-2">
            <div
              className={`w-[28px] h-[28px] rounded-full flex-center text-xs font-medium transition-all duration-300 ${
                isComplete
                  ? "bg-white text-black"
                  : isActive
                    ? "bg-white/[0.08] border border-white/25 text-white/80"
                    : "bg-transparent border border-white/[0.08] text-white/20"
              }`}
            >
              {isComplete ? (
                <Check className="w-3 h-3" strokeWidth={3} />
              ) : (
                s.id
              )}
            </div>
            <p
              className={`text-[11px] leading-none transition-colors ${
                isActive ? "text-white/60" : isComplete ? "text-white/30" : "text-white/18"
              }`}
            >
              {s.title}
            </p>
          </div>
        );
      })}
    </div>
  </div>
);

export default StepIndicator;
