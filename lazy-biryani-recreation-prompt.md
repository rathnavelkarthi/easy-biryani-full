# FULL RECREATION PROMPT — Lazy Biryani Webapp

Copy everything below this line and paste it into a new Claude Code session (or any AI coding assistant) to recreate the complete webapp from scratch.

---

## PROMPT START

Build me a complete Next.js webapp called **"Lazy Biryani"** — a single-serve biryani kit e-commerce site targeting college students in Chennai. Here are the EXACT specifications:

---

### TECH STACK

- **Next.js 16** (latest) with App Router
- **React 19**
- **TypeScript** (strict mode)
- **Tailwind CSS v4** (inline theme config via `@import "tailwindcss"`)
- **Framer Motion** for animations
- **react-hook-form** + **zod** for form validation
- **Static export** mode (`output: "export"` in next.config.ts, `trailingSlash: true`, `images.unoptimized: true`)
- No backend/database — all data is client-side with localStorage persistence

---

### DESIGN SYSTEM — "Masala Brutalism"

**Fonts (Google Fonts via `<link>` in layout.tsx `<head>`):**
- Headlines: `Plus Jakarta Sans` (weights: 400, 700, 800)
- Body: `DM Sans` (weights: 400, 500, 600, 700)
- Accent/handwriting: `Caveat` (weights: 400, 700)
- Icons: `Material Symbols Outlined`

**Color Palette:**
- Background: `#fff9ec` (warm cream)
- Primary: `#CD540C` (orange-brown) — buttons, CTAs
- Secondary: `#BC2E0F` (burnt orange) — accents, cart badge
- Tertiary: `#7C5D4F` (taupe-brown)
- Error: `#B3261E` (red)
- Neutral/text: `#1C1B1B` (near-black)
- Borders: `#333333` (dark gray, thick 2-4px)

**Brutalist Style Rules:**
- Thick borders (2-4px solid `#333`)
- Bold box shadows (e.g., `4px 4px 0px #333`)
- No gradients, no rounded corners on primary elements
- High contrast, flat design
- Polaroid-style image frames with slight rotation
- Diagonal stripe patterns as decorative accents

**Custom CSS classes in globals.css:**
- `.brutalist-shadow` — `box-shadow: 4px 4px 0px #333`
- `.diagonal-stripes` — repeating diagonal stripe background pattern
- `.polaroid-frame` — white border + shadow + slight rotation

---

### FILE STRUCTURE

```
src/
├── app/
│   ├── layout.tsx          (Root layout with providers + Google Fonts)
│   ├── page.tsx            (Landing page — assembles all sections)
│   ├── globals.css         (Tailwind imports + custom utilities)
│   ├── menu/page.tsx       (Product browse + add-to-cart)
│   ├── cart/page.tsx       (Cart + checkout + address + order success)
│   ├── login/page.tsx      (Demo login page)
│   ├── admin/page.tsx      (Admin dashboard — orders, stats)
│   └── admin/products/page.tsx (Product CRUD manager)
├── components/
│   ├── landing/
│   │   ├── Navbar.tsx      (Logo, nav links, cart badge, auth, mobile hamburger)
│   │   ├── HeroSection.tsx (Main hero with polaroid image)
│   │   ├── HowItWorks.tsx  (3-step visual guide)
│   │   ├── RealityCheck.tsx (Comparison table vs competitors)
│   │   ├── SocialProof.tsx (3 testimonial polaroid cards)
│   │   ├── CTASection.tsx  (Email signup + social proof)
│   │   └── Footer.tsx      (Dark footer with links)
│   ├── checkout/
│   │   └── AddressForm.tsx (GPS + manual address entry)
│   └── ui/
│       ├── BrutalistButton.tsx (variants: primary/secondary/tertiary/error/danger, sizes: sm/md/lg)
│       ├── BrutalistCard.tsx   (Card container with brutalist border)
│       ├── SafeImage.tsx       (Next Image with SVG fallback system)
│       ├── Badge.tsx           (Status labels — primary/secondary/tertiary/error/pending/success)
│       ├── Input.tsx           (Styled form input)
│       ├── MarqueeStrip.tsx    (Scrolling horizontal ticker)
│       └── PolaroidFrame.tsx   (Polaroid-style image frame with rotation)
├── lib/
│   ├── AuthContext.tsx     (Auth provider with login/logout + localStorage)
│   ├── CartContext.tsx      (Cart provider with add/remove/update + localStorage)
│   ├── ProductContext.tsx   (Product CRUD provider for admin)
│   ├── products.ts         (Product data + TypeScript types)
│   ├── users.ts            (Demo user credentials)
│   ├── orders.ts           (Mock order data)
│   └── gemini-images.ts    (Image path mapping + SVG placeholders)
public/
└── images/generated/       (AI-generated product/hero/testimonial images)
```

---

### PRODUCTS (4 SKUs)

```typescript
type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice: number;
  description: string;
  image: string;
  spiceLevel: 1 | 2 | 3 | 4 | 5;
  tag?: string;
  available: boolean;
};

const products: Product[] = [
  {
    id: "chicken-dum",
    name: "Chicken Dum Biryani Kit",
    slug: "chicken-dum",
    price: 89,
    originalPrice: 249,
    description: "Pre-marinated chicken pieces, aged basmati rice, real saffron strands, and our secret 18-spice masala blend. Just add water, press the button, and wait 15 minutes.",
    spiceLevel: 3,
    tag: "Bestseller",
    available: true,
    image: "/images/generated/chicken-dum.png"
  },
  {
    id: "mutton-special",
    name: "Mutton Biryani Kit",
    slug: "mutton-special",
    price: 129,
    originalPrice: 349,
    description: "Slow-braised mutton chunks with smoky masala, caramelized fried onions, and premium long-grain rice. The kit that started a hostel revolution.",
    spiceLevel: 4,
    tag: "Premium",
    available: true,
    image: "/images/generated/mutton-special.png"
  },
  {
    id: "veg-biryani",
    name: "Veg Biryani Kit",
    slug: "veg-biryani",
    price: 69,
    originalPrice: 199,
    description: "Paneer cubes, mixed seasonal veggies, and a killer masala that makes even your non-veg friends jealous.",
    spiceLevel: 2,
    tag: "Value Pick",
    available: true,
    image: "/images/generated/veg-biryani.png"
  },
  {
    id: "egg-biryani",
    name: "Egg Biryani Kit",
    slug: "egg-biryani",
    price: 79,
    originalPrice: 219,
    description: "Pre-boiled eggs, fragrant rice, caramelized onions, and a perfectly balanced masala. The easiest biryani you'll ever make.",
    spiceLevel: 3,
    available: true,
    image: "/images/generated/egg-biryani.png"
  }
];
```

---

### DEMO USERS

```typescript
const users = [
  { id: "1", email: "admin@lazybiryani.com", password: "admin123", name: "Admin Chef", role: "admin" },
  { id: "2", email: "user@lazybiryani.com", password: "user123", name: "Hungry Student", role: "user" }
];
```

- Admin login → redirects to `/admin`
- User login → redirects to `/menu`
- Auth stored in localStorage key `"lazy-biryani-auth"`

---

### MOCK ORDERS (for admin dashboard)

Create 5 mock orders from college students:
- Customers from VIT Chennai, BITS Pilani Hyderabad, SRM Kattankulathur, NIT Trichy, Anna University
- Use hostel/PG addresses
- Statuses: `"pending"`, `"preparing"`, `"out_for_delivery"`, `"delivered"`
- Each order has items array with product name, quantity, price

---

### CONTEXT PROVIDERS

**AuthContext:**
- `login(email, password)` — validates against demo users, stores in localStorage
- `logout()` — clears localStorage
- `user` state: `{ id, email, name, role }` or null
- `loading` state for hydration

**CartContext:**
- `addItem(product)` — adds or increments quantity
- `removeItem(productId)` — removes entirely
- `updateQuantity(productId, quantity)` — sets specific quantity
- `clearCart()` — empties cart
- `totalItems` — computed count
- `totalPrice` — computed sum
- localStorage key: `"lazy-biryani-cart"`

**ProductContext:**
- `products` — array of all products
- `addProduct(product)` — adds new product
- `updateProduct(id, updates)` — partial update
- `deleteProduct(id)` — removes product
- `toggleAvailability(id)` — flips available boolean
- Initialized with default products from products.ts

**All three wrap the app in layout.tsx:** `AuthProvider > CartProvider > ProductProvider > {children}`

---

### LANDING PAGE SECTIONS (exact order)

**1. Navbar:**
- Left: "Lazy Biryani" logo text (Caveat font, bold)
- Center: "Menu" link (desktop)
- Right: Cart icon with item count badge (secondary color), Login/Logout button
- Mobile: hamburger menu with slide-down nav
- Admin users see "Manage Products" link
- Sticky top, white background, brutalist bottom border

**2. HeroSection:**
- Headline: `"Zero Skills. Full Biryani."` (Plus Jakarta Sans, 800 weight)
- Subheadline: `"The ₹89 single-serve biryani kit that takes 15 minutes in a rice cooker. No chopping, no shopping, no crying."`
- Two buttons: "Order Now →" (primary, links to /menu) and "How it works" (secondary, scrolls down)
- Right side: Polaroid-frame image with slight rotation, Caveat caption "actual biryani, not stock photo"
- Framer-motion: fade in + slight Y translation on mount

**3. MarqueeStrip:**
- Scrolling horizontal ticker with items like: "🔥 127+ Chennai students ordered this week", "🎓 Anna University approved*", "⭐ 4.8 rating", college names
- Uses CSS animation (translateX), infinite loop
- Speed prop (default 20s)

**4. HowItWorks:**
- Section title: "Biryani in 3 Brain-Dead Steps"
- 3 cards in a row:
  1. "Open the Box" — "Everything's pre-measured. Even the water line is marked."
  2. "Add Water & Press Start" — "That's literally it. Your rice cooker does the rest."
  3. "Eat Like a King" — "15 minutes later, you have restaurant-grade biryani."
- Each card has a step number, icon/image, title, description
- Framer-motion stagger animation on scroll

**5. RealityCheck:**
- Title: "The Honest Comparison"
- Comparison table with columns: Feature | Cookd/Swiggy/Zomato | Your Hostel Canteen | Lazy Biryani
- Rows: Price, Time, Taste Rating, Effort Level, Portion Size
- Lazy Biryani column highlighted with primary background
- Shows Lazy Biryani winning on all metrics

**6. SocialProof:**
- Title: "What Chennai Students Say"
- 3 testimonial cards in polaroid style:
  1. Priya S., Anna University — "I burnt Maggi once. This kit survived me. 10/10."
  2. Rahul K., VIT Chennai — "My roommate thought I ordered from a restaurant. I let him believe it."
  3. Anitha M., SRM — "₹89 for biryani that's better than the canteen's ₹120 'special'? No contest."
- Cards slightly rotated (-2deg, 1deg, -1deg), hover effect straightens them
- Star ratings (all 5 stars)
- Framer-motion: stagger fade-in

**7. CTASection:**
- Headline: "Ready to Never Eat Bad Biryani Again?"
- Email input + "Get Started" button
- Below: "Join 127+ Chennai students who've upgraded their hostel life"
- Background: primary color, white text

**8. Footer:**
- Dark background (#1C1B1B)
- Logo, tagline, social links (Instagram, Twitter)
- "Made with 🔥 in Chennai"
- Copyright line

---

### MENU PAGE (`/menu`)

- Grid of product cards (responsive: 1 col mobile, 2 col tablet, 3-4 col desktop)
- Each card shows: image, name, tag badge, spice level dots, price (with strikethrough original), description, "Add to Cart" button
- Only shows products where `available === true` (uses ProductContext)
- Cards use BrutalistCard + BrutalistButton
- Framer-motion stagger animation

---

### CART PAGE (`/cart`)

- Lists cart items with: image, name, quantity controls (+/-), price, remove button
- Shows order summary: subtotal, delivery fee (₹29), total
- **Two-step checkout:**
  1. First: shows cart items + "Proceed to Checkout" button
  2. Second: AddressForm appears — must fill address before placing order
- **Order Success:** Modal/overlay with animation confirming order placed, shows order details and "Back to Menu" button
- If cart empty: "Your cart is empty" message with link to menu

---

### ADDRESS FORM (`AddressForm.tsx`)

- Uses react-hook-form + zod validation
- Fields:
  - Full Name (required)
  - Phone (required, must be 10 digits)
  - Address Line 1 (required)
  - Address Line 2 (optional)
  - Landmark (optional)
  - City (required, defaults to "Chennai")
  - Pincode (required, must be 6 digits)
  - Address Label: radio buttons — "Hostel" | "PG" | "Home" | "Other"
- **GPS Button:** "📍 Use Current Location"
  - Calls `navigator.geolocation.getCurrentPosition()`
  - Reverse geocodes using free Nominatim API: `https://nominatim.openstreetmap.org/reverse?format=json&lat={lat}&lon={lng}`
  - Auto-fills address fields from response
  - Shows loading state while geolocating
- Styled with brutalist inputs and borders

---

### LOGIN PAGE (`/login`)

- Simple centered card with email + password fields
- "Login" button validates against demo users
- Shows error message for invalid credentials
- Redirects based on role: admin → `/admin`, user → `/menu`
- Below form: shows demo credentials for easy testing

---

### ADMIN DASHBOARD (`/admin`)

- Protected: redirects to `/login` if not authenticated or not admin role
- **Stats Cards Row:** Total Orders, Active Orders, Revenue (₹), Total Products (from ProductContext)
- **Quick Actions:** Link to "Manage Products" (`/admin/products`)
- **Orders Table:** Columns — Order ID, Customer, Items, Total, Status (badge), Date
- **Status Filter:** Tabs/buttons to filter by status (all, pending, preparing, out_for_delivery, delivered)

---

### PRODUCT MANAGER (`/admin/products`)

- Protected: admin only
- Grid of existing products with: image preview, name, price, availability toggle, edit/delete buttons
- **Add Product:** Button opens modal with form:
  - Name (auto-generates slug from name)
  - Price, Original Price
  - Description (textarea)
  - Spice Level (1-5 selector)
  - Image URL
  - Tag (optional)
  - Available toggle
- **Edit:** Same modal pre-filled with existing data
- **Delete:** Confirmation dialog before removing
- Uses ProductContext for all CRUD operations

---

### SAFEIMAGE SYSTEM

Create a `SafeImage` component that:
1. Maps an `imageKey` string to a file path in `/images/generated/`
2. If the image file doesn't exist or fails to load, renders an SVG placeholder
3. Each placeholder has a unique warm color (oranges, browns, creams matching the brand palette)
4. Placeholder shows the image key text centered

Image keys: `"hero"`, `"testimonial-1"`, `"testimonial-2"`, `"testimonial-3"`, `"chicken-dum"`, `"mutton-special"`, `"veg-biryani"`, `"egg-biryani"`, `"step-1"`, `"step-2"`, `"step-3"`

---

### RESPONSIVE BREAKPOINTS

- Mobile-first design
- `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`
- Mobile: single column, hamburger nav, stacked cards
- Tablet: 2-column grids
- Desktop: full layout with side-by-side hero

---

### IMPORTANT IMPLEMENTATION NOTES

1. **EVERY component must be `"use client"`** — this is a fully client-side app with static export
2. **No API routes** — everything is client-side state
3. **localStorage** for cart and auth persistence
4. **Path alias:** `@/*` maps to `./src/*` in tsconfig
5. **All prices in INR (₹)** — use `₹` symbol, not `$`
6. **Tone of voice:** Funny, irreverent, self-deprecating, Gen-Z college humor
7. **Target audience:** 18-22 year old college students in Chennai, India
8. **Core USP:** ₹89 biryani kit, 15 minutes, rice cooker only, zero cooking skill needed
9. For placeholder product images, generate colorful SVG data URIs with the product name text — don't use external image URLs

Build all files, install dependencies, and verify the build succeeds with `npm run build`.

## PROMPT END
