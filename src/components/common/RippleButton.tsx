"use client";
import { useRef, ReactNode, MouseEvent } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit";
};

export default function RippleButton({ children, className = "", onClick, href, type = "button" }: Props) {
  const ref = useRef<HTMLElement>(null);

  const handleRipple = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement("span");
    ripple.style.cssText = `
      position:absolute;width:${size}px;height:${size}px;
      left:${x}px;top:${y}px;
      border-radius:50%;background:rgba(255,255,255,0.35);
      transform:scale(0);animation:rippleAnim 0.6s linear;
      pointer-events:none;
    `;
    el.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
    onClick?.();
  };

  const commonProps = {
    ref: ref as any,
    className: `relative overflow-hidden ${className}`,
    onMouseDown: handleRipple,
  };

  if (href) {
    return <a href={href} {...commonProps}>{children}</a>;
  }

  return (
    <button type={type} {...commonProps}>
      {children}
    </button>
  );
}
