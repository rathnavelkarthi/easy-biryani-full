"use client";

import { useState, useEffect } from "react";

interface Check {
  name: string;
  status: "pending" | "pass" | "fail" | "warn";
  detail: string;
}

export function Diagnostics() {
  const [checks, setChecks] = useState<Check[]>([
    { name: "JavaScript Execution", status: "pending", detail: "Waiting..." },
    { name: "React Hydration", status: "pending", detail: "Waiting..." },
    { name: "CSS Variables", status: "pending", detail: "Waiting..." },
    { name: "Google Fonts", status: "pending", detail: "Waiting..." },
    { name: "Material Icons", status: "pending", detail: "Waiting..." },
    { name: "Image Loading", status: "pending", detail: "Waiting..." },
    { name: "LocalStorage", status: "pending", detail: "Waiting..." },
    { name: "Webpack Chunks", status: "pending", detail: "Waiting..." },
  ]);
  const [hydrated, setHydrated] = useState(false);
  const [jsTime, setJsTime] = useState<number | null>(null);

  useEffect(() => {
    const start = performance.now();
    setHydrated(true);
    setJsTime(performance.now() - start);

    const results: Check[] = [];

    // 1. JS Execution
    results.push({
      name: "JavaScript Execution",
      status: "pass",
      detail: `JS loaded and executed in ${Math.round(performance.now())}ms from page start`,
    });

    // 2. React Hydration
    results.push({
      name: "React Hydration",
      status: "pass",
      detail: "React successfully hydrated this client component",
    });

    // 3. CSS Variables
    const bg = getComputedStyle(document.documentElement).getPropertyValue("--color-background").trim();
    results.push({
      name: "CSS Variables",
      status: bg ? "pass" : "fail",
      detail: bg ? `--color-background = ${bg}` : "CSS theme variables NOT loaded. Tailwind CSS may have failed.",
    });

    // 4. Google Fonts
    const fontCheck = document.fonts ? "available" : "unavailable";
    if (document.fonts) {
      document.fonts.ready.then(() => {
        setChecks((prev) =>
          prev.map((c) =>
            c.name === "Google Fonts"
              ? {
                  ...c,
                  status: document.fonts.check("16px 'Plus Jakarta Sans'") ? "pass" : "warn",
                  detail: document.fonts.check("16px 'Plus Jakarta Sans'")
                    ? "Plus Jakarta Sans loaded successfully"
                    : "Plus Jakarta Sans not detected (may still be loading or blocked by CORS)",
                }
              : c
          )
        );
      });
    }
    results.push({
      name: "Google Fonts",
      status: "pending",
      detail: `Font API ${fontCheck}, checking...`,
    });

    // 5. Material Icons
    const iconSpan = document.querySelector("[data-testid='icon-check']");
    const iconWidth = iconSpan ? iconSpan.getBoundingClientRect().width : 0;
    results.push({
      name: "Material Icons",
      status: iconWidth > 10 ? "pass" : "warn",
      detail: iconWidth > 10 ? "Material Symbols rendering correctly" : "Material Symbols may not have loaded (width check)",
    });

    // 6. Image Loading
    const testImg = document.querySelector("[data-testid='img-check']") as HTMLImageElement | null;
    if (testImg) {
      if (testImg.complete && testImg.naturalWidth > 0) {
        results.push({ name: "Image Loading", status: "pass", detail: `Image loaded: ${testImg.src}` });
      } else {
        testImg.onload = () => {
          setChecks((prev) =>
            prev.map((c) => (c.name === "Image Loading" ? { ...c, status: "pass", detail: `Image loaded after delay: ${testImg.src}` } : c))
          );
        };
        testImg.onerror = () => {
          setChecks((prev) =>
            prev.map((c) => (c.name === "Image Loading" ? { ...c, status: "fail", detail: `FAILED to load: ${testImg.src}` } : c))
          );
        };
        results.push({ name: "Image Loading", status: "pending", detail: "Image still loading..." });
      }
    } else {
      results.push({ name: "Image Loading", status: "warn", detail: "Test image element not found in DOM" });
    }

    // 7. LocalStorage
    try {
      localStorage.setItem("__diag_test", "1");
      localStorage.removeItem("__diag_test");
      results.push({ name: "LocalStorage", status: "pass", detail: "localStorage read/write working" });
    } catch (e) {
      results.push({ name: "LocalStorage", status: "fail", detail: `localStorage error: ${e}` });
    }

    // 8. Webpack chunks - check if Next.js RSC data is present
    const hasNextData = !!(window as unknown as Record<string, unknown>).__next_f;
    results.push({
      name: "Webpack Chunks",
      status: hasNextData ? "pass" : "fail",
      detail: hasNextData ? "Next.js RSC flight data present (__next_f found)" : "__next_f NOT found. JS chunks may have failed to load from /next/static/",
    });

    setChecks(results);
  }, []);

  const statusIcon = (s: Check["status"]) => {
    switch (s) {
      case "pass": return "check_circle";
      case "fail": return "cancel";
      case "warn": return "warning";
      default: return "hourglass_empty";
    }
  };

  const statusColor = (s: Check["status"]) => {
    switch (s) {
      case "pass": return "text-green-700 bg-green-50";
      case "fail": return "text-red-700 bg-red-50";
      case "warn": return "text-amber-700 bg-amber-50";
      default: return "text-gray-500 bg-gray-50";
    }
  };

  return (
    <section id="diagnostics" className="py-16 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="border-4 border-[#333] bg-surface-container-lowest brutalist-shadow">
        <div className="bg-[#333] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-2xl">terminal</span>
            <h2 className="font-[family-name:var(--font-plus-jakarta-sans)] text-xl font-black uppercase tracking-wider">
              Hostinger Diagnostics
            </h2>
          </div>
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-red-400"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
            <span className="w-3 h-3 rounded-full bg-green-400"></span>
          </div>
        </div>

        <div className="p-6 space-y-3">
          {!hydrated && (
            <div className="bg-red-100 border-2 border-red-400 p-4 text-red-800 font-bold text-sm">
              If you can read this but the checks below say &quot;Waiting...&quot;, JavaScript is NOT executing.
              This means the JS chunks from /next/static/chunks/ are not loading on Hostinger.
            </div>
          )}

          {checks.map((check) => (
            <div key={check.name} className={`flex items-start gap-3 p-3 border-2 border-[#333]/10 ${statusColor(check.status)}`}>
              <span className="material-symbols-outlined text-xl mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                {statusIcon(check.status)}
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm uppercase tracking-wide">{check.name}</div>
                <div className="text-xs mt-0.5 opacity-80 break-all">{check.detail}</div>
              </div>
            </div>
          ))}

          {hydrated && jsTime !== null && (
            <div className="mt-4 pt-4 border-t-2 border-[#333]/10 text-xs text-on-surface-variant space-y-1">
              <div><strong>User Agent:</strong> {navigator.userAgent}</div>
              <div><strong>URL:</strong> {window.location.href}</div>
              <div><strong>Protocol:</strong> {window.location.protocol}</div>
              <div><strong>Hydration Time:</strong> {jsTime.toFixed(1)}ms</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
