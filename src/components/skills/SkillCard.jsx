import {
  Atom,
  Binary,
  Blocks,
  Box,
  Boxes,
  Cloud,
  Code2,
  Cpu,
  Database,
  Flame,
  GitBranch,
  HardDrive,
  Layers,
  Palette,
  PenTool,
  Server,
  Shield,
  Smartphone,
  Terminal,
  Zap,
} from "lucide-react";

const ICON_MAP = {
  Atom,
  Binary,
  Blocks,
  Box,
  Boxes,
  Cloud,
  Code2,
  Cpu,
  Database,
  Flame,
  GitBranch,
  HardDrive,
  Layers,
  Palette,
  PenTool,
  Server,
  Shield,
  Smartphone,
  Terminal,
  Zap,
};

export default function SkillCard({ skill }) {
  const IconComponent = ICON_MAP[skill.icon] ?? Code2;

  return (
    <div className="flex items-start gap-3 rounded-lg border border-white/[0.06] bg-[#1a1e28]/35 p-3 transition-colors hover:border-white/[0.14] hover:bg-[#1a1e28]/60">
      <div
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-white/[0.08] bg-[#11141c] text-sky-400"
        aria-hidden="true"
      >
        <IconComponent size={15} />
      </div>

      <div className="min-w-0 flex-1">
        <h4 className="text-sm font-semibold text-[#eef0f5]">
          {skill.name}
        </h4>
        <p className="mt-0.5 text-xs leading-relaxed text-[#7a8296]">
          {skill.note}
        </p>
      </div>
    </div>
  );
}
