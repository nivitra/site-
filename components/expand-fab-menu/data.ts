import type { LucideIcon } from "lucide-react";
import { ArrowRight, Plus, List, CreditCard } from "lucide-react";

export type FabAction = {
  id: string;
  label: string;
  Icon: LucideIcon;
};

export const FAB_ACTIONS: FabAction[] = [
  { id: "send", label: "Send\nMoney", Icon: ArrowRight },
  { id: "add", label: "Add\nMoney", Icon: Plus },
  { id: "invoices", label: "Invoices", Icon: List },
  { id: "card", label: "My Card", Icon: CreditCard },
];
