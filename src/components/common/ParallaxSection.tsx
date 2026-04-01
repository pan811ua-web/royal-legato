"use client";
import { useEffect, useRef, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  speed?: number; // 0.1 ~ 0.5
};

export default function ParallaxSection({ children, className = "", speed = 0.3 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.transform = `translateY(${center * speed}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <div className="overflow-hidden relative">
      <div ref={ref} className={`parallax-bg ${className}`}>
        {children}
      </div>
    </div>
  );
}
