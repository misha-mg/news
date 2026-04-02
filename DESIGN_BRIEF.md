# Design Brief — Dev News

## What This App Does

A daily IT & AI news aggregator. It fetches articles from RSS feeds, summarizes them with an LLM, and presents a curated daily briefing. Single-page application built with React + Tailwind CSS, data from Supabase.

---

## Page Structure

The current structure is a starting point, not a constraint. **You are free to rearrange, restructure, and reimagine the layout** as you see fit — follow modern design conventions and common sense. The only requirement is that all data listed below is displayed somewhere on the page.

### Content elements to include:

- **App name & branding** — "Dev News", subtitle "Daily IT & AI briefing"
- **Last updated** timestamp
- **Daily Digest** — the hero/featured section:
  - Date
  - 5 top headlines (numbered or otherwise)
  - Narrative summary paragraph
- **Category filters** — allow the user to filter by: All, AI Release, Engineering, Tools, Industry
- **Article feed** — list/grid of articles, each showing:
  - Title (clickable link to source)
  - Category badge
  - Summary (2-3 sentences)
  - Source name + relative time ("3 hours ago")
- **Loading skeletons** for both digest and articles
- **Empty state** ("No articles found") and **error state**

### Layout guidance:

- Feel free to change the grid, card layout, section order, or overall composition
- The digest should feel like the centerpiece — prominent but not overwhelming
- Articles can be cards, rows, a list — whatever works best for scanability
- Consider how the filter bar integrates with the feed (inline, sticky, sidebar on desktop — your call)
- Mobile-first, responsive

---

## Data Models

**Article**
- `title` — headline
- `url` — link to the original article
- `source` — e.g. "OpenAI Blog", "Hacker News Top"
- `category` — one of: `ai-release`, `engineering`, `tools`, `industry`
- `published_at` — when the article was published
- `summary` — optional LLM-generated summary

**Digest**
- `date` — YYYY-MM-DD
- `top_items` — array of 5 headline strings
- `summary` — narrative paragraph

---

## Tech Stack

- React 19 + TypeScript
- Tailwind CSS v4
- Vite
- Supabase (database + client)
- Deployed on Vercel

---

## Design Task

Redesign the UI/UX of this application. The current design is functional but generic. Create a polished, distinctive visual identity.

### Color Palette

| Role       | Color                | Notes                                      |
|------------|----------------------|--------------------------------------------|
| Primary    | **Milk / cream**     | Warm off-white backgrounds (#FFF8F0-ish)   |
| Secondary  | **Matcha green**     | Soft sage/matcha tones for cards, accents   |
| Accent     | **Burgundy / wine**  | Use sparingly — links, active states, badges |
| Text       | Dark warm gray       | Not pure black, keep it soft                |
| Muted      | Light warm gray      | Secondary text, borders, dividers           |

The burgundy accent should appear in small doses — active filter button, category badge border, hover states. Not as a dominant color.

### Visual Style

- **Soft and gentle.** The UI should feel calm, light, easy on the eyes. No harsh contrasts, no heavy shadows.
- **Modern and clean.** Generous whitespace, rounded corners, subtle borders. Think: premium newsletter or a well-designed reading app.
- **Smooth transitions.** Hover effects, filter switches, and loading states should animate gracefully (ease-out, 200-300ms).
- **Typography matters.** Use a refined font pairing. Headlines should feel editorial; body text should be highly readable. Consider Inter, DM Sans, or similar.
- **Cards should breathe.** Enough padding, line height, and spacing so nothing feels cramped.
- **Digest block is the hero.** It should stand out as the featured section — slightly different background, maybe a subtle matcha-tinted container.
- **Filter bar should feel tactile.** Pill buttons with smooth color transitions on click/hover.
- **Category badges** — subtle, muted background tints (not loud saturated colors). Should complement the matcha + cream palette.

### What NOT to Do

- **No images whatsoever.** No thumbnails, no illustrations, no decorative images, no AI-generated artwork. This is a text-only interface — all visual interest must come from typography, color, spacing, and layout.
- No dark mode (for now)
- No complex animations or parallax
- No overly saturated or neon colors
