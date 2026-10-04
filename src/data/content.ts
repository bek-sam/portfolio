// Single source of truth for the portfolio.
// Facts come from the verified "Story Bank" in Notion and the LinkedIn profile (Oct 2026).
// Keep claims honest: if something is simulated, projected, a prototype, or team work, say so.

export const profile = {
  name: "Bekbolsun Samaganov",
  short: "Bek",
  role: "Software Engineer",
  focus: "AI agents · full-stack · systems",
  location: "Houston, TX",
  email: "bekbol.samaganov@gmail.com",
  github: "https://github.com/bek-sam",
  linkedin: "https://www.linkedin.com/in/bek-sam",
  linkedinPosts: "https://www.linkedin.com/in/bek-sam/recent-activity/all/",
  resume: "/Bekbolsun_Samaganov_Resume.pdf",
  status: "Open to new-grad SWE / AI engineer roles · 2027",
  graduation: "Dec 2026",
  tagline:
    "I build software that people can trust, including the guardrails around AI agents. I've shipped native apps, multi-tenant SaaS, and an agent authorization gateway, and my work is tested and documented.",
  about: [
    "I'm a CS senior at North American University in Houston (GPA 3.58, major GPA 3.70, graduating Dec 2026). I started my career in Bishkek, Kyrgyzstan in 2022, building travel-booking interfaces and teaching React at a coding school, then moved into backend, data and AI systems.",
    "Right now I'm the only software engineer at Keystone Tile, a stone and tile distributor with five locations. I sit with the people who use my tools, learn how they work, and build what they need. So far that's a native iOS/macOS app, a website rebuild, data pipelines and field-sales software.",
    "Outside work I build with AI agents in two ways. I engineer guardrails for them: policy engines, passkey approvals, and audit trails. I also use them as a team: I designed a 20-role Claude Code agent team with its own operating system of ownership rules, review gates, and evals. I write about it on LinkedIn, and I'm careful to say exactly what's real, what's simulated and what's projected.",
  ],
};

export type Stat = { value: string; label: string };

export const heroStats: Stat[] = [
  { value: "6", label: "engineering & leadership roles" },
  { value: "14", label: "projects shipped or prototyped" },
  { value: "2,800+", label: "automated tests across projects" },
  { value: "10+", label: "certifications" },
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
  kind?: "work" | "leadership";
};

export const experience: Experience[] = [
  {
    company: "Keystone Tile",
    role: "Software Engineer Intern",
    period: "Jun 2026 — Present",
    location: "Houston, TX",
    current: true,
    kind: "work",
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
    company: "KurultAi R&D Club",
    role: "Co-founder & President",
    period: "Aug 2024 — Present",
    location: "Houston, TX · Hybrid",
    current: true,
    kind: "leadership",
    summary: "A student R&D club I co-founded to help students build real software and land engineering roles.",
    bullets: [
      "Grew the club to 30+ members through workshops, hackathons and mentorship in coding, problem solving and software development.",
      "Secured partnerships with local tech companies and host career sessions with students who landed internships at companies like Visa, Shopify and Capital One.",
      "A club team won 1st place in the Polymarket track at QuackHacks 2025 (Oregon). The club also produced Hukm AI, a legal chatbot.",
    ],
    stack: ["Leadership", "Mentorship", "Hackathons", "Partnerships"],
  },
  {
    company: "ACM @ North American University",
    role: "Treasurer & Mentor",
    period: "Jan 2025 — May 2026",
    location: "Stafford, TX",
    kind: "leadership",
    summary: "Student chapter of the Association for Computing Machinery.",
    bullets: [
      "Built and deployed chapter website features with HTML5, APIs and automation.",
      "Mentored 10+ students and led learning sessions for project-based learning. I founded and captained NAU's ICPC team, the NAU Stallions.",
    ],
    stack: ["HTML5", "APIs", "Mentorship"],
  },
  {
    company: "Voyager Group",
    role: "Front-End Developer Intern",
    period: "Mar 2022 — Jan 2023",
    location: "Bishkek, KG",
    kind: "work",
    summary: "Tour-booking platform serving destinations like the UAE, the Maldives and Thailand.",
    bullets: [
      "Built responsive booking interfaces with React and Bootstrap, and integrated REST APIs across search and reservation flows.",
      "Built reusable UI components for mobile and desktop, and shipped in two-week Agile sprints with Git-based code review.",
    ],
    stack: ["React", "JavaScript", "REST", "Bootstrap"],
  },
  {
    company: "MitApp",
    role: "Software Developer Intern",
    period: "Aug 2022 — Nov 2022",
    location: "Bishkek, KG",
    kind: "work",
    summary: "Mobile & web product studio.",
    bullets: [
      "Delivered React/Redux interfaces from Figma designs and integrated REST APIs.",
      "Built Redux state management and a reusable component library, with unit tests and code reviews.",
    ],
    stack: ["React", "Redux", "Next.js", "Figma"],
  },
  {
    company: "ZERO ONE",
    role: "Teaching Assistant",
    period: "Mar 2022 — Nov 2022",
    location: "Bishkek, KG",
    kind: "leadership",
    summary: "Coding school. I was first a student in its front-end course (Feb–Aug 2022), then joined as a TA.",
    bullets: [
      "Guided aspiring developers through HTML, CSS, JavaScript and React with hands-on, real-world projects.",
    ],
    stack: ["HTML", "CSS", "JavaScript", "React", "Teaching"],
  },
];

export type Project = {
  slug: string;
  name: string;
  kicker: string;
  period: string;
  role: string;
  oneLiner: string;
  problem?: string;
  built?: string[];
  metrics?: Stat[];
  stack: string[];
  honesty?: string;
  links: { label: string; href: string }[];
  accent: "lime" | "violet" | "amber" | "sky";
  featured?: boolean;
  category?: "AI / ML" | "Full-stack" | "Web" | "Learning";
};

export const projects: Project[] = [
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
      "A Claude business-analyst agent with read-only tools, a 10-round loop cap, spend checks, a tool-output-is-data boundary, and an eval harness",
    ],
    metrics: [
      { value: "8", label: "repos" },
      { value: "258", label: "typed API procedures" },
      { value: "~1.8k", label: "tests" },
      { value: "133", label: "eval cases" },
    ],
    stack: ["TypeScript", "Node 24", "Hono", "oRPC", "PostgreSQL 17", "BullMQ", "React 19", "Python", "libvips", "Claude API", "AWS (SST)"],
    honesty: "Agents wrote most of the code under my architecture, gates and review. It isn't deployed yet and has no pilot customers yet.",
    links: [
      { label: "Docs", href: "https://github.com/bek-sam/invai-docs" },
      { label: "Backend", href: "https://github.com/bek-sam/invai-backend" },
      { label: "Web", href: "https://github.com/bek-sam/invai-web" },
      { label: "Tablet app", href: "https://github.com/bek-sam/invai-floor" },
      { label: "Imaging", href: "https://github.com/bek-sam/invai-imaging" },
    ],
    accent: "violet",
    featured: true,
    category: "AI / ML",
  },
  {
    slug: "intentlock",
    name: "IntentLock",
    kicker: "Rice Hackathon 2026 · solo · 2 days",
    period: "Sep 2026",
    role: "Solo developer",
    oneLiner: "A verified-human authorization gateway for AI agents, built for Persona's \"Prove you're human\" challenge.",
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
    category: "AI / ML",
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
    category: "AI / ML",
  },
  {
    slug: "neurotech",
    name: "NeuroTech: Mind Over Matter",
    kicker: "Rice Datathon 2026 · team of 4",
    period: "Jan 2026",
    role: "ML engineer",
    oneLiner:
      "An EEGNet-style CNN in PyTorch that decodes 4-class motor EEG, reaching ~51.5% validation accuracy on 17 unseen subjects (chance is 25%). Built with 8–30 Hz band-pass filtering and 22-channel motor-strip isolation.",
    stack: ["Python", "PyTorch", "MNE", "EEGNet"],
    honesty: "The team's final submission used an ensemble; the EEGNet model was my part.",
    links: [
      { label: "Live demo", href: "https://mind-over-matter-bci-eeg-explorer-912984452807.us-west1.run.app/" },
      { label: "GitHub", href: "https://github.com/napoliion/datathon-eeg-classifier" },
      { label: "Devpost", href: "https://devpost.com/software/mind-over-matter-4suywj" },
    ],
    accent: "sky",
    category: "AI / ML",
  },
  {
    slug: "neuroshorts",
    name: "NeuroShorts",
    kicker: "Senior project · solo",
    period: "Spring 2026",
    role: "Solo developer",
    oneLiner:
      "AI micro-learning shorts: Gemini plans a curriculum, then generates images and Veo video clips with a quiz after each lesson.",
    stack: ["React 19", "TypeScript", "Gemini", "Veo", "Firebase"],
    honesty: "Prototyped largely in Google AI Studio.",
    links: [{ label: "GitHub", href: "https://github.com/bek-sam/neuroshorts" }],
    accent: "violet",
    category: "AI / ML",
  },
  {
    slug: "akira",
    name: "Akira AI",
    kicker: "NAU · team of 2",
    period: "Oct — Dec 2025",
    role: "Co-developer",
    oneLiner:
      "Generates complete, responsive websites from a natural-language prompt, with live preview. I built the first generation backend on OpenAI (GPT-4o-mini with strict JSON output, gpt-image-1) and the chat and preview components.",
    stack: ["Next.js 15", "React 19", "TypeScript", "Tailwind", "OpenAI", "Vercel"],
    honesty: "The team later moved generation to Gemini; that switch was my teammate's work.",
    links: [
      { label: "Live", href: "https://makeakira.vercel.app" },
      { label: "GitHub", href: "https://github.com/zkalykov/akira" },
    ],
    accent: "amber",
    category: "AI / ML",
  },
  {
    slug: "hukm-ai",
    name: "Hukm AI",
    kicker: "KurultAi R&D Club",
    period: "Sep 2024 — Present",
    role: "Club project",
    oneLiner: "A legal AI chatbot built with TensorFlow and NLP that answers users' legal questions, with continuous-learning improvements to context handling.",
    stack: ["Python", "TensorFlow", "NLP"],
    links: [],
    accent: "lime",
    category: "AI / ML",
  },
  {
    slug: "study-path",
    name: "Study Path",
    kicker: "Personal · solo",
    period: "Oct — Nov 2025",
    role: "Backend developer",
    oneLiner:
      "The REST backend for a learning & practice platform: 6 Prisma models, 5 endpoints, NextAuth sessions and zod validation. A topic counts as mastered after 3 correct answers in a row.",
    stack: ["Next.js 16", "Prisma", "SQLite", "NextAuth", "Zod"],
    honesty: "Backend-only prototype; no UI yet.",
    links: [{ label: "GitHub", href: "https://github.com/bek-sam/jrt" }],
    accent: "sky",
    category: "Full-stack",
  },
  {
    slug: "ctl",
    name: "CTL",
    kicker: "Personal · solo",
    period: "Dec 2025",
    role: "Full-stack developer",
    oneLiner: "A community and habit-tracking prototype with a landing page, navigation and a Supabase-backed data layer.",
    stack: ["Next.js 16", "Supabase", "shadcn/ui", "Tailwind"],
    honesty: "Early prototype: auth is UI-only and the tables use sample data.",
    links: [{ label: "GitHub", href: "https://github.com/bek-sam/ctl" }],
    accent: "lime",
    category: "Full-stack",
  },
  {
    slug: "facility-reservation",
    name: "University Facility Reservation",
    kicker: "Ala-Too International University",
    period: "Feb — Jul 2023",
    role: "Full-stack developer",
    oneLiner: "A real-time booking system for university facilities, with WebSocket-based live availability and email notifications.",
    stack: ["React", "Django", "Python", "WebSockets"],
    links: [],
    accent: "violet",
    category: "Full-stack",
  },
  {
    slug: "intersport",
    name: "Inter-Sport",
    kicker: "E-commerce",
    period: "Sep 2023 — Jun 2024",
    role: "Front-end developer",
    oneLiner: "A sportswear e-commerce storefront with product catalog, cart and responsive layouts.",
    stack: ["React", "JavaScript", "CSS"],
    links: [{ label: "Live", href: "https://inter-sport.vercel.app/" }],
    accent: "amber",
    category: "Web",
  },
  {
    slug: "cure-tb",
    name: "USAID Cure TB",
    kicker: "Freelance · Voyager era",
    period: "2022",
    role: "Front-end developer",
    oneLiner: "Front-end work on a public-health information site for a USAID-funded tuberculosis program in Kyrgyzstan.",
    stack: ["HTML", "CSS", "JavaScript"],
    links: [{ label: "Live", href: "https://curetb.tbcenter.kg/ru" }],
    accent: "sky",
    category: "Web",
  },
  {
    slug: "child-protection",
    name: "Child Protection Center",
    kicker: "NGO website",
    period: "2022",
    role: "Front-end developer",
    oneLiner: "A 12+ page website for a children's NGO in three languages (Russian, English and Kyrgyz).",
    stack: ["HTML", "CSS", "JavaScript", "i18n"],
    links: [{ label: "Demo", href: "https://childrenn.vercel.app/" }],
    accent: "lime",
    category: "Web",
  },
  {
    slug: "cp-roadmap",
    name: "Competitive Programming Roadmap",
    kicker: "Open study guide",
    period: "2025 — 2026",
    role: "Author",
    oneLiner: "A 26-topic ICPC preparation roadmap I put together while captaining NAU's team, from basics to graphs and DP.",
    stack: ["Algorithms", "Data structures", "C++"],
    links: [{ label: "GitHub", href: "https://github.com/bek-sam/competitive_programming_recourses" }],
    accent: "violet",
    category: "Learning",
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["TypeScript", "Python", "Swift", "Java", "C++", "SQL"] },
  { group: "AI / Agents", items: ["Claude API", "OpenAI", "Gemini", "Structured outputs", "Evals", "Agent guardrails", "PyTorch", "TensorFlow"] },
  { group: "Backend", items: ["Node.js", "Hono", "Django", "PostgreSQL", "Prisma", "Redis / BullMQ", "Supabase"] },
  { group: "Frontend & mobile", items: ["React 19", "Next.js", "Redux", "Tailwind", "SwiftUI", "PWA / offline"] },
  { group: "Cloud & infra", items: ["AWS", "Cloudflare Workers", "Vercel", "Docker", "Terraform / SST", "GitHub Actions"] },
  { group: "Security", items: ["WebAuthn", "Row-level security", "OAuth / MFA", "CSP", "Signed audit logs"] },
];

export type Credential = { title: string; issuer: string; year: string; href?: string };

export const certifications: Credential[] = [
  { title: "AI Agents Fundamentals", issuer: "Hugging Face", year: "2026" },
  { title: "Claude Code 101 (Claude Academy)", issuer: "Anthropic", year: "2026" },
  { title: "Certificate of Appreciation", issuer: "North American University", year: "2025" },
  { title: "ICPC Certificate of Achievement", issuer: "ICPC", year: "2025" },
  { title: "Front End Developer (React)", issuer: "HackerRank", year: "2025" },
  { title: "Programming in Python", issuer: "Coursera", year: "2025" },
  { title: "Version Control", issuer: "Meta · Coursera", year: "2025" },
  { title: "Amazon Bedrock: Getting Started with Generative AI", issuer: "AWS · Coursera", year: "2024" },
  { title: "Introduction to Front-End Development", issuer: "Meta · Coursera", year: "2024" },
  { title: "Introduction to Back-End Development", issuer: "Meta · Coursera", year: "2024" },
  { title: "AWS Certified Developer – Associate", issuer: "Amazon Web Services", year: "2024" },
];

export const honors: { title: string; detail: string; year: string }[] = [
  { title: "ICPC South Central Regional", detail: "2nd place at the University of Houston site, Honorable Mention overall (team captain)", year: "2025" },
  { title: "Kyrgyzstan Math Olympiad", detail: "Gold medal, twice", year: "2020–21" },
  { title: "QuackHacks 2025", detail: "1st place in the Polymarket track, won by a KurultAi club team", year: "2025" },
  { title: "Rice Hackathon", detail: "IntentLock, Persona challenge (solo)", year: "2026" },
  { title: "Rice Datathon", detail: "NeuroTech: Mind Over Matter (team of 4)", year: "2026" },
];

export const education = [
  {
    school: "North American University",
    degree: "B.S. Computer Science, Software Development",
    period: "Sep 2023 — Dec 2026",
    detail: "GPA 3.58 · Major GPA 3.70",
  },
  {
    school: "ZERO ONE Coding School",
    degree: "Front-End Development program",
    period: "Feb — Aug 2022",
    detail: "HTML, CSS, JavaScript, React",
  },
];
