export interface ContactValues {
  name: string;
  phone: string;
  description: string;
}
export type ContactErrors = Partial<Record<keyof ContactValues, string>>;
