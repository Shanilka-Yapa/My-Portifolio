import { profile } from "../../data/profile.js";
import { useScrollReveal } from "../../hooks/useScrollReveal.js";

export default function ProfileCard() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div ref={ref} className={`w-full lg:justify-self-end ${isVisible ? "is-visible" : ""} reveal`}>
      <div className="relative mx-auto w-full max-w-md lg:max-w-none">
        <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-cyan-400/20 via-violet-500/10 to-fuchsia-400/20 blur-2xl" />
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-700/80 bg-slate-950/75 p-6 shadow-2xl shadow-cyan-950/30 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="work-meta">Profile</div>
              <h2 className="brand-font mt-2 text-2xl font-bold text-white sm:text-3xl">
                {profile.name}
              </h2>
              <p className="mt-2 max-w-sm text-sm leading-7 text-slate-400">
                {profile.bio}
              </p>
            </div>
            <span className="status-pill status-build shrink-0">Build mode</span>
          </div>

          <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-slate-700 bg-slate-900/70">
            <img
              src={profile.image}
              alt={`Portrait of ${profile.name}`}
              className="h-[24rem] w-full object-cover object-top"
              width="800"
              height="960"
              fetchPriority="high"
            />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="stat-card">
              <div className="work-meta">Current direction</div>
              <p className="mt-2 text-sm text-slate-300">{profile.currentDirection}</p>
            </div>
            <div className="stat-card">
              <div className="work-meta">Best fit</div>
              <p className="mt-2 text-sm text-slate-300">{profile.bestFit}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
