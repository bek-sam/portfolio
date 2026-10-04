import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { AgentTrace } from "@/components/AgentTrace";
import {
  CommandPalette,
  CopyEmail,
  NavSpy,
  PaletteButton,
  Reveal,
  Spotlight,
  ThemeToggle,
} from "@/components/interactive";
import { education, experience, heroStats, honors, profile, projects, skills, type Project } from "@/data/content";

const sections = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "toolkit", label: "Toolkit" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

// Only show the résumé link if the PDF has actually been dropped into /public.
const hasResume = fs.existsSync(path.join(process.cwd(), "public", profile.resume));
const resume = hasResume ? profile.resume : undefined;

const accentText: Record<Project["accent"], string> = {
  lime: "text-accent",
  violet: "text-violet",
  amber: "text-amber",
  sky: "text-sky",
};
const accentBg: Record<Project["accent"], string> = {
  lime: "bg-accent",
  violet: "bg-violet",
  amber: "bg-amber",
  sky: "bg-sky",
};

export default function Home() {
  const featured = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured);

  return (
    <>
      <Spotlight />
      <CommandPalette
        email={profile.email}
        github={profile.github}
        linkedin={profile.linkedin}
        resume={resume}
        sections={sections}
      />
      <div aria-hidden className="backdrop-grid pointer-events-none fixed inset-0 -z-10" />

      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-ink"
      >
        Skip to content
      </a>

      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-line bg-bg/80 px-5 py-3 backdrop-blur-md lg:hidden">
        <a href="#" className="font-semibold tracking-tight">
          bek<span className="text-accent">.</span>sam
        </a>
        <div className="flex items-center gap-2">
          <PaletteButton />
          <ThemeToggle />
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl px-5 sm:px-8 lg:flex lg:gap-16 lg:px-12 xl:px-16">
        {/* ---------- Left rail ---------- */}
        <header className="pt-12 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[44%] lg:flex-col lg:justify-between lg:py-14">
          <div>
            <div className="flex items-center gap-4">
              <Image
                src="/bek.jpg"
                alt="Portrait of Bekbolsun Samaganov"
                width={56}
                height={56}
                priority
                className="size-14 rounded-full object-cover ring-1 ring-line-strong"
              />
              <p className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted">
                <span className="pulse-dot size-1.5 rounded-full bg-accent" />
                {profile.status}
              </p>
            </div>

            <h1 className="mt-6 text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.035em] sm:text-5xl xl:text-[3.25rem]">
              Bekbolsun
              <br />
              <span className="font-serif text-[1.08em] font-normal italic tracking-[-0.01em] text-muted">Samaganov</span>
            </h1>
            <p className="mt-4 text-lg font-medium tracking-tight">
              {profile.role} <span className="text-faint">·</span>{" "}
              <span className="text-muted">{profile.focus}</span>
            </p>
            <p className="mt-4 max-w-md leading-relaxed text-muted">{profile.tagline}</p>

            <div className="mt-7 flex flex-wrap items-center gap-2">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex h-9 items-center gap-2 rounded-md bg-accent px-4 text-sm font-semibold text-accent-ink transition-transform hover:-translate-y-0.5"
              >
                Get in touch <span aria-hidden>→</span>
              </a>
              {resume && (
                <a
                  href={resume}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-9 items-center gap-2 rounded-md border border-line-strong px-4 text-sm font-medium transition-colors hover:bg-card-hover"
                >
                  Résumé <span aria-hidden>↗</span>
                </a>
              )}
              <div className="hidden lg:flex lg:items-center lg:gap-2">
                <PaletteButton />
                <ThemeToggle />
              </div>
            </div>

            <div className="mt-10">
              <NavSpy items={sections} />
            </div>
          </div>

          <div className="mt-10 flex items-center gap-5 text-muted lg:mt-0">
            <Social href={profile.github} label="GitHub">
              <path d="M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0C17.3 4.3 18.3 4.6 18.3 4.6c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .5Z" />
            </Social>
            <Social href={profile.linkedin} label="LinkedIn">
              <path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2ZM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2ZM7.1 20.5H3.5V9h3.6v11.5ZM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0Z" />
            </Social>
            <CopyEmail
              email={profile.email}
              className="text-xs text-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-fg"
            />
          </div>
        </header>

        {/* ---------- Right column ---------- */}
        <main id="content" className="pb-24 pt-16 lg:w-[56%] lg:py-14">
          {/* Signature: agent trace */}
          <Reveal>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
              <span className="text-accent">●</span> live demo: what I build
            </p>
            <h2 className="mb-5 text-2xl font-semibold tracking-tight sm:text-[1.7rem]">
              Agents are powerful.{" "}
              <span className="font-serif text-[1.15em] font-normal italic text-muted">I make them accountable.</span>
            </h2>
            <AgentTrace />
          </Reveal>

          <Reveal className="mt-8">
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
              {heroStats.map((s) => (
                <div key={s.label} className="bg-bg px-4 py-4">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="text-2xl font-semibold tracking-tight tabular-nums">{s.value}</dd>
                  <dd className="mt-1 text-xs text-faint">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* ---------- Work ---------- */}
          <Section id="work" index="01" title="Selected work">
            <div className="dim-group space-y-5">
              {featured.map((p) => (
                <ProjectCard key={p.slug} p={p} />
              ))}
            </div>
            {more.length > 0 && (
              <div className="mt-5 dim-group grid gap-5">
                {more.map((p) => (
                  <CompactProject key={p.slug} p={p} />
                ))}
              </div>
            )}
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-medium"
            >
              More on GitHub
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </Section>

          {/* ---------- Experience ---------- */}
          <Section id="experience" index="02" title="Experience">
            <ol className="dim-group relative space-y-4">
              {experience.map((e) => (
                <li
                  key={e.company}
                  className="dim-item group grid gap-2 rounded-xl border border-transparent p-5 hover:border-line hover:bg-card sm:grid-cols-[9rem_1fr] sm:gap-6"
                >
                  <div className="font-mono text-[11px] uppercase tracking-wider text-faint sm:pt-1">
                    {e.period}
                    {e.current && (
                      <span className="mt-2 flex items-center gap-1.5 normal-case tracking-normal text-accent">
                        <span className="size-1.5 rounded-full bg-accent" /> current
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold leading-snug">
                      {e.role} <span className="text-faint">·</span> <span className="text-accent">{e.company}</span>
                    </h3>
                    <p className="mt-0.5 text-xs text-faint">{e.location}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{e.summary}</p>
                    <ul className="mt-3 space-y-2">
                      {e.bullets.map((b) => (
                        <li key={b} className="flex gap-3 text-sm leading-relaxed text-muted">
                          <span aria-hidden className="mt-[0.6em] size-1 shrink-0 rounded-full bg-faint" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <Pills items={e.stack} />
                  </div>
                </li>
              ))}
            </ol>
          </Section>

          {/* ---------- Toolkit ---------- */}
          <Section id="toolkit" index="03" title="Toolkit">
            <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
              {skills.map((s) => (
                <div key={s.group} className="bg-bg p-5">
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">{s.group}</h3>
                  <p className="mt-3 text-sm leading-7 text-fg">
                    {s.items.map((it, i) => (
                      <span key={it}>
                        {it}
                        {i < s.items.length - 1 && <span className="text-faint"> / </span>}
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            </div>

            <h3 className="mb-4 mt-12 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">Honors &amp; leadership</h3>
            <ul className="divide-y divide-line border-y border-line">
              {honors.map((h) => (
                <li key={h.title} className="flex items-baseline justify-between gap-4 py-3">
                  <span className="text-sm">
                    <span className="font-medium">{h.title}</span>
                    <span className="text-muted">, {h.detail}</span>
                  </span>
                  <span className="shrink-0 font-mono text-xs tabular-nums text-faint">{h.year}</span>
                </li>
              ))}
            </ul>
          </Section>

          {/* ---------- About ---------- */}
          <Section id="about" index="04" title="About">
            <div className="space-y-4 leading-relaxed text-muted">
              {profile.about.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-8 rounded-xl border border-line bg-card p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">Education</p>
              <div className="mt-3 flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-semibold">{education.school}</p>
                <p className="font-mono text-xs text-faint">{education.period}</p>
              </div>
              <p className="mt-1 text-sm text-muted">
                {education.degree} · GPA {education.gpa}
              </p>
            </div>
          </Section>

          {/* ---------- Contact ---------- */}
          <Section id="contact" index="05" title="Contact">
            <h3 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              Let&apos;s build something{" "}
              <span className="font-serif text-[1.12em] font-normal italic text-accent">worth trusting.</span>
            </h3>
            <p className="mt-4 max-w-lg leading-relaxed text-muted">
              I&apos;m looking for new-grad software engineering and AI engineering roles starting in 2027, and I&apos;m open
              to relocating. The fastest way to reach me is email.
            </p>

            <div className="mt-8 overflow-hidden rounded-xl border border-line bg-elev font-mono text-[12.5px]">
              <div className="border-b border-line px-4 py-2 text-[11px] text-faint">~/contact</div>
              <div className="space-y-1 px-4 py-4 leading-relaxed">
                <p>
                  <span className="text-accent">$</span> whoami
                </p>
                <p className="text-muted">bekbolsun samaganov · swe · {profile.location.toLowerCase()}</p>
                <p className="pt-2">
                  <span className="text-accent">$</span> echo $STATUS
                </p>
                <p className="text-muted">open to new-grad SWE / AI engineer roles · grad {profile.graduation.toLowerCase()}</p>
                <p className="pt-2">
                  <span className="text-accent">$</span> open mailto:<a className="text-fg underline decoration-line-strong underline-offset-4 hover:decoration-accent" href={`mailto:${profile.email}`}>{profile.email}</a>
                  <span className="caret" aria-hidden />
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex h-10 items-center gap-2 rounded-md bg-accent px-5 text-sm font-semibold text-accent-ink transition-transform hover:-translate-y-0.5"
              >
                Email me →
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center rounded-md border border-line-strong px-5 text-sm font-medium transition-colors hover:bg-card-hover"
              >
                LinkedIn ↗
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center rounded-md border border-line-strong px-5 text-sm font-medium transition-colors hover:bg-card-hover"
              >
                GitHub ↗
              </a>
            </div>
          </Section>

          <footer className="mt-24 border-t border-line pt-6 text-xs leading-relaxed text-faint">
            <p>
              Designed &amp; built by Bekbolsun with Next.js and Tailwind CSS, statically exported. Every number on this page
              comes from the source repos, and simulated or projected figures are labeled. Press{" "}
              <kbd className="rounded border border-line px-1 font-mono">⌘K</kbd> to get around.
            </p>
          </footer>
        </main>
      </div>
    </>
  );
}

/* ---------- Server sub-components ---------- */

function Section({ id, index, title, children }: { id: string; index: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="mt-28 scroll-mt-20">
      <Reveal>
        <div className="mb-8 flex items-center gap-4">
          <span className="font-mono text-xs text-accent">{index}</span>
          <h2 id={`${id}-title`} className="text-sm font-semibold uppercase tracking-[0.2em]">
            {title}
          </h2>
          <span className="h-px flex-1 bg-line" />
        </div>
        {children}
      </Reveal>
    </section>
  );
}

function Pills({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
      {items.map((t) => (
        <li key={t} className="rounded-full bg-accent-soft px-2.5 py-1 font-mono text-[10.5px] text-accent">
          {t}
        </li>
      ))}
    </ul>
  );
}

function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split("`").map((part, i) =>
        i % 2 ? (
          <code key={i} className="inline">
            {part}
          </code>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <article className="dim-item group relative overflow-hidden rounded-2xl border border-line bg-card p-6 hover:border-line-strong hover:bg-card-hover sm:p-7">
      <span aria-hidden className={`absolute inset-x-0 top-0 h-px ${accentBg[p.accent]} opacity-60`} />
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className={`font-mono text-[11px] uppercase tracking-[0.16em] ${accentText[p.accent]}`}>{p.kicker}</p>
        <p className="font-mono text-[11px] text-faint">{p.period}</p>
      </div>

      <h3 className="mt-3 text-2xl font-semibold tracking-tight">
        {p.links[0] ? (
          <a href={p.links[0].href} target="_blank" rel="noreferrer" className="inline-flex items-baseline gap-2">
            {p.name}
            <span aria-hidden className="text-base text-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg">
              ↗
            </span>
          </a>
        ) : (
          p.name
        )}
      </h3>
      <p className="mt-2 leading-relaxed text-muted">{p.oneLiner}</p>

      <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-4">
        {p.metrics.map((m) => (
          <div key={m.label} className="border-l border-line pl-3">
            <dt className="sr-only">{m.label}</dt>
            <dd className={`text-xl font-semibold tabular-nums tracking-tight ${accentText[p.accent]}`}>{m.value}</dd>
            <dd className="text-[11px] leading-tight text-faint">{m.label}</dd>
          </div>
        ))}
      </dl>

      <details className="group/d mt-5 border-t border-line pt-4">
        <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-medium text-fg [&::-webkit-details-marker]:hidden">
          <span className="grid size-5 place-items-center rounded border border-line font-mono text-xs transition-transform group-open/d:rotate-45">
            +
          </span>
          Case study: problem, build, and caveats
        </summary>
        <div className="mt-4 space-y-4 text-sm leading-relaxed">
          <div>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">Problem</p>
            <p className="mt-1 text-muted">{p.problem}</p>
          </div>
          <div>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">What I built</p>
            <ul className="mt-2 space-y-2">
              {p.built.map((b) => (
                <li key={b} className="flex gap-3 text-muted">
                  <span aria-hidden className={accentText[p.accent]}>→</span>
                  <span>
                    <Rich text={b} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
          {p.honesty && (
            <p className="rounded-lg border border-dashed border-line-strong px-3 py-2 text-xs text-faint">
              <span className="font-mono uppercase tracking-wider">Honest note:</span> {p.honesty}
            </p>
          )}
        </div>
      </details>

      <Pills items={p.stack} />
    </article>
  );
}

function CompactProject({ p }: { p: Project }) {
  return (
    <article className="dim-item rounded-2xl border border-line p-5 hover:bg-card sm:flex sm:items-start sm:gap-6">
      <div className="sm:w-40 sm:shrink-0">
        <p className={`font-mono text-[11px] uppercase tracking-[0.16em] ${accentText[p.accent]}`}>{p.kicker}</p>
        <h3 className="mt-1 text-lg font-semibold tracking-tight">{p.name}</h3>
      </div>
      <div className="mt-2 sm:mt-0">
        <p className="text-sm leading-relaxed text-muted">
          {p.oneLiner} {p.built.join(". ")}.
        </p>
        <Pills items={p.stack} />
      </div>
    </article>
  );
}

function Social({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" aria-label={label} className="transition-colors hover:text-fg">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        {children}
      </svg>
    </a>
  );
}
