import { profile } from "../../data/profile.js";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/70 py-8 text-center text-xs text-slate-500">
      <p>© {profile.copyrightYear} Designed &amp; Built by {profile.name}</p>
    </footer>
  );
}
