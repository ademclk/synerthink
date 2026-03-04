# Liquid Glass (UI Decisions)

This repo currently encodes “liquid glass” mostly via Tailwind utility classes in `src/`.

## Goals

- Progressive blur (stronger blur on higher “layers”)
- Rounded rectangles (no pill-shaped containers/buttons by default)
- Floating glass surfaces (subtle elevation + hover lift)
- Subtle, Apple-like motion (gentle easing; respects reduced motion)
- Primary color used sparingly (reserve for key CTA + small accents)

## Tokens / Utilities

Defined in `src/index.css`:

- `glass`: base glass treatment (border highlight + saturation + soft shadow)
- `glass-1` / `glass-2` / `glass-3`: blur strength (low/medium/high)
- `glass-4`: extra-strong blur (navbar / top chrome)
- `glass-float`: hover lift + easing; disabled under `prefers-reduced-motion`
- `aurora` / `aurora__item`: blurred hero-background aurora blobs (use behind content, not on text)

## Usage

- Base cards: `bg-foreground/5 glass glass-1 glass-float rounded-[…]`
- Hero background: `AuroraHeroBackground` (layered blur; keep it subtle in light mode)
- Hero surfaces: `bg-foreground/10 glass glass-2 …`
- Fullscreen overlays/modals: `bg-background/70 glass glass-3 …`

## Radius guidance

- Use `rounded-xl` / `rounded-2xl` / `rounded-[1.75rem]` for surfaces.
- Avoid `rounded-full` across the UI to prevent pill/circle drift.

## Primary color guidance

- Use `bg-primary` only for the main CTA.
- Prefer `text-primary`, `border-primary/…`, `bg-primary/10` for subtle accents.
- Avoid large-area primary glows (e.g. `shadow-primary/…`) on glass.
