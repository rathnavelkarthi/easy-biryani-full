# Design System Specification: Kinetic Spice Editorial

## 1. Overview & Creative North Star
### The Creative North Star: "Masala Brutalism"
This design system rejects the sterile, rounded-corner homogeneity of modern SaaS. Instead, it embraces **Masala Brutalism**—a philosophy that fuses the raw, unapologetic honesty of brutalist architecture with the vibrant, sensory-rich heritage of a premium editorial magazine. 

We are creating a digital experience that feels "Lazy" in its effortless sophistication, yet "Kinetic" in its energy. By utilizing sharp 0px radii, high-contrast typography, and a "Kinetic Spice" layout—where elements feel as though they are captured in a moment of organized chaos—we move beyond standard UI. The goal is a signature visual identity that feels like a high-end food journal: bold, intentional, and unapologetically flavorful.

---

## 2. Colors: The Spice Palette
Our palette is rooted in the warmth of the kitchen and the intensity of raw spices. We use color not just for decoration, but as the primary tool for spatial definition.

*   **Turmeric Yellow (`primary_container`: #FFB347):** Our hero color. Use this for high-energy accents and main CTAs.
*   **Deep Red (`secondary`: #B71032):** The "Heat." Used for urgent actions, secondary emphasis, and brand moments that require gravitas.
*   **Warm Cream (`surface`: #FFF9EC):** Our "Fine Paper" base. This is the foundation of the editorial look.

### The "No-Line" Rule
**Explicit Instruction:** 1px solid borders are strictly prohibited for sectioning. Boundaries must be defined through background color shifts or tonal transitions. To separate a hero section from a content block, transition from `surface` to `surface-container-low`.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of spice-stained papers.
*   **Level 0 (Base):** `surface` (#FFF9EC)
*   **Level 1 (Nesting):** `surface-container-low` (#FAF3E2)
*   **Level 2 (Interaction):** `surface-container-high` (#EEE8D7)
Use these shifts to create "ghost" containers that organize content without the clutter of lines.

### Signature Textures & Glass
To elevate the brutalism, use **Glassmorphism** for floating navigation or overlay menus. Use a semi-transparent `surface_variant` with a 20px backdrop-blur. For primary CTAs, utilize a subtle gradient from `primary` (#845400) to `primary_container` (#FFB347) to simulate the depth of ground spices.

---

## 3. Typography: The Editorial Voice
Our type system is the backbone of the "Kinetic Spice" aesthetic. We pair the industrial precision of **Space Grotesk** with the humanistic warmth of **Epilogue**.

*   **Display & Headlines (Space Grotesk):** These should be treated as graphic elements. Use `display-lg` (3.5rem) with tight letter-spacing for a loud, "Lazy Biryani" brand presence.
*   **Body & Title (Epilogue):** Chosen for its readability and editorial elegance. `body-lg` at 1rem provides a sophisticated weight for long-form content.
*   **Hierarchy as Identity:** Always lead with a massive Space Grotesk headline followed by a significantly smaller, high-contrast Epilogue sub-headline. This "Gap" in the scale creates the signature editorial tension.

---

## 4. Elevation & Depth: Tonal Layering
In Masala Brutalism, we do not use "elevation" in the Material Design sense. We use **Tonal Layering**.

*   **The Layering Principle:** Depth is achieved by "stacking." Place a `surface-container-lowest` card on a `surface-container-low` section. This creates a soft, natural lift that feels like high-quality stationery.
*   **Ambient Shadows:** If a floating effect is required (e.g., a "Lazy Biryani" special offer modal), use an extra-diffused shadow: `box-shadow: 0 20px 40px rgba(30, 28, 18, 0.06);`. The shadow color must be a tinted version of `on-surface`, never pure black.
*   **Sharpness over Softness:** All containers must maintain a `0px` border-radius. The "softness" comes from the cream color palette and ambient shadows, not rounded corners.

---

## 5. Components: The Primitive Spices

### Buttons
*   **Primary:** Solid `primary_container` (#FFB347) with `on-primary-fixed` text. Sharp corners. No border.
*   **Secondary:** `surface-container-highest` background. Sharp corners.
*   **State Change:** On hover, primary buttons shift to `primary` (#845400) with a 4px "block shadow" (hard-edged, 100% opacity) in `secondary`.

### Cards & Lists
*   **No Dividers:** Forbid the use of divider lines. Separate list items using `8px` of vertical white space or alternating backgrounds between `surface` and `surface-container-low`.
*   **The "Kinetic" Card:** Images should slightly overlap the container boundaries to create a sense of movement.

### Input Fields
*   **Styling:** Fields are `surface-container-lowest` with a "Ghost Border" (outline-variant at 20% opacity). 
*   **Active State:** The bottom border becomes a 2px solid `primary` (#845400).

### Additional Component: "The Spice Tray" (Contextual Navigation)
A horizontal scrolling strip of selection chips using `surface-container-high`. Used for filtering "Biryani Types" or "Spice Levels." Chips transition from `surface-container-high` to `secondary` when active.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** embrace the 0px radius. It is the signature of this system.
*   **Do** use asymmetrical layouts. A heavy headline on the left with a small "Lazy Biryani" badge floating on the far right.
*   **Do** utilize white space as a structural element. Let the "Warm Cream" breathe.
*   **Do** use "Ghost Borders" (10-20% opacity) only when absolutely necessary for accessibility.

### Don’t:
*   **Don't** use 1px solid black or high-contrast borders. It kills the editorial flow.
*   **Don't** use rounded corners. Even a 2px radius violates the Masala Brutalist aesthetic.
*   **Don't** use standard "drop shadows." If it doesn't look like ambient light hitting paper, it doesn't belong.
*   **Don't** use generic icon libraries. Opt for sharp, stroke-based icons that match the `outline` token weight.