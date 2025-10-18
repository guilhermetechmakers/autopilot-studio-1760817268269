# Design Rules for This Project

## Project Design Pattern: ---

## Autopilot Studio Design System Prompt

### 1. **Color Palette**
- **Surface/Background**: 
  - Base: #0E1116 (main background)
  - Sunken: #1A1D23 (card backgrounds)
  - Elevated: #2A2E35 (hover states)
- **Text**: 
  - Primary: #FFFFFF (opacity 100%)
  - Secondary: #B0B3B8 (opacity 80% on dark)
  - Muted: #7A7D81 (opacity 60% on dark)
- **Brand/Accent**: 
  - Primary: #3B82F6 (default)
  - Hover: #2563EB
  - Pressed: #1D4ED8
- **States**: 
  - Success: #22C55E (success text)
  - Warning: #F59E0B (warning text)
  - Danger: #EF4444 (danger text)
  - Info: #3B82F6 (info text)
  - Subtle-bg: #F0F0F0
  - Text HEX: #0E1116
- **Borders/Dividers**: 
  - Strong: #3A3F44
  - Subtle: #B0B3B8
- **Data Viz Series**: #FF5733, #33FF57, #3357FF, #FF33A1, #FFC300, #FF33B5

### 2. **Typography**
- **Families**: 
  - UI Sans: Inter, fallback: Arial
  - Mono: Menlo, fallback: monospace
- **Scale**: 
  - H1: 32px / 40px, weight 700, letter-spacing: -0.5px
  - H2: 28px / 36px, weight 600, letter-spacing: -0.5px
  - H3: 24px / 32px, weight 500, letter-spacing: 0
  - Body-L: 18px / 24px, weight 400, letter-spacing: 0
  - Body: 16px / 24px, weight 400, letter-spacing: 0
  - Caption: 12px / 16px, weight 400, letter-spacing: 0.5px
- **Links**: 
  - Default: #3B82F6, hover: underline, focus: outline.
- **Numerics**: 
  - Mono usage for metrics; size 16px, weight 700.

### 3. **Layout & Spacing**
- **Grid**: 
  - 12 columns, max content widths: sm: 640px, md: 768px, lg: 1024px, xl: 1280px, gutter: 16px, margin: 24px.
- **Spacing Scale (px)**: 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 (used for padding/margin).
- **Radii**: 
  - XS: 2px, SM: 4px, MD: 8px, LG: 16px, FULL: 9999px (default: MD).
- **Elevation**: 
  - Card: 0 2px 4px rgba(0, 0, 0, 0.1)
  - Popover: 0 4px 8px rgba(0, 0, 0, 0.2)
  - Modal: 0 8px 16px rgba(0, 0, 0, 0.3)
- **Density Modes**: 
  - Default: 100%, Compact: 80%.

### 4. **Visual Style**
- **Overall**: modern, cool, high-contrast.
- **Surfaces**: no visible gradients; flat design.
- **Borders**: hairline strategy #B0B3B8 + 1px.
- **Iconography**: stroke style: filled, sizes: 20/24/28, corner style: rounded.
- **Motion**: durations: 200ms, easing curve: cubic-bezier(0.4, 0, 0.2, 1), typical micro-interactions: hover effects.

### 5. **Component Patterns**
- **Buttons**: 
  - Sizes: SM: 32px, MD: 40px, LG: 48px; Primary: #3B82F6, Secondary: #1A1D23, Tertiary: #FFFFFF; hover: darken 10%, pressed: darken 20%, disabled: #B0B3B8.
- **Inputs**: 
  - bg: #2A2E35, border: #3A3F44, placeholder: #7A7D81, focus ring: #3B82F6, radius: 4px, validation colors: success: #22C55E, error: #EF4444, helper text style: 12px, #B0B3B8.
- **Cards**: 
  - Surface: #1A1D23, border: #3A3F44, radius: 8px, padding: 16px, hover elevation: 0 4px 12px rgba(0, 0, 0, 0.2).
- **Navigation**: 
  - Top bar height: 64px; sidebar width: expanded: 250px, collapsed: 64px; active styles: text color: #3B82F6, hover: background color: #2A2E35; tabs style: underline with 2px thickness.
- **Tables**: 
  - Header style: bold, row height: comfortable: 48px, compact: 32px; selection treatment: highlighted row; zebra rules: #F0F0F0; empty state recipe: "No data available."
- **Overlays**: 
  - Modal widths: 600px, radius: 8px, closing behavior: close on backdrop click; popover padding: 8px, spacing: 16px; toast placement: bottom-right, lifetime: 3000ms.
- **Badges/Chips**: 
  - Sizes: small: 20px, large: 30px; radii: 12px; color mapping to states: success: #22C55E, warning: #F59E0B, danger: #EF4444.
- **Skeletons**: 
  - Shimmer timings: 1000ms, colors: #B0B3B8.

### 6. **Overall Mood**
- **Mood**: professional, operational.
- **Tone**: efficient, precise.
- **Brand Feel**: Autopilot Studio embodies cutting-edge automation and seamless integration, creating a streamlined experience for AI development.

**Prompt for AI Design Tools:**

> "Your responsibility is to apply the design system above for Autopilot Studio, taking into consideration its context and requirements. Use the specified color palette, typography, layout patterns, visual style, component patterns, and overall mood to create a consistent and cohesive user interface. Do not deviate from the established design system - focus on implementation and application of the provided guidelines."

---

This project follows the "---

## Autopilot Studio Design System Prompt

### 1. **Color Palette**
- **Surface/Background**: 
  - Base: #0E1116 (main background)
  - Sunken: #1A1D23 (card backgrounds)
  - Elevated: #2A2E35 (hover states)
- **Text**: 
  - Primary: #FFFFFF (opacity 100%)
  - Secondary: #B0B3B8 (opacity 80% on dark)
  - Muted: #7A7D81 (opacity 60% on dark)
- **Brand/Accent**: 
  - Primary: #3B82F6 (default)
  - Hover: #2563EB
  - Pressed: #1D4ED8
- **States**: 
  - Success: #22C55E (success text)
  - Warning: #F59E0B (warning text)
  - Danger: #EF4444 (danger text)
  - Info: #3B82F6 (info text)
  - Subtle-bg: #F0F0F0
  - Text HEX: #0E1116
- **Borders/Dividers**: 
  - Strong: #3A3F44
  - Subtle: #B0B3B8
- **Data Viz Series**: #FF5733, #33FF57, #3357FF, #FF33A1, #FFC300, #FF33B5

### 2. **Typography**
- **Families**: 
  - UI Sans: Inter, fallback: Arial
  - Mono: Menlo, fallback: monospace
- **Scale**: 
  - H1: 32px / 40px, weight 700, letter-spacing: -0.5px
  - H2: 28px / 36px, weight 600, letter-spacing: -0.5px
  - H3: 24px / 32px, weight 500, letter-spacing: 0
  - Body-L: 18px / 24px, weight 400, letter-spacing: 0
  - Body: 16px / 24px, weight 400, letter-spacing: 0
  - Caption: 12px / 16px, weight 400, letter-spacing: 0.5px
- **Links**: 
  - Default: #3B82F6, hover: underline, focus: outline.
- **Numerics**: 
  - Mono usage for metrics; size 16px, weight 700.

### 3. **Layout & Spacing**
- **Grid**: 
  - 12 columns, max content widths: sm: 640px, md: 768px, lg: 1024px, xl: 1280px, gutter: 16px, margin: 24px.
- **Spacing Scale (px)**: 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 (used for padding/margin).
- **Radii**: 
  - XS: 2px, SM: 4px, MD: 8px, LG: 16px, FULL: 9999px (default: MD).
- **Elevation**: 
  - Card: 0 2px 4px rgba(0, 0, 0, 0.1)
  - Popover: 0 4px 8px rgba(0, 0, 0, 0.2)
  - Modal: 0 8px 16px rgba(0, 0, 0, 0.3)
- **Density Modes**: 
  - Default: 100%, Compact: 80%.

### 4. **Visual Style**
- **Overall**: modern, cool, high-contrast.
- **Surfaces**: no visible gradients; flat design.
- **Borders**: hairline strategy #B0B3B8 + 1px.
- **Iconography**: stroke style: filled, sizes: 20/24/28, corner style: rounded.
- **Motion**: durations: 200ms, easing curve: cubic-bezier(0.4, 0, 0.2, 1), typical micro-interactions: hover effects.

### 5. **Component Patterns**
- **Buttons**: 
  - Sizes: SM: 32px, MD: 40px, LG: 48px; Primary: #3B82F6, Secondary: #1A1D23, Tertiary: #FFFFFF; hover: darken 10%, pressed: darken 20%, disabled: #B0B3B8.
- **Inputs**: 
  - bg: #2A2E35, border: #3A3F44, placeholder: #7A7D81, focus ring: #3B82F6, radius: 4px, validation colors: success: #22C55E, error: #EF4444, helper text style: 12px, #B0B3B8.
- **Cards**: 
  - Surface: #1A1D23, border: #3A3F44, radius: 8px, padding: 16px, hover elevation: 0 4px 12px rgba(0, 0, 0, 0.2).
- **Navigation**: 
  - Top bar height: 64px; sidebar width: expanded: 250px, collapsed: 64px; active styles: text color: #3B82F6, hover: background color: #2A2E35; tabs style: underline with 2px thickness.
- **Tables**: 
  - Header style: bold, row height: comfortable: 48px, compact: 32px; selection treatment: highlighted row; zebra rules: #F0F0F0; empty state recipe: "No data available."
- **Overlays**: 
  - Modal widths: 600px, radius: 8px, closing behavior: close on backdrop click; popover padding: 8px, spacing: 16px; toast placement: bottom-right, lifetime: 3000ms.
- **Badges/Chips**: 
  - Sizes: small: 20px, large: 30px; radii: 12px; color mapping to states: success: #22C55E, warning: #F59E0B, danger: #EF4444.
- **Skeletons**: 
  - Shimmer timings: 1000ms, colors: #B0B3B8.

### 6. **Overall Mood**
- **Mood**: professional, operational.
- **Tone**: efficient, precise.
- **Brand Feel**: Autopilot Studio embodies cutting-edge automation and seamless integration, creating a streamlined experience for AI development.

**Prompt for AI Design Tools:**

> "Your responsibility is to apply the design system above for Autopilot Studio, taking into consideration its context and requirements. Use the specified color palette, typography, layout patterns, visual style, component patterns, and overall mood to create a consistent and cohesive user interface. Do not deviate from the established design system - focus on implementation and application of the provided guidelines."

---" design pattern.
All design decisions should align with this pattern's best practices.

## 🌓 Dark/Light Mode Requirements (CRITICAL)

**THIS PROJECT MUST SUPPORT BOTH DARK AND LIGHT MODES**

- Never create single-mode UI (light-only or dark-only)
- Use CSS custom properties for all theme colors
- Theme toggle component is implemented and accessible
- Support: light, dark, and system (follows OS preference)
- Persist user's theme choice in localStorage
- Smooth transitions between themes (200-300ms)
- Test all components in both themes
- Maintain WCAG AA contrast in both modes

**Implementation:**
- Theme provider available at `src/components/theme-provider.tsx`
- Theme toggle available at `src/components/ui/theme-toggle.tsx`
- All colors use `hsl(var(--variable))` pattern
- Light mode defined in `:root`
- Dark mode defined in `.dark` class

---

## General Design Principles

## Color & Visual Design

### Color Palettes
**Create depth with gradients:**
- Primary gradient (not just solid primary color)
- Subtle background gradients
- Gradient text for headings
- Gradient borders on cards
- Dark mode with elevated surfaces

**Color usage:**
- 60-30-10 rule (dominant, secondary, accent)
- Consistent semantic colors (success, warning, error)
- Accessible contrast ratios (WCAG AA minimum)
- Test colors in both light and dark modes

### Typography
**Create hierarchy through contrast:**
- Large, bold headings (48-72px for heroes)
- Clear size differences between levels
- Variable font weights (300, 400, 600, 700)
- Letter spacing for small caps
- Line height 1.5-1.7 for body text
- Inter, Poppins, or DM Sans for modern feel

### Shadows & Depth
**Layer UI elements:**
- Multi-layer shadows for realistic depth
- Colored shadows matching element color
- Elevated states on hover
- Neumorphism for special elements (sparingly)
- Adjust shadow intensity based on theme (lighter in dark mode)

---

---

## Interactions & Micro-animations

### Button Interactions
**Every button should react:**
- Scale slightly on hover (1.02-1.05)
- Lift with shadow on hover
- Ripple effect on click
- Loading state with spinner or progress
- Disabled state clearly visible
- Success state with checkmark animation

### Card Interactions
**Make cards feel alive:**
- Lift on hover with increased shadow
- Subtle border glow on hover
- Tilt effect following mouse (3D transform)
- Smooth transitions (200-300ms)
- Click feedback for interactive cards

### Form Interactions
**Guide users through forms:**
- Input focus states with border color change
- Floating labels that animate up
- Real-time validation with inline messages
- Success checkmarks for valid inputs
- Error states with shake animation
- Password strength indicators
- Character count for text areas

### Page Transitions
**Smooth between views:**
- Fade + slide for page changes
- Skeleton loaders during data fetch
- Optimistic UI updates
- Stagger animations for lists
- Route transition animations

---

---

## Mobile Responsiveness

### Mobile-First Approach
**Design for mobile, enhance for desktop:**
- Touch targets minimum 44x44px
- Generous padding and spacing
- Sticky bottom navigation on mobile
- Collapsible sections for long content
- Swipeable cards and galleries
- Pull-to-refresh where appropriate

### Responsive Patterns
**Adapt layouts intelligently:**
- Hamburger menu → full nav bar
- Card grid → stack on mobile
- Sidebar → drawer
- Multi-column → single column
- Data tables → card list
- Hide/show elements based on viewport

---

---

## Loading & Empty States

### Loading States
**Never leave users wondering:**
- Skeleton screens matching content layout
- Progress bars for known durations
- Animated placeholders
- Spinners only for short waits (<3s)
- Stagger loading for multiple elements
- Shimmer effects on skeletons

### Empty States
**Make empty states helpful:**
- Illustrations or icons
- Helpful copy explaining why it's empty
- Clear CTA to add first item
- Examples or suggestions
- No "no data" text alone

---

---

## Consistency Rules

### Maintain Consistency
**What should stay consistent:**
- Spacing scale (4px, 8px, 16px, 24px, 32px, 48px, 64px)
- Border radius values
- Animation timing (200ms, 300ms, 500ms)
- Color system (primary, secondary, accent, neutrals)
- Typography scale
- Icon style (outline vs filled)
- Button styles across the app
- Form element styles

### What Can Vary
**Project-specific customization:**
- Color palette (different colors, same system)
- Layout creativity (grids, asymmetry)
- Illustration style
- Animation personality
- Feature-specific interactions
- Hero section design
- Card styling variations
- Background patterns or textures

---

---

## Technical Excellence

### Performance
- Optimize images (WebP, lazy loading)
- Code splitting for faster loads
- Debounce search inputs
- Virtualize long lists
- Minimize re-renders
- Use proper memoization

### Accessibility
- Keyboard navigation throughout
- ARIA labels where needed
- Focus indicators visible
- Screen reader friendly
- Sufficient color contrast (both themes)
- Respect reduced motion preferences

---

---

## Key Principles

1. **Be Bold** - Don't be afraid to try unique layouts and interactions
2. **Be Consistent** - Use the same patterns for similar functions
3. **Be Responsive** - Design works beautifully on all devices
4. **Be Fast** - Animations are smooth, loading is quick
5. **Be Accessible** - Everyone can use what you build
6. **Be Modern** - Use current design trends and technologies
7. **Be Unique** - Each project should have its own personality
8. **Be Intuitive** - Users shouldn't need instructions
9. **Be Themeable** - Support both dark and light modes seamlessly

---

