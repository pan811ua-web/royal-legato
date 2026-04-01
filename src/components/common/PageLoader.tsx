"use client";
import { useState, useEffect } from "react";

export default function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFadeOut(true), 1200);
    const t2 = setTimeout(() => setVisible(false), 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-opacity duration-600"
      style={{ opacity: fadeOut ? 0 : 1, pointerEvents: fadeOut ? "none" : "all" }}
    >
      <p
        className="font-serif text-3xl tracking-[0.4em] text-[var(--teal)]"
        style={{ animation: "loaderFadeIn 0.8s ease forwards" }}
      >
        Royal Legato
      </p>
      <div className="mt-6 w-24 h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent"
        style={{ animation: "loaderLine 0.8s 0.4s ease forwards", opacity: 0 }} />
    </div>
  );
}
