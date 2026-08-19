---
name: Editorial Archive System
colors:
  surface: '#faf9f5'
  surface-dim: '#dbdad6'
  surface-bright: '#faf9f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f4f0'
  surface-container: '#efeeea'
  surface-container-high: '#e9e8e4'
  surface-container-highest: '#e3e2df'
  on-surface: '#1b1c1a'
  on-surface-variant: '#434840'
  inverse-surface: '#2f312e'
  inverse-on-surface: '#f2f1ed'
  outline: '#73796f'
  outline-variant: '#c3c8bd'
  surface-tint: '#496640'
  primary: '#334f2b'
  on-primary: '#ffffff'
  primary-container: '#4a6741'
  on-primary-container: '#c2e4b4'
  inverse-primary: '#afd0a1'
  secondary: '#636036'
  on-secondary: '#ffffff'
  secondary-container: '#e9e5b0'
  on-secondary-container: '#69663c'
  tertiary: '#3e4858'
  on-tertiary: '#ffffff'
  tertiary-container: '#566070'
  on-tertiary-container: '#d0dbee'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#caecbc'
  primary-fixed-dim: '#afd0a1'
  on-primary-fixed: '#062104'
  on-primary-fixed-variant: '#324e2a'
  secondary-fixed: '#e9e5b0'
  secondary-fixed-dim: '#cdc996'
  on-secondary-fixed: '#1e1c00'
  on-secondary-fixed-variant: '#4a4821'
  tertiary-fixed: '#d9e3f6'
  tertiary-fixed-dim: '#bdc7d9'
  on-tertiary-fixed: '#121c2a'
  on-tertiary-fixed-variant: '#3d4756'
  background: '#faf9f5'
  on-background: '#1b1c1a'
  surface-variant: '#e3e2df'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Source Sans 3
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Source Sans 3
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Source Sans 3
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
  code:
    fontFamily: Courier Prime
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

This design system is built for an academic and editorial context, emphasizing precision, legacy, and modern utility. The aesthetic balances the warmth of physical archival materials with the efficiency of a high-performance API management tool.

The design style is **Modern Editorial**. It utilizes generous whitespace and a sophisticated typographic hierarchy to create a focused, low-cognitive-load environment. By eschewing heavy shadows and vibrant gradients in favor of subtle tonal shifts and refined borders, the interface evokes the feeling of a well-organized library or a prestigious academic journal.

**Core Principles:**
- **Clarity over Decoration:** Every element serves a functional purpose in the data management workflow.
- **Academic Trust:** Use of serif headings to provide an authoritative, established tone.
- **Tactile Warmth:** A palette inspired by paper and botanical tones to reduce eye strain during long periods of use.

## Colors

The palette is rooted in a "Warm Ivory" base to provide a softer reading experience than pure white. 

- **Primary (Sage Green):** Used for primary actions, active navigation states, and success indicators. It represents growth and stability.
- **Secondary (Paper Yellow):** Used sparingly as a highlight color for search results, pending status badges, or subtle background containers to draw attention without urgency.
- **Text (Deep Charcoal):** Applied to all body text and headings to ensure maximum legibility and high WCAG contrast against the ivory background.
- **Background (Ivory):** The primary canvas for the entire application, providing a non-clinical, academic feel.

## Typography

The typographic system utilizes a high-contrast pairing between a classic serif and a functional sans-serif.

- **Headings:** `Playfair Display` is used for page titles and section headers. It provides the "Editorial" character.
- **UI Elements & Body:** `Source Sans 3` is chosen for its exceptional legibility in data-heavy environments like tables and forms.
- **Labels:** Small caps or all-caps are used for table headers and metadata labels to create clear structural differentiation.
- **API/Code:** Use `Courier Prime` for monospaced elements to maintain the "Typewriter" academic aesthetic.

## Layout & Spacing

The layout follows a **Fixed Grid** model for the main content area to ensure readability of long-form text and tables, centered on the screen with a maximum width of 1280px.

- **Rhythm:** A 4px baseline grid governs all spacing. 
- **Margins:** Desktop views use 40px external margins. Mobile views transition to 16px margins.
- **Sidebars:** The navigation sidebar is fixed at 280px, utilizing a subtle vertical border rather than a shadow to separate it from the main content.
- **Tables:** Use "Comfortable" spacing for data rows (16px vertical padding) to emphasize the editorial feel.

## Elevation & Depth

This system avoids heavy drop shadows, opting instead for **Tonal Layers** and **Low-Contrast Outlines**.

- **Level 0 (Base):** The Warm Ivory (#FDFCF8) background.
- **Level 1 (Cards/Surface):** White (#FFFFFF) surfaces with a 1px solid border in a muted neutral tone (#E5E7EB).
- **Modals:** Use a heavy backdrop blur (8px) with a semi-transparent charcoal overlay (40% opacity) to focus the user’s attention.
- **Interaction:** Hover states on interactive elements should use a subtle shift in background color (e.g., Ivory to a very light Sage tint) rather than a shadow lift.

## Shapes

The shape language is "Soft" yet structured. 

- **Standard Elements:** 4px radius for input fields, buttons, and small cards to maintain a crisp, professional appearance.
- **Badges/Chips:** 2px or 4px radius (never fully pill-shaped) to keep them feeling like library index cards.
- **Modals:** A slightly larger 8px radius is permitted to soften the impact of large overlays.

## Components

### Buttons
- **Primary:** Solid Sage Green (#4A6741) with White text. No gradients.
- **Secondary:** Transparent background with Sage Green border and text.
- **Ghost:** No border, Sage Green text, subtle Ivory background on hover.

### Tables
- **Headers:** `Source Sans 3`, Bold, Uppercase, 12px size. Deep Charcoal text.
- **Borders:** Only horizontal dividers (1px solid #E5E7EB). No vertical borders.
- **Rows:** Alternating "Zebra" stripes are not used; use hover highlights instead.

### Status Badges
- **Success:** Sage Green text on a 10% opacity Sage Green background.
- **Pending:** Deep Charcoal text on the Paper Yellow (#FEF9C3) background.
- **Error/Alert:** Deep Red text on a 10% red background.

### Input Fields
- **Default:** White background, 1px border (#D1D5DB).
- **Focus:** 1px solid Sage Green border with a 2px soft Sage outer glow (not a shadow).
- **Labels:** Positioned above the field, `label-md` style.

### Toast Notifications
- Positioned at the Bottom-Right.
- Flat design (no shadow), 1px border matching the status color (e.g., Green for success).
- Use Lucide icons (e.g., `CheckCircle`, `AlertTriangle`) for immediate visual context.

### Confirmation Modals
- High-contrast headers using `headline-md`.
- Destructive actions (Delete/Archive) use a solid Red button, but only within the modal to prevent accidental clicks.