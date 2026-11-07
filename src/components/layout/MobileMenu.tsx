"use client";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navigation } from "@/config/navigation";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    const trigger = triggerRef.current;
    if (!open || !dialog) return;
    dialog.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
      dialog.close();
      trigger?.focus();
    };
  }, [open]);
  return (
    <div className="xl:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-label="Abrir menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
        className="grid h-12 w-12 place-items-center rounded"
      >
        <Menu size={22} />
      </button>
      <dialog
        id="mobile-menu"
        ref={dialogRef}
        aria-label="Menu de navegação"
        onCancel={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}
        className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-md rounded-lg bg-paper p-6 text-ink backdrop:bg-navy/70"
      >
        <div className="mb-5 flex items-center justify-between">
          <span className="eyebrow">Navegação</span>
          <button
            autoFocus
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Fechar menu"
            className="grid h-12 w-12 place-items-center"
          >
            <X />
          </button>
        </div>
        <nav aria-label="Navegação mobile">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex min-h-14 items-center justify-between text-lg"
            >
              {item.label}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          ))}
        </nav>
      </dialog>
    </div>
  );
}
