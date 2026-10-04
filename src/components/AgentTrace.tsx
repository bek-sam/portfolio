"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Kind = "cmd" | "step" | "ok" | "err" | "wait" | "dim" | "sep" | "done";
type Line = { kind: Kind; text: string; meta?: string; delay?: number };

// A recorded replay of IntentLock's real enforcement flow (see lib/vha.ts in the repo).
const SCRIPT: Line[] = [
  { kind: "cmd", text: "intentlock run --agent shopper-01 --demo" },
  { kind: "step", text: "agent.propose  purchase_ticket", meta: "Rice Concert 2026 · $180 · OwlTickets" },
  { kind: "dim", text: "canonicalize(action) → sha256 4be1…9c0a" },
  { kind: "step", text: "policy.evaluate  default-deny", meta: "11 checks" },
  { kind: "ok", text: "identity · agent · grant_sig · scope · amount ≤ $200 · purpose" },
  { kind: "ok", text: "expiry · epoch · delegation · identity_fresh · safety" },
  { kind: "dim", text: "risk.score 41 → tier T2 · step-up: passkey" },
  { kind: "wait", text: "human.approve  WebAuthn passkey", meta: "challenge ⟵ digest+nonce+epoch", delay: 900 },
  { kind: "ok", text: "approval signed (ES256 · P-256)" },
  { kind: "step", text: "execute  reserve(action_id, nonce, idem_key)" },
  { kind: "ok", text: "executed exactly once · receipt signed · audit #0042 chained" },
  { kind: "sep", text: "attack: prompt injection" },
  { kind: "step", text: "agent.propose  purchase_gift_card", meta: "$500 · from injected page" },
  { kind: "err", text: "DENIED: scope check: operation not in grant" },
  { kind: "sep", text: "attack: replay approval" },
  { kind: "step", text: "execute  (same approval, same nonce)" },
  { kind: "err", text: "DENIED: UNIQUE(nonce) violation at the database" },
  { kind: "done", text: "1 action executed · 2 attacks blocked · chain verified ✓" },
];

const BASE_DELAY = 420;

export function AgentTrace() {
  const [shown, setShown] = useState(0);
  const [speed, setSpeed] = useState<1 | 4>(1);
  const [started, setStarted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Start when the panel scrolls into view; with reduced motion, show everything at once.
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (reduced) setShown(SCRIPT.length);
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started || shown >= SCRIPT.length) return;
    const next = SCRIPT[shown];
    const t = setTimeout(() => setShown((n) => n + 1), (next.delay ?? BASE_DELAY) / speed);
    return () => clearTimeout(t);
  }, [started, shown, speed]);

  useEffect(() => {
    const body = bodyRef.current;
    if (body) body.scrollTop = body.scrollHeight;
  }, [shown]);

  const replay = useCallback(() => {
    setShown(0);
    setStarted(true);
  }, []);

  const finished = shown >= SCRIPT.length;
  const waiting = !finished && started && SCRIPT[shown]?.kind === "wait";

  return (
    <div
      ref={rootRef}
      className="overflow-hidden rounded-xl border border-line bg-elev shadow-[0_30px_80px_-40px_rgba(0,0,0,0.6)]"
    >
      <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
        </div>
        <p className="font-mono text-[11px] text-faint">intentlock · agent run replay</p>
        <div className="ml-auto flex items-center gap-1 font-mono text-[11px]">
          <span
            className={`mr-2 inline-flex items-center gap-1.5 ${finished ? "text-accent" : waiting ? "text-amber" : "text-muted"}`}
          >
            <span
              className={`size-1.5 rounded-full ${finished ? "bg-accent" : waiting ? "bg-amber" : "bg-muted"}`}
            />
            {finished ? "verified" : waiting ? "awaiting human" : started ? "running" : "idle"}
          </span>
          <button
            type="button"
            onClick={() => setSpeed((s) => (s === 1 ? 4 : 1))}
            className="rounded px-1.5 py-0.5 text-muted transition-colors hover:bg-card-hover hover:text-fg"
            aria-label={`Playback speed ${speed}x, click to toggle`}
          >
            {speed}×
          </button>
          <button
            type="button"
            onClick={replay}
            className="rounded px-1.5 py-0.5 text-muted transition-colors hover:bg-card-hover hover:text-fg"
          >
            ↻ replay
          </button>
        </div>
      </div>

      <div
        ref={bodyRef}
        className="h-[340px] overflow-y-auto px-4 py-3 font-mono text-[12.5px] leading-[1.75] sm:h-[360px]"
        role="log"
        aria-live="polite"
        aria-label="Replay of an IntentLock agent authorization run"
      >
        {SCRIPT.slice(0, shown).map((line, i) => (
          <TraceLine key={i} line={line} />
        ))}
        {!finished && <span className="caret text-faint" aria-hidden />}
      </div>

      <div className="border-t border-line px-4 py-2 font-mono text-[10.5px] text-faint">
        A recorded replay of IntentLock&apos;s real enforcement path. The digest is illustrative.
      </div>
    </div>
  );
}

function TraceLine({ line }: { line: Line }) {
  const base = "rise flex gap-2 whitespace-pre-wrap break-words";
  switch (line.kind) {
    case "cmd":
      return (
        <div className={`${base} text-fg`}>
          <span className="text-accent">$</span>
          <span>{line.text}</span>
        </div>
      );
    case "step":
    case "wait":
      return (
        <div className={`${base} text-fg`}>
          <span className={line.kind === "wait" ? "text-amber" : "text-violet"}>
            {line.kind === "wait" ? "⏸" : "▸"}
          </span>
          <span>
            {line.text}
            {line.meta && <span className="text-faint">{"  "}{line.meta}</span>}
          </span>
        </div>
      );
    case "ok":
      return (
        <div className={`${base} pl-4 text-muted`}>
          <span className="text-accent">✓</span>
          <span>{line.text}</span>
        </div>
      );
    case "err":
      return (
        <div className={`${base} pl-4 text-red`}>
          <span>✗</span>
          <span>{line.text}</span>
        </div>
      );
    case "dim":
      return (
        <div className={`${base} pl-4 text-faint`}>
          <span>↳</span>
          <span>{line.text}</span>
        </div>
      );
    case "sep":
      return (
        <div className={`${base} mt-2 items-center text-amber`}>
          <span className="h-px w-4 bg-amber/40" />
          <span className="text-[11px] uppercase tracking-wider">{line.text}</span>
        </div>
      );
    case "done":
      return (
        <div className={`${base} mt-2 rounded-md bg-accent-soft px-2 py-1 text-accent`}>
          <span>■</span>
          <span>{line.text}</span>
        </div>
      );
  }
}
