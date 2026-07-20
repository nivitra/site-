import type { LucideIcon } from "lucide-react";
import {
  Search,
  Layers,
  CalendarCheck,
  Flag,
  Star,
  Bell,
} from "lucide-react";

export type CrosshairAction = {
  id: string;
  label: string;
  icon: LucideIcon;
};

export const CROSSHAIR_ACTIONS: CrosshairAction[] = [
  { id: "fetch", label: "Fetch", icon: Search },
  { id: "listen", label: "Listen", icon: Layers },
  { id: "validate", label: "Validate", icon: CalendarCheck },
  { id: "flag", label: "Flag", icon: Flag },
  { id: "enrich", label: "Enrich", icon: Star },
  { id: "notify", label: "Notify", icon: Bell },
];
