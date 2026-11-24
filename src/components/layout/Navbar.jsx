import { useEffect, useRef, useState } from "react";
import { Mail, Menu, X } from "lucide-react";
import { profile } from "../../data/profile.js";
import { navigation } from "../../data/navigation.js";

export default function Navbar({ activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar-shell fixed inset-x-0 top-0 z-50">
      <nav
        className="flex w-full items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8 xl:px-10"
        aria-label="Main navigation"
      >
        <a
          href="#home"
          onClick={closeMenu}
          className="brand-font text-base font-bold tracking-tight text-[#eef0f5] transition-colors hover:text-sky-400 sm:text-lg"
        >
          <span>Shanilka</span>
          <span className="mono-font text-sky-400">.dev</span>
        </a>

        <div className="hidden items-center gap-7 text-sm md:flex">
          {navigation.map((item) => (
            <a
              key={item.section}
              href={item.href}
              className={`nav-link ${activeSection === item.section ? "active" : ""}`}
              aria-current={activeSection === item.section ? "location" : undefined}
            >
              {item.label}
            </a>
          ))}
        </div>

        <a
          href={`mailto:${profile.email}`}
          className="secondary-button hidden text-xs md:inline-flex"
        >
          <Mail aria-hidden="true" size={14} />
          <span>Get in touch</span>
        </a>

        <button
          ref={menuButtonRef}
          type="button"
          className="rounded-lg border border-white/[0.08] bg-[#11141c] p-2 text-[#a3a9b8] transition-colors hover:text-[#eef0f5] md:hidden"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" size={18} /> : <Menu aria-hidden="true" size={18} />}
        </button>

        {menuOpen && (
          <div
            id="mobile-navigation"
            className="card-panel absolute inset-x-4 top-[calc(100%+0.5rem)] flex flex-col gap-1 p-3 md:hidden shadow-xl"
          >
            {navigation.map((item) => (
              <a
                key={item.section}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  activeSection === item.section
                    ? "bg-[#1a1e28] text-sky-400"
                    : "text-[#a3a9b8] hover:bg-[#1a1e28] hover:text-[#eef0f5]"
                }`}
                aria-current={activeSection === item.section ? "location" : undefined}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
            <a
              href={`mailto:${profile.email}`}
              className="primary-button mt-2 justify-center text-xs"
            >
              <Mail aria-hidden="true" size={14} />
              <span>Get in touch</span>
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
