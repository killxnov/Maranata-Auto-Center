import Image from "next/image";
export function EditorialImage({
  src,
  alt,
  illustrative = false,
  className = "",
  sizes = "(max-width: 1024px) 90vw, 550px",
}: {
  src: string;
  alt: string;
  illustrative?: boolean;
  className?: string;
  sizes?: string;
}) {
  return (
    <figure
      className={`editorial-image relative overflow-hidden rounded border border-white/10 bg-surface ${className}`}
    >
      <Image src={src} alt={alt} fill sizes={sizes} fetchPriority="low" className="object-cover" />
      {illustrative && (
        <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/95 via-black/70 to-transparent px-5 pb-4 pt-12 text-[.65rem] leading-5 text-white/85">
          Imagem ilustrativa gerada por IA. Será substituída por fotografia oficial.
        </figcaption>
      )}
    </figure>
  );
}
