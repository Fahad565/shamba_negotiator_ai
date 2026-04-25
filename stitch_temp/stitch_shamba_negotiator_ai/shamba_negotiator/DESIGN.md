---
name: Shamba Negotiator
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
  on-surface-variant: '#414844'
  inverse-surface: '#2f312e'
  inverse-on-surface: '#f2f1ed'
  outline: '#717973'
  outline-variant: '#c1c8c2'
  surface-tint: '#3f6653'
  primary: '#012d1d'
  on-primary: '#ffffff'
  primary-container: '#1b4332'
  on-primary-container: '#86af99'
  inverse-primary: '#a5d0b9'
  secondary: '#a0401f'
  on-secondary: '#ffffff'
  secondary-container: '#fe8760'
  on-secondary-container: '#732001'
  tertiary: '#3e1e03'
  on-tertiary: '#ffffff'
  tertiary-container: '#583315'
  on-tertiary-container: '#d19b75'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c1ecd4'
  primary-fixed-dim: '#a5d0b9'
  on-primary-fixed: '#002114'
  on-primary-fixed-variant: '#274e3d'
  secondary-fixed: '#ffdbd0'
  secondary-fixed-dim: '#ffb59e'
  on-secondary-fixed: '#3a0b00'
  on-secondary-fixed-variant: '#802909'
  tertiary-fixed: '#ffdcc5'
  tertiary-fixed-dim: '#f4bb92'
  on-tertiary-fixed: '#301400'
  on-tertiary-fixed-variant: '#653d1e'
  background: '#faf9f5'
  on-background: '#1b1c1a'
  surface-variant: '#e3e2df'
typography:
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-padding: 16px
  stack-gap: 12px
  section-margin: 24px
  touch-target-min: 48px
---

## Brand & Style

The design system is anchored in a **Modern Minimalist** aesthetic with a **Tactile** warmth. It is designed to feel like a reliable digital companion for smallholder farmers, bridging the gap between sophisticated AI technology and the grounding reality of agricultural life. 

The personality is helpful, empowering, and deeply trustworthy. By utilizing high-quality whitespace and a mobile-first hierarchy, the UI reduces cognitive load for users who may be multitasking in the field. Visual elements take inspiration from natural organic forms while maintaining the structural clarity of a professional financial tool.

## Colors

The palette is derived from the Kenyan landscape—rich soil and lush vegetation. 

- **Primary (Forest Green):** Used for primary actions, navigation headers, and success states to evoke growth and stability.
- **Secondary (Terracotta):** Applied to highlights, call-to-actions, and interactive badges to provide warmth and visibility without the aggression of pure red.
- **Tertiary (Soil Brown):** Reserved for secondary information, borders, and grounding elements.
- **Background (Off-White):** A soft, "Paper" white reduces eye strain in bright outdoor sunlight compared to clinical pure white.

## Typography

This design system utilizes **Plus Jakarta Sans** for its friendly, rounded terminals and exceptional legibility on mobile screens. 

- **Readability:** Font sizes are slightly enlarged to ensure clarity for users in outdoor environments with varying light conditions. 
- **Hierarchy:** Strong weight contrasts (Bold for headlines vs. Regular for body) guide the user's eye quickly to the most important negotiation data.
- **Numeric Clarity:** Since the tool involves negotiation and pricing, numbers are set with generous tracking to ensure no ambiguity between digits.

## Layout & Spacing

The layout follows a **Fluid Grid** model optimized for one-handed mobile use. 

- **Safe Zones:** A 16px horizontal margin is maintained globally to prevent content from hitting the screen edge.
- **Rhythm:** A 4px baseline grid ensures vertical harmony.
- **Mobile First:** All interactive elements must adhere to a minimum 48px touch target to accommodate ease of use while working.
- **Information Density:** Generous spacing between cards (24px) allows the AI's recommendations to "breathe," making them feel less overwhelming.

## Elevation & Depth

This design system uses **Ambient Shadows** and **Tonal Layers** to create a sense of organized depth.

- **Surface Levels:** The main background is the Off-White base. Secondary content sits on pure white cards.
- **Shadow Profile:** Shadows are soft, long, and slightly tinted with the Tertiary Soil Brown (#8B5E3C) at very low opacity (5-8%). This makes cards feel like they are gently resting on the earth rather than floating in a digital vacuum.
- **Interactivity:** On tap/press, elements should exhibit a subtle "press-in" effect, lowering the elevation to provide tactile feedback.

## Shapes

The shape language is **Rounded**, reflecting organic forms found in nature. 

- **Cards and Inputs:** Use a 0.5rem (8px) base radius to appear friendly and modern.
- **Large Containers:** Modals and bottom sheets use a 1.5rem (24px) top-radius to create a soft, "pouch-like" feel that is welcoming.
- **Icons:** Use rounded caps and joins to match the typography's softness.

## Components

- **Negotiation Cards:** Minimalist white cards with a Primary Forest Green top-accent border. They contain a clear price label (Headline-MD) and a secondary status badge.
- **Action Buttons:** Primary buttons are solid Forest Green with white text. Secondary buttons use a Terracotta outline for high visibility without competing with the primary action.
- **Badges:** Small, high-contrast pills (e.g., "Good Deal," "Market Average") using the Secondary Terracotta or a muted green.
- **Input Fields:** Shadcn-inspired clean lines with a 1px Tertiary Brown border that thickens and changes to Forest Green on focus.
- **Progress Indicators:** Stepped indicators for negotiation phases use organic leaf-like shapes or simple dots to show the journey from "Offer" to "Agreement."
- **Voice/AI Chat Bubbles:** Soft, asymmetric rounded containers that distinguish between the AI (Forest Green tint) and the Farmer (White).