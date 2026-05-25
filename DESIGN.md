---
name: Roblox Tracker
description: Dark-native command center for monitoring hundreds of Roblox game accounts
colors:
  void-black: "#08090a"
  gunmetal-surface: "#191a1b"
  near-white: "#f7f8f8"
  silver-data: "#d0d6e0"
  ash-muted: "#8a8f98"
  ghost-meta: "#62666d"
  indigo-accent: "#5e6ad2"
  indigo-hover: "#828fff"
  indigo-active: "#4752c4"
  signal-green: "#27a644"
  signal-amber: "#eab308"
  signal-red: "#dc2626"
typography:
  display:
    fontFamily: "Inter Variable, Inter, SF Pro Display, -apple-system, sans-serif"
    fontSize: "32px"
    fontWeight: 700
    lineHeight: 1.0
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Inter Variable, Inter, SF Pro Display, -apple-system, sans-serif"
    fontSize: "24px"
    fontWeight: 600
    lineHeight: 1.0
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Inter Variable, Inter, SF Pro Display, -apple-system, sans-serif"
    fontSize: "18px"
    fontWeight: 600
    lineHeight: 1.2
  body:
    fontFamily: "Inter Variable, Inter, SF Pro Display, -apple-system, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Inter Variable, Inter, SF Pro Display, -apple-system, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.1em"
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.indigo-accent}"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
  button-primary-hover:
    backgroundColor: "{colors.indigo-hover}"
    textColor: "#ffffff"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ash-muted}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
  button-ghost-hover:
    backgroundColor: "rgba(255, 255, 255, 0.04)"
    textColor: "{colors.near-white}"
  input-default:
    backgroundColor: "transparent"
    textColor: "{colors.near-white}"
    rounded: "{rounded.md}"
    padding: "8px 12px"
  table-row:
    backgroundColor: "transparent"
    textColor: "{colors.silver-data}"
    padding: "14px 16px"
  table-row-hover:
    backgroundColor: "rgba(255, 255, 255, 0.05)"
  nav-item:
    backgroundColor: "transparent"
    textColor: "{colors.ash-muted}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
  nav-item-active:
    backgroundColor: "rgba(94, 106, 210, 0.1)"
    textColor: "{colors.indigo-accent}"
---

# Design System: Roblox Tracker

## 1. Overview

**Creative North Star: "The War Room"**

A dimly lit operations room where every pixel carries data and nothing is decorative. The interface IS the mission. Roblox Tracker monitors hundreds of game accounts simultaneously; the design exists to make that surveillance instant, effortless, and unambiguous.

The system is dark-native by necessity, not trend. The operator works long sessions scanning dense numeric data. Dark surfaces reduce eye strain; high-contrast text makes numbers pop. The aesthetic draws from Linear's surgical precision and Raycast's speed-first philosophy, but the density is higher: this is a single-user command center, not a team collaboration tool.

Every element is surgically minimal. Borders are barely there. Buttons are ghosts until needed. The chrome dissolves so only data remains. If a pixel doesn't serve comprehension, it doesn't exist.

**Key Characteristics:**
- Dark-native with luminance-stepped neutrals, never true black or white
- Single accent (indigo-violet) reserved for interactive elements only
- Uppercase micro-labels for scannable section headers
- Dense grid layouts optimized for simultaneous multi-stat monitoring
- Framer Motion for subtle state transitions, no choreography

## 2. Colors: The Blackout Palette

A restrained palette: tinted neutrals plus one accent held to strict reservation. Semantic colors (green/amber/red) serve status signals, not decoration.

### Primary
- **Indigo Accent** (#5e6ad2): the single chromatic voice. CTAs, active states, focus rings, selected rows. Its rarity on screen is the point.
- **Indigo Hover** (#828fff): lightened variant for hover feedback.
- **Indigo Active** (#4752c4): darkened variant for pressed states.

### Neutral
- **Void Black** (#08090a): page canvas. Not pure black; a faint warm tint prevents the clinical feel of #000.
- **Gunmetal Surface** (#191a1b): cards, sidebar, elevated containers. One luminance step above canvas.
- **Near White** (#f7f8f8): primary text. Not pure white; the slight warmth matches the tinted blacks.
- **Silver Data** (#d0d6e0): secondary text, body copy, numeric data columns.
- **Ash Muted** (#8a8f98): tertiary text, inactive nav items, timestamps.
- **Ghost Meta** (#62666d): lowest-priority text, disabled items, decorative labels.

### Semantic
- **Signal Green** (#27a644): online status, success states.
- **Signal Amber** (#eab308): warnings, pending states.
- **Signal Red** (#dc2626): errors, destructive actions, offline status.

### Named Rules
**The Reservation Rule.** Indigo appears on less than 10% of any screen. Active nav indicators, selected checkboxes, focus rings, primary buttons. That's it. If you're reaching for the accent, ask whether a neutral or semantic color does the job.

**The Tinted Neutral Rule.** No #000 or #fff anywhere. Every neutral carries a faint warm tint. This keeps the dark palette cohesive and prevents the interface from feeling sterile.

## 3. Typography

**Display Font:** Inter Variable (with Inter, SF Pro Display, -apple-system fallback)
**Body Font:** Inter Variable (same stack)
**Mono Font:** Geist Mono (for code and tabular data)

**Character:** A single typeface family used across every hierarchy level. Distinction comes from weight and scale contrast, not font pairing. Inter's wide glyph set and variable axes handle everything from 10px micro-labels to 32px display numbers.

### Hierarchy
- **Display** (700, 32px, 1.0 leading, -0.02em tracking): page titles and hero metrics. Rare.
- **Headline** (600, 24px, 1.0 leading, -0.01em tracking): section headers.
- **Title** (600, 18px, 1.2 leading): card titles, dialog headers.
- **Body** (400, 14px, 1.5 leading): table cells, descriptions. Max line length 75ch.
- **Label** (600, 10-11px, 1.2 leading, 0.1em tracking, UPPERCASE): column headers, nav section labels, stat card labels. The workhorse of the system.

### Named Rules
**The Label Doctrine.** Section headers and data labels are always uppercase, 10-11px, semi-bold, with wide letter-spacing (0.1-0.15em). This creates a visual distinction from data values without needing color or size.

## 4. Elevation

The system is flat by default. Depth is conveyed through luminance stepping (canvas → surface → elevated surface), not shadows. Shadows exist but are structural responses to state, not ambient decoration.

### Shadow Vocabulary
- **Flat** (none): resting state for all surfaces.
- **Ring** (0 0 0 1px var(--border)): subtle containment border. Semi-transparent white at 8% opacity.
- **Raised** (rgba(0,0,0,0.4) 0 2px 4px, 0 0 0 1px rgba(255,255,255,0.05)): dropdowns, popovers, floating elements only.
- **Focus Ring** (0 0 0 2px accent/70%, 0 4px 12px rgba(0,0,0,0.1)): keyboard focus indicator. Uses accent color with transparency.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. The raised shadow appears only on floating elements (dropdowns, popovers, dialogs). Cards and containers use border-only containment, never ambient shadows.

## 5. Components

Surgically minimal. Borders barely visible. Buttons are ghosts until needed. The chrome dissolves so only data remains.

### Buttons
- **Shape:** gently rounded (6px radius).
- **Primary:** indigo accent background, white text, 8px 16px padding. Used sparingly; most actions are ghost buttons.
- **Hover / Focus:** background lightens to indigo-hover; focus ring appears via box-shadow.
- **Ghost:** transparent background, muted text. On hover: faint white overlay (4% opacity), text brightens to near-white. The default button style.

### Data Table
- **Corner Style:** rounded container (12px radius) with border containment.
- **Background:** surface/50 with subtle backdrop blur.
- **Header:** uppercase 11px labels, semi-bold, wider tracking. Sticky, slightly elevated (surface/80).
- **Rows:** alternating subtle striping (white/2.5% on odd rows). Hover: white/5%. Selected: accent/8%.
- **Row Click:** entire row is clickable for selection. Cursor pointer.
- **Empty State:** centered icon + text, muted colors, no decoration.

### Navigation (Sidebar)
- **Width:** fixed 240px, border-right containment.
- **Section Labels:** uppercase 10px, semi-bold, wide tracking, muted color.
- **Items:** 13px, muted text, 8px 12px padding, rounded-md. Hover: text brightens, faint bg overlay.
- **Active Indicator:** 3px rounded pill on left edge, accent color. Active item gets accent/10% background tint and accent text color.
- **Disabled Items:** 40% opacity, no hover, cursor-default.
- **Micro-motion:** items shift 2px right on hover (framer-motion).

### Stat Cards
- **Layout:** 7-column grid on desktop, 4 on tablet, 2 on mobile.
- **Shape:** rounded-lg (12px), border containment, surface background.
- **Content:** icon in circular tinted badge + uppercase micro-label top, large bold number bottom.
- **Highlight Variant:** special card (online/total) gets semantic green tint on border and background.
- **Hover:** subtle scale (1.02) and lift (-1px) via framer-motion.

### Inputs
- **Style:** transparent background, border containment, rounded-md (8px).
- **Focus:** border shifts to accent, focus ring appears.
- **Placeholder:** muted text color.

### Dialogs
- **Overlay:** dark backdrop with blur.
- **Container:** surface background, raised shadow, rounded-lg.
- **No glassmorphism.** Solid backgrounds only.

## 6. Do's and Don'ts

### Do:
- **Do** use the label doctrine (uppercase, 10-11px, semi-bold, 0.1em tracking) for every section header and data label.
- **Do** pair semantic colors with text labels or icons; never rely on color alone for status.
- **Do** use luminance stepping (void → gunmetal → elevated) to create depth without shadows.
- **Do** keep the accent under 10% of any screen surface per the Reservation Rule.
- **Do** use framer-motion for state transitions at 150-200ms with cubic-bezier(0.2, 0, 0, 1) easing.
- **Do** use semi-transparent white overlays (rgba 255,255,255 at 4-8%) for hover states on dark surfaces.

### Don't:
- **Don't** use gradient text. Prohibited per PRODUCT.md anti-references.
- **Don't** use rounded pastel cards. This is a war room, not a consumer dashboard.
- **Don't** use glassmorphism decoratively. If backdrop-blur appears, it serves a functional purpose (sidebar layering), never decoration.
- **Don't** use border-left or border-right greater than 1px as colored accent stripes. The active indicator is the sole exception, and it's a 3px pill, not a stripe.
- **Don't** add whitespace for "breathing room." Every pixel is real estate; information density wins.
- **Don't** use hero sections, marketing headlines, or consumer onboarding patterns.
- **Don't** use bounce, elastic, or spring animations. Ease-out with exponential curves only.
- **Don't** use identical card grids with icon + heading + text repeated. Stat cards vary by content and semantic color.
