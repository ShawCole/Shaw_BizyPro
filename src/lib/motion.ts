// One motion system for the whole site. Every animation picks a duration from
// DUR and uses EASE — no springs, no bounces, transform/opacity only.

export const DUR = {
  fast: 0.15,
  base: 0.25,
  slow: 0.4,
} as const;

// Ease-out (quint-like): fast start, soft landing, no overshoot.
export const EASE = [0.22, 1, 0.36, 1] as const;
export const EASE_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";

// Delay between siblings in a staggered reveal — subtle, and capped so a long
// list never makes the last item wait.
export const STAGGER = 0.06;
export const staggerDelay = (i: number) => Math.min(i, 5) * STAGGER;

export const tween = (duration: number = DUR.slow, delay = 0) => ({
  duration,
  delay,
  ease: EASE,
});
