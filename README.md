# bek.sam: portfolio

Personal site of Bekbolsun Samaganov. Next.js 16 + Tailwind 4, statically exported.

## Edit content
Everything lives in `src/data/content.ts`: experience, projects, skills and honors.
The numbers come from the verified Story Bank in Notion. Keep simulated, projected
and undeployed work labeled as such.

## Résumé
Drop `Bekbolsun_Samaganov_Resume.pdf` into `public/`. The Résumé button and the ⌘K entry
only appear once the file exists.

## Run / deploy
```bash
npm run dev      # http://localhost:3000
npm run build    # static site in ./out
```
To deploy, import the repo into Vercel, or upload `out/` to any static host (Netlify, Cloudflare Pages, GitHub Pages).

## Features
- Sticky identity rail with a scroll-spy nav, and a cursor spotlight
- Signature "agent run replay" of IntentLock's enforcement flow (`src/components/AgentTrace.tsx`)
- ⌘K command palette, copy-to-clipboard email, light and dark themes
- Expandable case studies (problem, build, honest caveats); respects `prefers-reduced-motion`
