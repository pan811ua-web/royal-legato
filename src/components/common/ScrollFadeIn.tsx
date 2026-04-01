"use client";
import { useEffect, useRef, ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right";
};

export default function ScrollFadeIn({ children, delay = 0, className = "", direction = "up" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const translate =
      direction === "up" ? "translateY(32px)" :
      direction === "left" ? "translateX(-32px)" :
      "translateX(32px)";

    el.style.opacity = "0";
    el.style.transform = translate;
    el.style.transition = `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "none";
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, direction]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
