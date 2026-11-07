"use client";

import { useEffect, useState } from "react";
import { navigation } from "@/config/navigation";

export function Navbar() {
  const [activeHref, setActiveHref] = useState("#inicio");

  useEffect(() => {
    let frame = 0;

    const updateActiveSection = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const headerHeight =
          document.querySelector<HTMLElement>("[data-site-header]")?.getBoundingClientRect()
            .height ?? 0;
        const marker = headerHeight + 56;
        let current = "#inicio";
        const atPageEnd =
          window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;

        for (const item of navigation) {
          const section =
            document.querySelector<HTMLElement>(item.href) ??
            document.querySelector<HTMLElement>(`[data-nav-active="${item.href}"]`);
          if (section && section.getBoundingClientRect().top <= marker) current = item.href;
        }

        if (atPageEnd) {
          const lastSection = [...navigation]
            .reverse()
            .find((item) => document.querySelector<HTMLElement>(item.href));
          if (lastSection) current = lastSection.href;
        }

        setActiveHref((previous) => (previous === current ? previous : current));
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    window.addEventListener("maranata:scroll-refresh", updateActiveSection);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
      window.removeEventListener("maranata:scroll-refresh", updateActiveSection);
    };
  }, []);

  return (
    <nav aria-label="Navegação principal" className="hidden items-center gap-5 xl:flex">
      {navigation.map((item) => (
        <a
          key={item.href}
          href={item.href}
          aria-current={activeHref === item.href ? "location" : undefined}
          className={`relative py-3 text-[.72rem] font-medium text-muted transition-colors hover:text-accent after:absolute after:bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:bg-accent after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 ${activeHref === item.href ? "after:scale-x-100" : "after:scale-x-0"}`}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
