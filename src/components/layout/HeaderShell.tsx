"use client";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
export function HeaderShell({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    const measure = () => {
      if (!header.current) return;
      document.documentElement.style.setProperty(
        "--header-height",
        `${header.current.getBoundingClientRect().height}px`,
      );
      window.dispatchEvent(new Event("maranata:layout"));
    };
    const observer = new ResizeObserver(measure);
    if (header.current) observer.observe(header.current);
    measure();
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, []);
  return (
    <header
      ref={header}
      data-site-header
      className={`sticky top-0 z-40 border-b border-ink/10 bg-paper/95 backdrop-blur-md transition-shadow duration-300 ${scrolled ? "shadow-[0_4px_24px_rgb(10_22_38_/_8%)]" : ""}`}
    >
      {children}
    </header>
  );
}
