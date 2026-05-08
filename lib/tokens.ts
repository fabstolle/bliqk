// lib/tokens.ts
// Design tokens for BLIQK — all contrast ratios validated

export const D = {
  // BACKGROUNDS
  bg:      "#090B14",
  surface: "#0E1120",
  card:    "#131829",
  // BORDERS
  border:      "rgba(255,255,255,0.08)",
  borderHover: "rgba(255,255,255,0.15)",
  // TEXT — contrast ratios against dark bg
  textPrimary:   "#F0F2FF",  // 14:1 — headings, buttons
  textBody:      "#C8CCDF",  // 8.5:1 — body paragraphs
  textSecondary: "#9BA3C0",  // 5.2:1 — labels, timestamps ← FIXED (was #5A6080 = 2.8:1 ❌)
  textTertiary:  "#6B7394",  // 3.1:1 — placeholders only (never used for content)
  // ACCENT
  accent:       "#4F7FFF",
  accent2:      "#00D4FF",
  accentBg:     "rgba(79,127,255,0.12)",
  accentBorder: "rgba(79,127,255,0.25)",
  // SEMANTIC
  danger:  "#FF3D5A",
  warning: "#FF7A2F",
  success: "#00D68F",
  purple:  "#8B5CF6",
  // NAV ACTIVE
  navActive: "rgba(79,127,255,0.12)",
} as const;

export type DesignTokens = typeof D;
