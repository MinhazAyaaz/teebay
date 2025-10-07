import type { ComponentType } from "react";

export type LinkItem = {
  link: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
};