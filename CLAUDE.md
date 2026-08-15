# davidingber.github.io

Personal site and marketing funnels for David Ingber (דוד אינגבר), an emotional/trauma therapist and coach in Israel. Hebrew content, RTL. Plain static HTML files at the repo root, served directly by GitHub Pages (no build step, no CNAME — served at `https://davidingber.github.io/`).

## Business strategy — read this before any funnel/panel/course/landing-page work

`strategy/business-strategy.md` is the source-of-truth business strategy (audience, the 3 marketing panels, the 8-week flagship group program curriculum, pricing, objections, KPIs), distilled from an external strategist's Google Doc. **Read it before building or editing anything under `panel/`, or before discussing David's funnels, courses, pricing, or the group program.** Don't invent funnel structure or product names (e.g. there is no "90 השניות הראשונות" — that name doesn't exist in the real strategy) — follow that file, and re-read the source Google Doc (fileId noted at the top of the strategy file) if it's been a while, since David edits it directly.

## Site structure

- `index.html` — homepage (bundled/exported artifact format, Rubik font, sage/terra/gold palette).
- `emotional.html`, `swish.html`, `התניהלטריגר.html`, `תנועותעיניים.html`, `הרחקתהטראומה.html` — standalone interactive guided-exercise tools (different visual system: Assistant/Heebo, purple accents).
- `sadna.html` — workshop landing page.
- `budapest-trip.html`, `partner-voice.html` — unrelated personal/side-project pages, ignore for David's practice work.
- `panel/` — the panic-attack/anxiety lead-generation funnel (Panel 2 in the strategy doc): landing page, thank-you page, the interactive lead magnet quiz, the free guide page, and the email nurture sequence. See `panel/README.md` for the current build state and setup steps (Google Sheet lead capture, video embed).

## Conventions

- No shared header/footer/nav component exists; each page is self-contained.
- Contact CTA site-wide: WhatsApp deep link `https://wa.me/972559930227`.
- New funnel/campaign pages (landing pages, ad-driven pages) intentionally have no site navigation — that's a deliberate conversion-rate choice, not an oversight.
