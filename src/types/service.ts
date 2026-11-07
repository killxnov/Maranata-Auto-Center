export type ServiceIcon =
  "wrench" | "shield" | "scan" | "disc" | "suspension" | "oil" | "check" | "car";
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: ServiceIcon;
}
export interface Part {
  id: string;
  title: string;
  description: string;
  icon: ServiceIcon;
}
