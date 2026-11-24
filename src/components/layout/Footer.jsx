import { profile } from "../../data/profile.js";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-8 text-center text-xs text-[#7a8296]">
      <div className="flex w-full flex-col items-center justify-between gap-3 px-4 sm:flex-row sm:px-6 lg:px-8 xl:px-10">
        <p>
          © {profile.copyrightYear} {profile.name} · {profile.university}
        </p>
        <div className="flex items-center gap-4 text-xs">
          <span className="mono-font text-[#a3a9b8]">RUHUNA // CE-UG</span>
          <a
            href="#home"
            className="text-[#a3a9b8] transition-colors hover:text-[#eef0f5]"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
