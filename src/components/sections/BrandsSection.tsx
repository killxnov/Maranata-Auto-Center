"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { automotiveBrands } from "@/data/brands";

const BRAND_SPEED_PX_PER_SECOND = 40;

export function BrandsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const firstGroupRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const group = firstGroupRef.current;
    if (!track || !group) return;

    const updateDuration = () => {
      if (window.innerWidth >= 1024) {
        track.style.removeProperty("--brands-duration");
        return;
      }

      const distance = group.getBoundingClientRect().width;
      track.style.setProperty("--brands-duration", `${distance / BRAND_SPEED_PX_PER_SECOND}s`);
    };

    const observer = new ResizeObserver(updateDuration);
    observer.observe(group);
    window.addEventListener("resize", updateDuration, { passive: true });
    updateDuration();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateDuration);
    };
  }, []);

  return (
    <section className="brands-section" aria-label="Marcas automotivas de referência">
      <div
        className="brands-window"
        tabIndex={0}
        role="region"
        aria-label="Lista de marcas automotivas"
      >
        <div ref={trackRef} className="brands-track">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              ref={copy === 0 ? firstGroupRef : undefined}
              className="brands-group"
              aria-hidden={copy === 1 ? true : undefined}
            >
              {automotiveBrands.map((brand) => (
                <li key={brand.name}>
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={136}
                    height={48}
                    className="brand-logo h-12 w-[110px] object-contain"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
