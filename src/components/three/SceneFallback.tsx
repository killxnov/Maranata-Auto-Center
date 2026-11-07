import { Disc3 } from "lucide-react";
export function SceneFallback() {
  return (
    <div className="grid h-full place-items-center text-[#b7c8d8]">
      <Disc3 size={130} strokeWidth={0.6} aria-hidden="true" />
    </div>
  );
}
