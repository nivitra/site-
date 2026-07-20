import type { LucideIcon } from "lucide-react";
import {
  MessageCircle,
  ListFilter,
  CalendarDays,
  Flag,
  Sparkles,
  Bell,
} from "lucide-react";

export type JobAction = {
  id: string;
  label: string;
  icon: LucideIcon;
};

export const JOB_ACTIONS: JobAction[] = [
  { id: "fetch", label: "Fetch", icon: MessageCircle },
  { id: "listen", label: "Listen", icon: ListFilter },
  { id: "validate", label: "Validate", icon: CalendarDays },
  { id: "flag", label: "Flag", icon: Flag },
  { id: "enrich", label: "Enrich", icon: Sparkles },
  { id: "notify", label: "Notify", icon: Bell },
];
