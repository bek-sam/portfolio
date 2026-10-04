"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";

/* ---------- Cursor spotlight ---------- */
export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        ref.current?.style.setProperty(
          "background",
          `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, var(--spot), transparent 80%)`,
        );
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <div ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-30 transition duration-300" />;
}

/* ---------- Theme toggle ---------- */
function subscribeTheme(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}

export function useTheme() {
  const theme = useSyncExternalStore(
    subscribeTheme,
    () => (document.documentElement.dataset.theme === "light" ? "light" : "dark"),
    () => "dark" as const,
  );
  const toggle = useCallback(() => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }, []);
  return { theme, toggle };
}

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className="grid size-8 place-items-center rounded-md border border-line text-muted transition-colors hover:border-line-strong hover:text-fg"
    >
      {theme === "dark" ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      )}
    </button>
  );
}

/* ---------- Copy email ---------- */
export function CopyEmail({ email, className = "" }: { email: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.assign(`mailto:${email}`);
    }
  };
  return (
    <button type="button" onClick={copy} className={className} aria-live="polite">
      <span className="font-mono">{copied ? "copied to clipboard ✓" : email}</span>
    </button>
  );
}

/* ---------- Scroll-spy nav ---------- */
export function NavSpy({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="Sections" className="hidden lg:block">
      <ul className="space-y-0.5">
        {items.map((item, i) => {
          const on = active === item.id;
          return (
            <li key={item.id}>
              <a href={`#${item.id}`} className="group flex items-center gap-4 py-1.5" aria-current={on ? "true" : undefined}>
                <span className={`font-mono text-[10px] ${on ? "text-accent" : "text-faint"}`}>0{i + 1}</span>
                <span
                  className={`h-px transition-all duration-300 ease-out ${on ? "w-16 bg-fg" : "w-8 bg-faint group-hover:w-16 group-hover:bg-fg"}`}
                />
                <span
                  className={`text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors ${on ? "text-fg" : "text-faint group-hover:text-fg"}`}
                >
                  {item.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/* ---------- Reveal on scroll ---------- */
export function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

/* ---------- Command palette (⌘K) ---------- */
type Cmd = { id: string; label: string; hint: string; group: string; run: () => void };

export function CommandPalette({
  email,
  github,
  linkedin,
  resume,
  sections,
}: {
  email: string;
  github: string;
  linkedin: string;
  resume?: string;
  sections: { id: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const [toast, setToast] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { toggle } = useTheme();

  const flash = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 1600);
  };

  const commands = useMemo<Cmd[]>(() => {
    const go = (id: string) => () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    const list: Cmd[] = sections.map((s) => ({ id: `go-${s.id}`, label: s.label, hint: "jump", group: "Navigate", run: go(s.id) }));
    list.push(
      {
        id: "copy-email",
        label: "Copy email address",
        hint: email,
        group: "Contact",
        run: () => {
          navigator.clipboard?.writeText(email).then(() => flash("Email copied"));
        },
      },
      { id: "mail", label: "Send an email", hint: "mailto", group: "Contact", run: () => window.location.assign(`mailto:${email}`) },
      { id: "gh", label: "Open GitHub", hint: "github.com/bek-sam", group: "Links", run: () => window.open(github, "_blank") },
      { id: "li", label: "Open LinkedIn", hint: "in/bek-sam", group: "Links", run: () => window.open(linkedin, "_blank") },
    );
    if (resume) list.push({ id: "cv", label: "Download résumé", hint: "PDF", group: "Links", run: () => window.open(resume, "_blank") });
    list.push({ id: "theme", label: "Toggle light / dark theme", hint: "T", group: "Settings", run: toggle });
    return list;
  }, [email, github, linkedin, resume, sections, toggle]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return commands;
    return commands.filter((c) => `${c.label} ${c.group} ${c.hint}`.toLowerCase().includes(s));
  }, [q, commands]);

  const show = useCallback(() => {
    setQ("");
    setIdx(0);
    setOpen(true);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => {
          if (!o) {
            setQ("");
            setIdx(0);
          }
          return !o;
        });
      } else if (e.key === "Escape") setOpen(false);
    };
    const onOpen = show;
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpen);
    };
  }, [show]);

  const exec = (c?: Cmd) => {
    if (!c) return;
    setOpen(false);
    c.run();
  };

  return (
    <>
      {toast && (
        <div className="rise fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-full border border-line bg-elev px-4 py-2 font-mono text-xs text-fg shadow-lg">
          {toast}
        </div>
      )}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 px-4 pt-[15vh] backdrop-blur-sm"
          onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div role="dialog" aria-modal="true" aria-label="Command palette" className="rise w-full max-w-lg overflow-hidden rounded-xl border border-line-strong bg-elev shadow-2xl">
            <div className="flex items-center gap-3 border-b border-line px-4">
              <span className="font-mono text-accent">›</span>
              <input
                ref={inputRef}
                autoFocus
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setIdx(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setIdx((i) => Math.min(i + 1, filtered.length - 1));
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setIdx((i) => Math.max(i - 1, 0));
                  } else if (e.key === "Enter") exec(filtered[idx]);
                }}
                placeholder="Type a command or search…"
                className="h-12 w-full bg-transparent text-sm text-fg outline-none placeholder:text-faint"
                aria-label="Search commands"
              />
              <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-faint">esc</kbd>
            </div>
            <ul className="max-h-80 overflow-y-auto p-2" role="listbox">
              {filtered.length === 0 && <li className="px-3 py-6 text-center text-sm text-faint">No matches.</li>}
              {filtered.map((c, i) => (
                <li
                  key={c.id}
                  role="option"
                  aria-selected={i === idx}
                  onMouseEnter={() => setIdx(i)}
                  onClick={() => exec(c)}
                  className={`flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm ${i === idx ? "bg-card-hover text-fg" : "text-muted"}`}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-16 font-mono text-[10px] uppercase tracking-wider text-faint">{c.group}</span>
                    {c.label}
                  </span>
                  <span className="font-mono text-[11px] text-faint">{c.hint}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export function PaletteButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("open-palette"))}
      className="inline-flex h-8 items-center gap-2 rounded-md border border-line px-2.5 font-mono text-[11px] text-muted transition-colors hover:border-line-strong hover:text-fg"
    >
      <span>⌘K</span>
      <span className="hidden sm:inline">menu</span>
    </button>
  );
}
