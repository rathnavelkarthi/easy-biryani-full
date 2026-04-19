import { Diagnostics } from "@/components/test/Diagnostics";

export default function TestPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Static header - NO client components, NO framer-motion, NO context */}
      <nav className="bg-[#333] text-white px-6 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <span className="font-[family-name:var(--font-plus-jakarta-sans)] text-xl font-black tracking-tighter">
            Lazy Biryani — Test Page
          </span>
          <a href="/" className="text-white/70 hover:text-white text-sm font-bold uppercase tracking-wider">
            Back to Home
          </a>
        </div>
      </nav>

      {/* Static content to verify basic HTML/CSS rendering */}
      <section className="py-12 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="border-4 border-[#333] bg-surface-container-lowest brutalist-shadow p-8">
          <h1 className="font-[family-name:var(--font-plus-jakarta-sans)] text-4xl sm:text-5xl font-black tracking-tighter text-on-surface mb-4">
            If you can see this,<br />
            <span className="text-primary">HTML + CSS</span> works.
          </h1>
          <p className="text-on-surface-variant text-lg max-w-lg mb-6">
            This page tests rendering on Hostinger without framer-motion,
            without context providers, and without complex components.
            If the main landing page fails but this works, the issue is in
            the client-side JavaScript.
          </p>

          {/* Inline test elements */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="bg-primary text-white px-4 py-2 border-2 border-[#333] font-bold text-sm">
              Primary Color
            </div>
            <div className="bg-secondary text-white px-4 py-2 border-2 border-[#333] font-bold text-sm">
              Secondary Color
            </div>
            <div className="bg-tertiary text-white px-4 py-2 border-2 border-[#333] font-bold text-sm">
              Tertiary Color
            </div>
            <div className="bg-primary-container text-on-primary-container px-4 py-2 border-2 border-[#333] font-bold text-sm">
              Container Color
            </div>
          </div>

          {/* Font tests */}
          <div className="space-y-2 mb-6">
            <p className="font-[family-name:var(--font-plus-jakarta-sans)] text-lg font-bold">
              This is Plus Jakarta Sans (headline font)
            </p>
            <p className="font-[family-name:var(--font-dm-sans)] text-lg">
              This is DM Sans (body font)
            </p>
            <p className="font-[family-name:var(--font-caveat)] text-2xl">
              This is Caveat (accent font)
            </p>
          </div>

          {/* Icon test */}
          <div className="flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-2xl text-primary" data-testid="icon-check">
              local_fire_department
            </span>
            <span className="material-symbols-outlined text-2xl text-secondary">
              favorite
            </span>
            <span className="material-symbols-outlined text-2xl text-tertiary">
              verified
            </span>
            <span className="text-sm text-on-surface-variant ml-2">
              (Material Icons should appear to the left)
            </span>
          </div>

          {/* Image test */}
          <div className="border-2 border-[#333]/20 p-2 inline-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/generated/hero.png"
              alt="Test image load"
              width={200}
              height={150}
              className="object-cover"
              data-testid="img-check"
            />
            <p className="text-xs text-on-surface-variant mt-1">
              hero.png from /images/generated/
            </p>
          </div>
        </div>
      </section>

      {/* Client-side diagnostics component */}
      <Diagnostics />

      {/* Pure HTML/CSS mini landing page - zero JS needed */}
      <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="border-4 border-[#333] bg-surface-container-lowest brutalist-shadow overflow-hidden">
          <div className="bg-primary-container px-6 py-3 border-b-4 border-[#333]">
            <h2 className="font-[family-name:var(--font-plus-jakarta-sans)] text-lg font-black uppercase tracking-wider text-on-primary-container">
              Mini Landing Preview (Pure HTML/CSS)
            </h2>
          </div>
          <div className="p-8 space-y-8">
            {/* Hero */}
            <div className="text-center">
              <span className="inline-flex items-center px-3 py-1 text-xs font-black uppercase tracking-wider bg-secondary text-white mb-4">
                Launching in Chennai
              </span>
              <h2 className="font-[family-name:var(--font-plus-jakarta-sans)] text-3xl sm:text-5xl font-black tracking-tighter text-on-surface leading-tight">
                Zero Skills.<br />
                <span className="text-primary">Full</span>{" "}
                <span className="text-secondary">Biryani.</span>
              </h2>
              <p className="font-[family-name:var(--font-caveat)] text-2xl text-tertiary mt-2">
                Just Lazy It.
              </p>
              <p className="text-on-surface-variant max-w-md mx-auto mt-4">
                Chennai&apos;s first ₹89 single-serve biryani kit. 15 minutes in a rice cooker.
              </p>
            </div>

            {/* CTA */}
            <div className="text-center">
              <a
                href="/menu/"
                className="inline-block bg-primary-container text-on-primary-container border-4 border-[#333] px-8 py-4 text-xl font-black brutalist-shadow hover:-translate-y-1 transition-transform"
              >
                Pre-order for ₹89
              </a>
            </div>

            {/* Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { step: "01", title: "Open Box", desc: "Everything pre-measured" },
                { step: "02", title: "Dump + Water", desc: "Into the rice cooker" },
                { step: "03", title: "Press Cook", desc: "15 min. That's it." },
              ].map((item) => (
                <div key={item.step} className="border-2 border-[#333]/20 p-4 text-center">
                  <span className="font-[family-name:var(--font-plus-jakarta-sans)] text-3xl font-black text-primary/30">
                    {item.step}
                  </span>
                  <h3 className="font-bold text-on-surface mt-1">{item.title}</h3>
                  <p className="text-sm text-on-surface-variant">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#333] text-white/70 text-center py-6 text-sm">
        Lazy Biryani Diagnostic Page — if this renders, HTML/CSS/Fonts are working on Hostinger
      </footer>
    </div>
  );
}
