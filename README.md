# Northforge Sales Command (CRM Sales Dashboard)

Premium, frontend-focused CRM sales dashboard for a fictitious B2B hardware company.

## What this project includes

- Editorial SaaS-style dashboard UI
- Light / dark theme toggle
- Collapsible sidebar
- KPI cards with trend visuals
- Revenue pulse chart tabs
- Revenue by Product ranking visualization
- Pipeline by Stage analysis
- Win Rate by Sector donut + detail panels
- Top 5 Sales Agents leaderboard
- Team Performance matrix
- Deal Size distribution

## Tech stack

- React (Create React App)
- TailwindCSS + custom CSS
- Recharts
- lucide-react icons
- Static hardcoded data (`/frontend/src/data/crmData.js`)

## Local development

### Frontend

```bash
cd frontend
yarn install
yarn start
```

Open `http://localhost:3000`.

---

## Built with Emergent + GPT-5.4

This repository was iteratively designed and implemented with **Emergent + GPT-5.4**, including:

- multi-pass UI redesigns
- component-level refinements from direct feedback
- layout stabilization and spacing regression fixes
- interaction polish (hover/active/readability)

### Representative prompts used

1. "The current UI is too cluttered… cards have too many stuffs… make edges sharper"
2. "Deal size distribution has wave animation — I need zoom animation"
3. "Revenue by product — change data visualization completely"
4. "Fix spaces below panels and align text in all cards"
5. "Use sans serif family everywhere"
6. "Move ‘Made with Emergent’ and remove floating overlap"

### Before / After snapshots (major UI iterations)

> Add exported screenshots from this run to `docs/showcase/` and update links below.

| Iteration | Before | After |
|---|---|---|
| Header + Revenue Pulse cleanup | `docs/showcase/before-hero.png` | `docs/showcase/after-hero.png` |
| Mid-dashboard spacing + card hierarchy | `docs/showcase/before-sections.png` | `docs/showcase/after-sections.png` |
| Revenue by Product visualization rewrite | `docs/showcase/before-product-chart.png` | `docs/showcase/after-product-chart.png` |

### Emergent chat artifacts

> Add one of the following to `docs/showcase/chat/`:

- screenshot(s) of key Emergent chat steps, or
- short timelapse clip (`.mp4`) of the build iterations

Suggested filenames:

- `docs/showcase/chat/emergent-chat-01.png`
- `docs/showcase/chat/emergent-chat-02.png`
- `docs/showcase/chat/emergent-build-timelapse.mp4`

---

## Attribution

**Built with Emergent + GPT-5.4**
