# Vaibhav Dwivedi — Portfolio

Personal portfolio for Vaibhav Dwivedi — Full-Stack Developer & AI/ML Engineer. Built with Next.js, Tailwind, GSAP/Motion, and an interactive Spline robot on the hero.

## Features

- Interactive 3D Spline robot on the landing page
- Projects, skills, experience, contact form (Resend)
- Optional realtime presence/chat when `NEXT_PUBLIC_WS_URL` is set
- Light & dark theme, smooth scroll, particle background

## Tech stack

| Layer | Technologies |
|---|---|
| Framework | Next.js 16, React 19, TypeScript |
| Styling | Tailwind CSS, shadcn/ui |
| Animation | GSAP, Motion |
| 3D | Spline Runtime |
| Email | Resend |

## Getting started

**Prerequisites:** Node.js 20+

```bash
git clone https://github.com/Git-Vaibhav323/My-Portfolio.git
cd My-Portfolio
npm install --legacy-peer-deps
cp .env.example .env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | Yes (contact form) | API key from [Resend](https://resend.com) |
| `RESEND_FROM` | No | Verified sender address |
| `CONTACT_TO_EMAIL` | No | Inbox for contact messages |
| `NEXT_PUBLIC_WS_URL` | No | WebSocket URL for realtime features |
| `UMAMI_SITE_ID` / `UMAMI_DOMAIN` | No | Umami analytics |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics |

See `.env.example` for the full list.

## Customize

Personal info lives in [`src/data/config.ts`](src/data/config.ts). Projects: [`src/data/projects.tsx`](src/data/projects.tsx). Skills & experience: [`src/data/constants.ts`](src/data/constants.ts).

## Deploy on Netlify

1. Push this repo to GitHub
2. In [Netlify](https://app.netlify.com): **Add new site → Import an existing project**
3. Build settings are in `netlify.toml` (`npm run build`, Node 20, `@netlify/plugin-nextjs`)
4. Add env vars under **Site configuration → Environment variables** (at least `RESEND_API_KEY`)
5. Deploy — Netlify will install the Next.js runtime plugin automatically when `netlify.toml` is present

Local production check:

```bash
npm run build
npm start
```

## License

MIT — see [LICENSE](LICENSE).

## Credits

Thanks to [Naresh Khatri](https://github.com/Naresh-Khatri) for the original 3D portfolio template this project builds on.
