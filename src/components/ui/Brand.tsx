import Image from "next/image";
import Link from "next/link";
export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/#inicio"
      aria-label="Maranata Auto Center, início"
      className="inline-flex shrink-0 items-center"
    >
      <Image
        src={
          light
            ? "/images/branding/maranata-auto-center-on-dark.svg"
            : "/images/branding/maranata-auto-center.svg"
        }
        alt="Maranata Auto Center"
        width={780}
        height={210}
        priority={!light}
        className="h-auto w-[178px] sm:w-[210px]"
      />
    </Link>
  );
}
