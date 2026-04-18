# Design Spec: Lazy Biryani - Next.js Product Site

## 1. Context & Purpose

**Lazy Biryani** is a D2C biryani kit brand targeting Indian college hostel students. The product is a single-serve biryani kit (₹89) that cooks in 15 minutes using a rice cooker. The brand voice is irreverent, Gen-Z, and unapologetically bold.

A landing page was designed in Google Stitch using the "Masala Brutalism" design system -- a fusion of brutalist architecture aesthetics with warm, spice-inspired colors. The Stitch export (HTML + design tokens + screenshots) lives in `stitch-assets/`.

**Goal:** Convert the Stitch landing page into a full Next.js product site with a storefront, ordering/cart flow, and admin dashboard. Deploy on Hostinger shared hosting with MySQL.

---

## 2. Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | Next.js 15 (App Router) | `output: 'standalone'` for Hostinger |
| Language | TypeScript | Strict mode |
| Styling | Tailwind CSS v4 | Custom theme from Stitch design tokens |
| Animation | Framer Motion | Marquee, hover effects, page transitions |
| Database | Prisma ORM + MySQL | Hostinger-provided MySQL database |
| Auth | Custom session-based | bcrypt + httpOnly cookies + MySQL sessions |
| Forms | Server Actions | React Hook Form for complex forms (checkout) |
| Icons | Material Symbols Outlined | Matching Stitch design |
| Fonts | Plus Jakarta Sans, Inter, Caveat | Google Fonts, loaded via `next/font` |
| Deployment | Hostinger shared hosting | Node.js app + PM2 process manager |

---

## 3. Design System (from Stitch)

### 3.1 Creative Direction: "Masala Brutalism"
Raw brutalist architecture fused with vibrant spice heritage. Sharp 0px radii, high-contrast typography, hard-offset shadows, and warm cream/saffron palette.

### 3.2 Color Tokens

All colors come from the Stitch design system JSON (`stitch-assets/design-system.json`). Key tokens:

| Token | Hex | Usage |
|-------|-----|-------|
| `background` / `surface` | `#FFF9EC` | Warm cream base |
| `primary` | `#845400` | Deep saffron, text accents |
| `primary-container` | `#FFB347` | Hero color, main CTAs |
| `secondary` | `#B71032` | Deep red, urgency/action |
| `tertiary` | `#43682B` | Forest green, freshness cues |
| `on-surface` | `#1E1C12` | Primary text (charcoal, never pure black) |
| `on-surface-variant` | `#524535` | Secondary text |
| `surface-container-low` | `#FAF3E2` | Section backgrounds (Level 1) |
| `surface-container-high` | `#EEE8D7` | Interactive surfaces (Level 2) |
| `surface-container-lowest` | `#FFFFFF` | Card backgrounds |
| `outline` | `#847463` | Subtle borders |
| `outline-variant` | `#D6C3B0` | Ghost borders (20% opacity) |

Full token set mapped to Tailwind in `tailwind.config.ts`.

### 3.3 Typography

| Role | Font | Usage |
|------|------|-------|
| `headline` | Plus Jakarta Sans (700, 800) | H1-H3, nav brand, CTAs |
| `body` | Inter (400, 600) | Body text, labels, table content |
| `accent` | Caveat (400, 700) | Handwritten annotations, quirky callouts |

### 3.4 Brutalist Utilities

These CSS utilities replicate the Stitch design's signature effects:

- **`brutalist-shadow`**: `box-shadow: 4px 4px 0px 0px rgba(51,51,51,1)` -- hard-offset shadow
- **`brutalist-shadow-hover`**: On hover, shadow collapses and element translates 4px (press effect)
- **`polaroid-frame`**: `padding: 10px 10px 40px 10px` -- Polaroid photo effect
- **`marquee`**: Infinite horizontal scroll animation (20s linear)
- **Glassmorphism nav**: `bg-[#FFF9EC]/80 backdrop-blur-md`

### 3.5 Design Rules

- No rounded corners (0px border-radius everywhere)
- No 1px gray borders -- use tonal surface shifts or 2-4px solid `#333` brutalist borders
- Use `on-surface` (#1E1C12) not pure black
- Floating emojis and Caveat annotations break the grid intentionally
- Polaroid frames rotate slightly, straighten on hover

---

## 4. Routes & Pages

### 4.1 Public Storefront

| Route | Page | Description |
|-------|------|-------------|
| `/` | Landing | Direct conversion of Stitch landing page: Hero, Marquee, How It Works, Reality Check table, Social Proof polaroids, CTA with WhatsApp input |
| `/menu` | Product Listing | Grid of biryani kits with filters (category, spice level). Cards use brutalist styling with polaroid images |
| `/menu/[slug]` | Product Detail | Large product image, description, spice level picker, quantity selector, "Add to Cart" CTA. Brutalist card layout |
| `/cart` | Cart + Checkout | Cart items list, quantity adjustment, removal. Checkout form: name, phone (WhatsApp), email, delivery address. Server Action submission |
| `/order/[id]` | Order Confirmation | Order summary, status badge (Pending/Confirmed/Shipped/Delivered), estimated delivery |

### 4.2 Admin Dashboard

| Route | Page | Description |
|-------|------|-------------|
| `/admin/login` | Admin Login | Email + password form, brutalist styling |
| `/admin` | Dashboard | Stats cards (total orders, revenue, pending orders). Recent orders list |
| `/admin/products` | Product Management | Table of products with inline edit, create new, toggle stock/featured |
| `/admin/orders` | Order Management | Filterable order table, click to expand details, update status dropdown |

### 4.3 Layouts

- **`(storefront)/layout.tsx`**: Navbar (glassmorphism, fixed top) + Footer (brand footer with socials). Wraps all public pages.
- **`(admin)/layout.tsx`**: Minimal admin sidebar + header. Auth-gated via middleware. No storefront nav/footer.

---

## 5. Data Model (Prisma + MySQL)

```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model Product {
  id          Int         @id @default(autoincrement())
  name        String
  slug        String      @unique
  description String      @db.Text
  price       Decimal     @db.Decimal(10, 2)
  spiceLevel  SpiceLevel  @default(MEDIUM)
  image       String
  category    String
  inStock     Boolean     @default(true)
  featured    Boolean     @default(false)
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
  orderItems  OrderItem[]
}

model Order {
  id            Int         @id @default(autoincrement())
  status        OrderStatus @default(PENDING)
  customerName  String
  customerPhone String
  customerEmail String?
  address       String      @db.Text
  total         Decimal     @db.Decimal(10, 2)
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt
  items         OrderItem[]
}

model OrderItem {
  id        Int     @id @default(autoincrement())
  orderId   Int
  productId Int
  quantity  Int
  price     Decimal @db.Decimal(10, 2)
  order     Order   @relation(fields: [orderId], references: [id])
  product   Product @relation(fields: [productId], references: [id])
}

model Admin {
  id           Int       @id @default(autoincrement())
  email        String    @unique
  passwordHash String
  role         AdminRole @default(ADMIN)
  createdAt    DateTime  @default(now())
  sessions     Session[]
}

model Session {
  id        Int      @id @default(autoincrement())
  token     String   @unique
  adminId   Int
  expiresAt DateTime
  admin     Admin    @relation(fields: [adminId], references: [id])
}

enum SpiceLevel {
  MILD
  MEDIUM
  HOT
  EXTRA_HOT
}

enum OrderStatus {
  PENDING
  CONFIRMED
  SHIPPED
  DELIVERED
  CANCELLED
}

enum AdminRole {
  ADMIN
  SUPER_ADMIN
}
```

---

## 6. Component Architecture

### 6.1 Design System Components (`src/components/ui/`)

| Component | Props | Description |
|-----------|-------|-------------|
| `BrutalistButton` | variant (primary/secondary/danger), size, children | Hard shadow button with press-down hover effect |
| `BrutalistCard` | children, className, hover | 4px border + hard shadow container |
| `PolaroidFrame` | src, alt, caption, rotation | Tilted image with Polaroid padding, straightens on hover |
| `MarqueeStrip` | items[], speed | Infinite horizontal scroll ticker |
| `Input` | label, type, placeholder, error | Ghost-border input with active state |
| `Badge` | variant (status colors), children | Status indicator pill |
| `ComparisonTable` | rows[], headers[] | Brutalist-styled data table |

### 6.2 Layout Components (`src/components/layout/`)

| Component | Description |
|-----------|-------------|
| `Navbar` | Fixed top, glassmorphism, brand logo, nav links, CTA button |
| `Footer` | Brand footer, social links, copyright, brutalist social icons |
| `AdminSidebar` | Vertical nav: Dashboard, Products, Orders, Logout |
| `AdminHeader` | Top bar with page title and admin email |

### 6.3 Feature Components (`src/components/`)

**Landing Page** (`src/components/landing/`):
- `HeroSection` -- headline, subtext, CTA, polaroid hero image, floating emojis
- `HowItWorks` -- 3-step grid with numbered cards and images
- `RealityCheck` -- comparison table (Food Apps vs Mess vs Lazy Biryani)
- `SocialProof` -- polaroid grid with UGC-style testimonials
- `CTASection` -- final CTA with WhatsApp input and waitlist button

**Products** (`src/components/products/`):
- `ProductGrid` -- responsive grid of product cards with filters
- `ProductCard` -- brutalist card with image, name, price, spice badge, add-to-cart
- `SpiceLevelPicker` -- visual spice level selector (flame icons)
- `ProductDetail` -- full product view with image gallery and actions

**Cart** (`src/components/cart/`):
- `CartDrawer` -- slide-out cart panel (accessible from any page via context)
- `CartItem` -- line item with quantity controls and remove
- `CheckoutForm` -- multi-field form: name, phone, email, address, order summary
- `OrderSummary` -- itemized total with delivery info

**Admin** (`src/components/admin/`):
- `StatsCards` -- dashboard KPI cards (orders, revenue, pending)
- `OrderTable` -- sortable/filterable order list with status badges
- `ProductEditor` -- form for create/edit product (image upload, spice level, price)
- `OrderDetail` -- expanded order view with status update controls

---

## 7. Key Implementation Details

### 7.1 Cart State Management
- Use React Context + `useReducer` for cart state
- Persist to `localStorage` so cart survives page refreshes
- No server-side cart -- keep it client-only until checkout

### 7.2 Admin Authentication
- Custom implementation: bcrypt password hashing, httpOnly session cookies
- Middleware (`src/middleware.ts`) protects all `/admin/*` routes except `/admin/login`
- Session tokens stored in MySQL `Session` table with expiry
- No OAuth/social login -- admin-only, credentials-based

### 7.3 Image Handling
- Product images: store URLs pointing to hosted images (Hostinger file manager or external CDN)
- Landing page images: reference the Google-hosted Stitch image URLs directly (they're public `lh3.googleusercontent.com` URLs)
- Use `next/image` with `remotePatterns` configured for allowed domains

### 7.4 Server Actions
- Checkout submission: validates form, creates Order + OrderItems in a transaction
- Admin product CRUD: create, update, toggle stock/featured, delete
- Admin order status: update order status with validation
- All actions include input validation with Zod schemas

### 7.5 Payment & Ordering Model
- **No online payment integration in v1** -- orders are placed as Cash on Delivery (COD) or pre-orders
- The checkout form captures customer details and creates an order in the database
- Admin reviews and confirms orders manually via the dashboard
- Payment gateway (Razorpay/PhonePe) can be added in a future iteration

### 7.6 Deployment on Hostinger
- `next.config.ts`: `output: 'standalone'`
- Build locally or via CI, upload `.next/standalone/`, `.next/static/`, and `public/` to Hostinger
- Set environment variables in Hostinger panel: `DATABASE_URL`, `SESSION_SECRET`
- PM2 manages the Node.js process
- Run `npx prisma db push` to sync schema to Hostinger MySQL

---

## 8. File Structure

```
src/
├── app/
│   ├── layout.tsx                 # Root layout (fonts, metadata)
│   ├── (storefront)/
│   │   ├── layout.tsx             # Navbar + Footer
│   │   ├── page.tsx               # Landing page (/)
│   │   ├── menu/
│   │   │   ├── page.tsx           # Product listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx       # Product detail
│   │   ├── cart/
│   │   │   └── page.tsx           # Cart + Checkout
│   │   └── order/
│   │       └── [id]/
│   │           └── page.tsx       # Order confirmation
│   └── (admin)/
│       ├── layout.tsx             # Admin sidebar + auth gate
│       ├── admin/
│       │   ├── page.tsx           # Dashboard
│       │   ├── login/
│       │   │   └── page.tsx       # Login form
│       │   ├── products/
│       │   │   └── page.tsx       # Product management
│       │   └── orders/
│       │       └── page.tsx       # Order management
│       └── _actions/              # Server Actions
│           ├── auth.ts
│           ├── products.ts
│           └── orders.ts
├── components/
│   ├── ui/                        # Design system primitives
│   ├── layout/                    # Navbar, Footer, AdminSidebar
│   ├── landing/                   # Landing page sections
│   ├── products/                  # Product components
│   ├── cart/                      # Cart + checkout components
│   └── admin/                     # Admin dashboard components
├── lib/
│   ├── prisma.ts                  # Prisma client singleton
│   ├── auth.ts                    # Session helpers (create, verify, destroy)
│   ├── cart-context.tsx           # Cart React Context + reducer
│   └── validations.ts            # Zod schemas
├── middleware.ts                   # Admin route protection
└── prisma/
    └── schema.prisma              # Database schema
```

---

## 9. Verification Plan

### 9.1 Development Verification
1. `npm run dev` -- app starts without errors on localhost:3000
2. Landing page renders matching the Stitch screenshots (`stitch-assets/*.png`)
3. `/menu` shows seeded products, filtering works
4. `/menu/[slug]` displays product detail, "Add to Cart" updates cart drawer
5. `/cart` shows items, checkout form submits and creates order in DB
6. `/order/[id]` shows order confirmation with correct details
7. `/admin/login` authenticates, redirects to `/admin`
8. Admin CRUD operations work for products and orders
9. Unauthenticated access to `/admin` redirects to `/admin/login`

### 9.2 Build & Deploy Verification
1. `npm run build` completes without errors
2. `.next/standalone` directory is generated
3. `npx prisma db push` syncs schema to MySQL
4. Standalone server starts with `node .next/standalone/server.js`
5. All pages render correctly in production mode

### 9.3 Design Fidelity
1. Compare landing page against Stitch screenshots for color, typography, and layout accuracy
2. Brutalist shadows, hover effects, and polaroid rotations behave correctly
3. Marquee animation runs smoothly
4. Mobile responsive behavior matches the Stitch design intent
5. Google Fonts load correctly (Plus Jakarta Sans, Inter, Caveat)
