// Single source of truth for the portfolio.
// Every number here is taken from the verified "Story Bank" in Notion (Oct 2026).
// Keep claims honest: if something is simulated, projected, or not deployed, say so.

export const profile = {
  name: "Bekbolsun Samaganov",
  short: "Bek",
  role: "Software Engineer",
  focus: "AI agents · full-stack · systems",
  location: "Houston, TX",
  email: "bekbol.samaganov@gmail.com",
  github: "https://github.com/bek-sam",
  linkedin: "https://www.linkedin.com/in/bek-sam",
  resume: "/Bekbolsun_Samaganov_Resume.pdf",
  status: "Open to new-grad SWE / AI engineer roles · 2027",
  graduation: "Dec 2026",
  tagline:
    "I build software that people can trust, including the guardrails around AI agents. I've shipped native apps, multi-tenant SaaS, and an agent authorization gateway, and my work is tested and documented.",
  about: [
    "I'm a CS senior at North American University in Houston (GPA 3.58, graduating Dec 2026), originally from Bishkek, Kyrgyzstan. I started on front-end work in 2022, then moved into backend, data and AI systems.",
    "Right now I'm the only software engineer at Keystone Tile, a stone and tile distributor with five locations. I sit with the people who use my tools, learn how they work, and build what they need. So far that's a native iOS/macOS app, a website rebuild, data pipelines and field-sales software.",
    "Outside work I build with AI agents in two ways. I engineer guardrails for them: policy engines, passkey approvals, and audit trails. I also use them as a team: I designed a 20-role Claude Code agent team with its own operating system of ownership rules, review gates, and evals. I'm careful to say exactly what's real, what's simulated and what's projected.",
  ],
};

export type Stat = { value: string; label: string };

export const heroStats: Stat[] = [
  { value: "3", label: "engineering internships" },
  { value: "2,800+", label: "automated tests across projects" },
  { value: "20", label: "agent roles orchestrated" },
  { value: "ICPC", label: "regional silver · 2025" },
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  bullets: string[];
  stack: string[];
  current?: boolean;
};

export const experience: Experience[] = [
  {
    company: "Keystone Tile",
    role: "Software Engineer Intern",
    period: "Jun 2026 — Present",
    location: "Houston, TX",
    current: true,
    summary:
      "Sole engineer for a natural stone & tile distributor (5 locations, founded 1995). Product owner and engineer across 7 internal tools.",
    bullets: [
      "Built Keystone Hub, a native SwiftUI app for iPhone, iPad and Mac (~34K lines of Swift, zero third-party packages). It gives showroom and warehouse staff offline search over a 4,362-product catalog.",
      "Engineered offline-first sync with atomic, SHA-256-verified SQLite generations and one-click rollback, plus FTS5 search using weighted BM25 ranking and exact-SKU-first ordering.",
      "Shipped on-device barcode, OCR and stone photo matching with Apple Vision under a strict confidence policy, covered by 105 XCTests and 62 in-app self-tests in GitHub Actions CI.",
      "Built FieldOps, a field-sales platform (Django, Next.js, SwiftUI, Terraform/AWS), and a Next.js 16 website rebuild covering 1,764 products, 40 pages and 11 APIs, hardened with Zod, CSP and rate limits.",
      "Automated product data sheets for 1,583 SKUs at 99.975% visual match (SSIM 0.9995), and label generators producing 826 QR cards with 0 scan failures.",
    ],
    stack: ["Swift", "SwiftUI", "SQLite FTS5", "Vision", "Next.js", "Django", "Python", "Terraform", "AWS"],
  },
  {
    company: "Voyager Group",
    role: "Front-End Developer Intern",
    period: "Mar 2022 — Jan 2023",
    location: "Bishkek, KG",
    summary: "Travel booking product, including client work for USAID-funded projects.",
    bullets: [
      "Built responsive booking interfaces with React and Bootstrap, and integrated REST APIs across search and reservation flows.",
      "Built reusable UI components and optimized rendering to cut page-load time.",
      "Shipped in two-week Agile sprints with Git-based code review.",
    ],
    stack: ["React", "JavaScript", "REST", "Bootstrap"],
  },
  {
    company: "MitApp",
    role: "Software Developer Intern",
    period: "Aug 2022 — Nov 2022",
    location: "Bishkek, KG",
    summary: "Mobile & web product studio.",
    bullets: [
      "Delivered React/Redux interfaces from Figma designs and integrated REST APIs.",
      "Built Redux state management and a reusable component library, with unit tests and code reviews.",
    ],
    stack: ["React", "Redux", "Figma", "Jest"],
  },
];

export type Project = {
  slug: string;
  name: string;
  kicker: string;
  period: string;
  role: string;
  oneLiner: string;
  problem: string;
  built: string[];
  metrics: Stat[];
  stack: string[];
  honesty?: string;
  links: { label: string; href: string }[];
  accent: "lime" | "violet" | "amber" | "sky";
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "intentlock",
    name: "IntentLock",
    kicker: "Rice Hackathon 2026 · solo · 2 days",
    period: "Sep 2026",
    role: "Solo developer",
    oneLiner: "A verified-human authorization gateway for AI agents.",
    problem:
      "Agents can be prompt-injected, replayed or quietly escalated. Before an agent does anything irreversible, like buying a $180 ticket, a real, verified human should approve that exact action, and the approval should never be reusable.",
    built: [
      "A default-deny policy engine with 11 checks, kept outside the model, so a prompt-injected `purchase_gift_card` fails deterministically",
      "WebAuthn passkey approvals bound to a canonical SHA-256 digest of the exact action. Changing $180 to $1,800 breaks the signature",
      "Exactly-once execution backed by 3 database uniqueness constraints, and a kill switch that bumps a security epoch to revoke all authority at once",
      "A hash-chained, P-256-signed audit log, and a security lab that runs 10 attacks against the live enforcement code",
    ],
    metrics: [
      { value: "11", label: "policy checks" },
      { value: "10", label: "attack simulations" },
      { value: "T0–T5", label: "risk tiers" },
      { value: "48h", label: "build time" },
    ],
    stack: ["TypeScript", "React 19", "Cloudflare Workers", "D1", "Drizzle", "WebAuthn", "Web Crypto", "Persona"],
    honesty: "Hackathon prototype: Persona checks run in a labeled simulation mode without sandbox keys, and the merchant call is simulated.",
    links: [{ label: "GitHub", href: "https://github.com/bek-sam/intentlock" }],
    accent: "lime",
    featured: true,
  },
  {
    slug: "invai",
    name: "InvAI",
    kicker: "Founder project · built with a 20-agent team",
    period: "Sep 2026 — Present",
    role: "Founder & lead engineer",
    oneLiner: "An AI operations platform for DTF t-shirt print shops, built by an AI agent team I designed.",
    problem:
      "Multi-marketplace print shops juggle orders from Etsy, Amazon, Shopify and TikTok Shop, plus gang sheets, labels and margins, across a dozen tools. I wanted to find out how far one engineer can go by directing a disciplined team of AI agents.",
    built: [
      "Designed the agent operating system: 20 roles, 72 playbooks, path-ownership enforced by hooks, independent review, and an integration gate before every push",
      "Contract-first architecture: one typed oRPC/Zod package shared by the API, the dashboard and an offline-first tablet app across 8 repos",
      "Postgres row-level-security multi-tenancy (88 policies), a transactional outbox, and crash-safe exactly-once side effects for labels and purchase orders",
      "A Claude AI gateway with spend breakers, PII stripping, an untrusted-tool-output boundary and a 133-case eval harness",
    ],
    metrics: [
      { value: "8", label: "repos" },
      { value: "258", label: "typed API procedures" },
      { value: "~1.8k", label: "tests" },
      { value: "133", label: "eval cases" },
    ],
    stack: ["TypeScript", "Node 24", "Hono", "oRPC", "PostgreSQL 17", "BullMQ", "React 19", "Python", "libvips", "Claude API", "AWS (SST)"],
    honesty: "Agents wrote most of the code under my architecture, gates and review. It isn't deployed yet and has no pilot customers yet.",
    links: [],
    accent: "violet",
    featured: true,
  },
  {
    slug: "wardrobe-ai",
    name: "Wardrobe AI",
    kicker: "Personal project · solo",
    period: "Jul 2026",
    role: "Full-stack / AI engineer",
    oneLiner: "Photograph your clothes and get weather-aware outfits, week plans and AI try-on.",
    problem:
      "LLM stylists invent clothes you don't own. I wanted an assistant whose AI output is always checked against what you actually own and can wear right now.",
    built: [
      "15 OpenAI workflows (vision cataloging, garment extraction, web research, try-on with a QA gate), all using Zod structured outputs",
      "Deterministic validation: every AI outfit must use owned, available, role-correct items, otherwise it's rejected",
      "A 5-intent chat router where only 3 intents call a model, so lookup questions cost zero tokens",
      "Postgres job queue (`SKIP LOCKED`), RLS on every table (37 policies), and TOTP MFA enforced at the database layer",
    ],
    metrics: [
      { value: "787", label: "automated tests" },
      { value: "15", label: "GenAI workflows" },
      { value: "41", label: "Postgres tables" },
      { value: "81", label: "API routes" },
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Supabase", "PostgreSQL", "OpenAI", "Playwright", "GitHub Actions"],
    honesty: "Built with Claude Code as a pair: I directed the work and reviewed every change.",
    links: [{ label: "GitHub", href: "https://github.com/bek-sam/wardrobe_ai" }],
    accent: "amber",
    featured: true,
  },
  {
    slug: "neurotech",
    name: "NeuroTech",
    kicker: "Rice Datathon 2026",
    period: "Jan 2026",
    role: "ML engineer",
    oneLiner: "Decoding 4-class motor imagery from EEG across 86 subjects.",
    problem:
      "Brain–computer interfaces struggle to generalize to people the model has never seen.",
    built: [
      "Built an EEGNet-variant CNN in PyTorch, trained with subject-wise splits so validation only uses unseen people",
      "Reached ~51.5% validation accuracy on 4 classes (chance is 25%)",
    ],
    metrics: [
      { value: "86", label: "subjects" },
      { value: "51.5%", label: "unseen-subject acc." },
      { value: "4", label: "classes (25% chance)" },
    ],
    stack: ["Python", "PyTorch", "EEGNet", "NumPy"],
    links: [],
    accent: "sky",
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["TypeScript", "Python", "Swift", "Java", "C++", "SQL"] },
  { group: "AI / Agents", items: ["Claude API", "OpenAI", "Structured outputs", "Evals", "Agent guardrails", "PyTorch"] },
  { group: "Backend", items: ["Node.js", "Hono", "Django", "PostgreSQL", "Redis / BullMQ", "Supabase"] },
  { group: "Frontend & mobile", items: ["React 19", "Next.js", "Tailwind", "SwiftUI", "PWA / offline"] },
  { group: "Cloud & infra", items: ["AWS", "Cloudflare Workers", "Docker", "Terraform / SST", "GitHub Actions"] },
  { group: "Security", items: ["WebAuthn", "Row-level security", "OAuth / MFA", "CSP", "Signed audit logs"] },
];

export const honors: { title: string; detail: string; year: string }[] = [
  { title: "AWS Certified Developer", detail: "Associate", year: "2024" },
  { title: "ICPC Regional", detail: "Silver medal", year: "2025" },
  { title: "Kyrgyzstan Math Olympiad", detail: "Gold medal, twice", year: "2020–21" },
  { title: "Co-founder & President", detail: "KurultAi R&D Club, 30+ members", year: "2024–" },
  { title: "Treasurer & Mentor", detail: "ACM at NAU, mentoring 10+ students", year: "" },
  { title: "Teaching Assistant", detail: "ZERO ONE web development bootcamp", year: "2022" },
];

export const education = {
  school: "North American University",
  degree: "B.S. Computer Science, Software Development",
  period: "Sep 2023 — Dec 2026",
  gpa: "3.58",
};
