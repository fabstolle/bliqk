# ⚡ BLIQK — See what needs action now.

AI-powered email triage for growing businesses. BLIQK classifies incoming emails by urgency and intent, and shows you a priority inbox with recommended actions.

**Rule classifier runs first (free). Claude AI only when needed.**

---

## 🚀 Deploy to Vercel in 5 minutes

1. Fork or upload this repo to GitHub
2. Go to vercel.com → Import Project → select this repo
3. Add environment variables (see below)
4. Click Deploy

### Required Environment Variables

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Your Neon postgres connection string |
| `DIRECT_URL` | Same as DATABASE_URL |
| `SESSION_SECRET` | Any random 32+ character string |
| `TOKEN_ENCRYPTION_KEY` | Another random 32+ character string |
| `APP_URL` | Your Vercel URL (e.g. https://bliqk.vercel.app) |
| `AI_PROVIDER` | `anthropic` or `none` |
| `ANTHROPIC_API_KEY` | Your key from console.anthropic.com |
| `AI_MODEL` | `claude-sonnet-4-20250514` |
| `AI_FALLBACK_MODEL` | `claude-haiku-4-5-20251001` |
| `AI_CONFIDENCE_THRESHOLD` | `70` |
| `ENABLE_MOCK_INGESTION` | `true` |
| `NODE_ENV` | `production` |

### Demo Login
- Email: `founder@bliqk.ai`
- Password: `demo1234`

---

## 🗄️ Database Setup (Neon)

1. Go to [neon.tech](https://neon.tech) → Create free account
2. Create project named `bliqk`
3. Copy the Connection string
4. Add to Vercel as `DATABASE_URL` and `DIRECT_URL`

---

## 🤖 How AI works

- **Stage 1 (free):** Rule-based classifier runs on every message instantly
- **Stage 2 (Claude):** Only runs when rule confidence < 70%, or user clicks "Re-analyze"
- **Caching:** Same message never analyzed twice
- **Cost:** ~$0.002 per AI classification

---

## 📁 Structure

```
bliqk/
├── app/
│   ├── api/          Backend routes
│   ├── app/          Dashboard pages
│   └── login/        Login page
├── prisma/           Database schema
├── package.json
└── .env.example
```

---

Built with Next.js 14, TypeScript, Prisma, and Anthropic Claude.
