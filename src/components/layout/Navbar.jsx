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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-800/70 glass-panel">
      <nav
        className="mx-auto flex max-w-[1520px] items-center justify-between px-5 py-4 sm:px-8 lg:px-12"
        aria-label="Main navigation"
      >
        <a
          href="#home"
          onClick={closeMenu}
          className="brand-font text-lg font-bold tracking-[0.2em] text-slate-100 uppercase"
        >
          Shanilka<span className="text-cyan-300">.dev</span>
        </a>

        <div className="hidden items-center gap-8 text-sm font-medium md:flex">
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

        <a href={`mailto:${profile.email}`} className="ghost-button hidden md:inline-flex">
          <Mail aria-hidden="true" size={16} />
          Let us talk
        </a>

        <button
          ref={menuButtonRef}
          type="button"
          className="ghost-button inline-flex px-3 py-2 md:hidden"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
        </button>

        {menuOpen && (
          <div
            id="mobile-navigation"
            className="mobile-menu absolute inset-x-4 top-[calc(100%+0.65rem)] flex flex-col gap-1 rounded-2xl p-3 md:hidden"
          >
            {navigation.map((item) => (
              <a
                key={item.section}
                href={item.href}
                className={`mobile-nav-link ${activeSection === item.section ? "active" : ""}`}
                aria-current={activeSection === item.section ? "location" : undefined}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
            <a href={`mailto:${profile.email}`} className="ghost-button mt-2 justify-center">
              <Mail aria-hidden="true" size={16} />
              Let us talk
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
