"use client";
import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { SceneFallback } from "./SceneFallback";

const WheelCanvas = dynamic(() => import("./WheelCanvas"), { ssr: false, loading: SceneFallback });
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <SceneFallback /> : this.props.children;
  }
}
export function HeroScene() {
  const reduced = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 1024px) and (pointer: fine)");
  const [requested, setRequested] = useState(false);
  const [failed, setFailed] = useState(false);
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) =>
      setActive(entry.isIntersecting && !document.hidden),
    );
    observer.observe(element);
    const visibility = () =>
      setActive(!document.hidden && element.getBoundingClientRect().bottom > 0);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  return (
    <div ref={ref} className="h-[210px] w-[210px]" aria-label="Ilustração de uma roda automotiva">
      <div className="relative h-[175px]">
        {requested && desktop && !reduced && !failed ? (
          <SceneBoundary>
            <WheelCanvas active={active} onFailure={() => setFailed(true)} />
          </SceneBoundary>
        ) : (
          <SceneFallback />
        )}
      </div>
      <div className="text-center">
        {!requested && !failed && desktop && !reduced ? (
          <button
            type="button"
            onClick={() => {
              const canvas = document.createElement("canvas");
              const context = canvas.getContext("webgl2");
              if (context) {
                context.getExtension("WEBGL_lose_context")?.loseContext();
                setRequested(true);
              } else setFailed(true);
            }}
            className="min-h-11 text-[.62rem] tracking-wide text-white/70 underline underline-offset-4"
          >
            Explorar detalhe em 3D
          </button>
        ) : (
          <span className="text-[.58rem] uppercase tracking-[.16em] text-white/60">
            Precisão em movimento
          </span>
        )}
      </div>
    </div>
  );
}
