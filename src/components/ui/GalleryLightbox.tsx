"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { X } from "lucide-react";
import type { GalleryImage } from "@/types/team";
export function GalleryLightbox({ images }: { images: GalleryImage[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<GalleryImage | null>(null);
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((item) => (
          <button
            key={item.id}
            type="button"
            className="group text-left"
            onClick={() => {
              setSelected(item);
              dialogRef.current?.showModal();
            }}
          >
            <span className="sr-only">Ampliar imagem: </span>
            <Image
              src={item.src}
              alt={item.alt}
              width={720}
              height={540}
              sizes="(max-width: 640px) 90vw, 33vw"
              fetchPriority="low"
              className="aspect-[4/3] w-full rounded object-cover transition-opacity group-hover:opacity-80"
            />
            <span className="mt-3 block text-sm">{item.caption}</span>
            {item.illustrative && (
              <span className="mt-1 block text-[.65rem] text-muted">
                Imagem ilustrativa gerada por IA
              </span>
            )}
          </button>
        ))}
      </div>
      <dialog
        ref={dialogRef}
        aria-label={selected?.caption || "Fotografia ampliada"}
        className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-[1100px] bg-navy p-5 text-white backdrop:bg-black/80"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
      >
        <button
          type="button"
          aria-label="Fechar fotografia"
          onClick={() => dialogRef.current?.close()}
          className="mb-4 ml-auto grid h-11 w-11 place-items-center"
        >
          <X />
        </button>
        {selected && (
          <>
            <Image
              src={selected.src}
              alt={selected.alt}
              width={1600}
              height={1100}
              sizes="90vw"
              className="max-h-[65dvh] w-full object-contain"
            />
            <p className="mt-4 text-sm">{selected.caption}</p>
            {selected.illustrative && (
              <p className="mt-2 text-xs text-muted">
                Imagem ilustrativa gerada por IA. Não representa instalações ou serviços reais da
                Maranata.
              </p>
            )}
          </>
        )}
      </dialog>
    </>
  );
}
