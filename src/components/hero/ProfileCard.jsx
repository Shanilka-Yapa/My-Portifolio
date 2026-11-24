import { profile } from "../../data/profile.js";
import { useScrollReveal } from "../../hooks/useScrollReveal.js";

export default function ProfileCard() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div ref={ref} className={`w-full lg:justify-self-end ${isVisible ? "is-visible" : ""} reveal`}>
      <div className="card-panel relative mx-auto w-full max-w-md lg:max-w-md xl:max-w-lg p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between border-b border-white/[0.06] pb-3">
          <div>
            <span className="mono-font text-xs text-[#7a8296]">ENGINEERING PROFILE</span>
            <h2 className="brand-font text-lg font-bold text-[#eef0f5]">{profile.name}</h2>
          </div>
          <span className="tag-chip mono-font text-[11px] text-sky-400">
            {profile.university}
          </span>
        </div>

        <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#07080d]">
          <img
            src={profile.image}
            alt={`Portrait of ${profile.name}`}
            className="h-[21rem] w-full object-cover object-top sm:h-[23rem] xl:h-[25rem]"
            width="800"
            height="960"
            fetchPriority="high"
          />
        </div>

        <div className="mt-4 space-y-2.5">
          <div className="rounded-lg border border-white/[0.06] bg-[#1a1e28]/50 p-3">
            <div className="mono-font text-[11px] text-[#7a8296]">PRIMARY FOCUS</div>
            <p className="mt-0.5 text-xs text-[#eef0f5]">{profile.bestFit}</p>
          </div>
          <div className="flex items-center justify-between px-1 pt-1 text-[11px] text-[#7a8296]">
            <span className="mono-font">STATUS: AVAILABLE</span>
            <span className="mono-font text-sky-400">RUHUNA // DEPT:CE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
