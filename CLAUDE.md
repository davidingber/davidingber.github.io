# davidingber.github.io

Personal site and marketing funnels for David Ingber (דוד אינגבר), an emotional/trauma therapist and coach in Israel. Hebrew content, RTL. Plain static HTML files at the repo root, served directly by GitHub Pages (no build step, no CNAME — served at `https://davidingber.github.io/`).

## Business strategy — read this before any funnel/panel/course/landing-page work

`strategy/business-strategy.md` is the source-of-truth business strategy (audience, the 3 marketing panels, the 8-week flagship group program curriculum, pricing, objections, KPIs), distilled from an external strategist's Google Doc. **Read it before building or editing anything under `panel/` or `anxiety-wave/`, or before discussing David's funnels, courses, pricing, or the group program.** Don't invent funnel structure or product names — follow that file, and re-read the source Google Doc (fileId noted at the top of the strategy file) if it's been a while, since David edits it directly.

**`anxiety-wave/` runs under a separate, later, dedicated Google Doc** (`fileId: 1EJDQaiuKudO0nv7x7swkwFGg5iYviS52sCkAHDB18Y0`, linked from `strategy/business-strategy.md`'s "עדכון מאוחר יותר" section) that supersedes the older names for that funnel specifically: magnet "כשהגל עולה", group program "חוזרים לסמוך על עצמנו" everywhere, no links to "the app", every program CTA goes to the program's own landing page. That doc also holds the canonical ad/landing/email copy for `anxiety-wave/` — read it before rewriting any copy there instead of inventing new wording. `panel/` (older build, different names — see below) is unaffected and still governed by the strategy doc referenced above; don't mix the two.

## Site structure

- `index.html` — homepage (bundled/exported artifact format, Rubik font, sage/terra/gold palette).
- `emotional.html`, `swish.html`, `התניהלטריגר.html`, `תנועותעיניים.html`, `הרחקתהטראומה.html` — standalone interactive guided-exercise tools (different visual system: Assistant/Heebo, purple accents).
- `sadna.html` — workshop landing page.
- `budapest-trip.html`, `partner-voice.html` — unrelated personal/side-project pages, ignore for David's practice work.
- `panel/` — an earlier build of the panic-attack/anxiety lead-generation funnel (Panel 2 in the strategy doc), under David's older working names ("מלכודת ההרגעה" magnet, "מסע 8 הזהויות" group program, "90 השניות הראשונות" front offer). See `panel/README.md` for its build state. David has since renamed the magnet and the group program (see `anxiety-wave/` below) — treat `panel/` as superseded/legacy for that naming; don't mix its "90 השניות הראשונות" content into `anxiety-wave/` work, and don't rename files in `panel/` itself unless David asks.
- `anxiety-wave/` — the current build of that same funnel under David's current names: magnet **"כשהגל עולה"** (`index.html` landing page → `thank-you.html` → `guide.html`, the 5-step interactive guide) and the 8-week group program **"חוזרים לסמוך על עצמנו"** (`program.html`, linked from the guide's final CTA and from the email sequence). `ad.html` is the art-directed ad creative (no stock photos of David — only his own supplied photo). `emails.md` is the 7-email nurture sequence; emails 6–7 CTA to `program.html`, not to the app. `backend.html` is a redirect alias to `program.html`. Lead capture is `localStorage`-only for now (no Sheet/Apps Script wired up yet, unlike `panel/`).
- `check/` — the "בדיקת 5 הדקות" (5-minute check) self-assessment tool; its final screen offers a 1:1 path (links to `index.html`) and a group-program waitlist path (Google Form) for "חוזרים לסמוך על עצמנו".
- `privacy/`, `accessibility/` — site-wide privacy policy and accessibility statement pages. Pages that collect leads or serve as funnel entry points should link both in their footer and include the accessibility widget (floating `♿` button bottom-left — text size, contrast, underline links, reduce motion; see `check/index.html` or `anxiety-wave/index.html` for the reference markup/CSS/JS to copy).

## Conventions

- No shared header/footer/nav component exists; each page is self-contained.
- Contact CTA site-wide: WhatsApp deep link `https://wa.me/972559930227`.
- New funnel/campaign pages (landing pages, ad-driven pages) intentionally have no site navigation — that's a deliberate conversion-rate choice, not an oversight.
