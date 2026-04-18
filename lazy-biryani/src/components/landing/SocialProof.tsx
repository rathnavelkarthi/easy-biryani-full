"use client";

import { SafeImage } from "@/components/ui/SafeImage";
import type { ImageKey } from "@/lib/gemini-images";

const TESTIMONIAL_KEYS: ImageKey[] = ["testimonial-1", "testimonial-2", "testimonial-3"];

const testimonials = [
  {
    handle: "@priya_annauniv",
    likes: "1.8k",
    text: "Better than any biryani spot on Mount Road. Made it in my hostel room at Anna University. Life = changed.",
    rotation: "-rotate-2",
  },
  {
    handle: "@karthik_srm",
    likes: "2.1k",
    text: "SRM mess could never. ₹89 for real dum biryani? I ordered 10 kits for my entire floor.",
    rotation: "rotate-3",
  },
  {
    handle: "@divya_sathyabama",
    likes: "3.4k",
    text: "Exam week saviour! Tastes exactly like the biryani from Thalappakatti but I made it in 15 mins. Chennai students, trust me on this.",
    rotation: "-rotate-1",
  },
];

export function SocialProof() {
  return (
    <section id="proof" className="py-16 sm:py-24 px-4 sm:px-6 bg-surface-container-low overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 sm:mb-16 gap-2 sm:gap-4">
          <h2 className="font-[family-name:var(--font-plus-jakarta-sans)] text-3xl sm:text-4xl md:text-6xl font-black text-on-surface tracking-tighter">
            Chennai Students Love It
          </h2>
          <span className="font-[family-name:var(--font-caveat)] text-lg sm:text-xl text-primary">
            Real reviews from real hostel rooms @LazyBirthiani
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t, i) => (
            <div
              key={t.handle}
              className={`transition-all duration-300 hover:rotate-0 hover:scale-102 sm:${t.rotation}`}
            >
              <div className="bg-surface-container-lowest border-4 border-[#333333] polaroid-frame brutalist-shadow transition-all duration-300">
                <SafeImage
                  imageKey={TESTIMONIAL_KEYS[i]}
                  alt={`${t.handle} biryani photo`}
                  width={400}
                  height={300}
                  className="w-full h-44 sm:h-56 object-cover"
                />
                <div className="mt-3 sm:mt-4 flex items-center justify-between">
                  <span className="font-black text-primary text-xs sm:text-sm">
                    {t.handle}
                  </span>
                  <span className="flex items-center gap-1 text-secondary font-bold text-xs sm:text-sm">
                    <span className="material-symbols-outlined text-base sm:text-lg">
                      favorite
                    </span>
                    {t.likes}
                  </span>
                </div>
                <p className="font-[family-name:var(--font-caveat)] text-lg sm:text-xl text-on-surface mt-1 sm:mt-2 leading-tight">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
