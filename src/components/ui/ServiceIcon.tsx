import {
  Wrench,
  ShieldCheck,
  ScanLine,
  Disc3,
  MoveVertical,
  Droplets,
  ClipboardCheck,
  CarFront,
} from "lucide-react";
import type { ServiceIcon as IconName } from "@/types/service";
const icons = {
  wrench: Wrench,
  shield: ShieldCheck,
  scan: ScanLine,
  disc: Disc3,
  suspension: MoveVertical,
  oil: Droplets,
  check: ClipboardCheck,
  car: CarFront,
};
export function ServiceIcon({
  name,
  size = 28,
  className = "",
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  const Icon = icons[name];
  return <Icon size={size} strokeWidth={1.4} className={className} aria-hidden="true" />;
}
