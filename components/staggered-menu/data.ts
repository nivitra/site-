import type { LucideIcon } from "lucide-react";
import {
  User,
  Palette,
  Users,
  Gift,
  AppWindow,
  HelpCircle,
  Handshake,
} from "lucide-react";

export type MenuItemStatus = "completed" | "expandable" | "optional";

export type MenuItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  status: MenuItemStatus;
};

export const MENU_ITEMS: MenuItem[] = [
  { id: "profile", label: "Profile details", icon: User, status: "completed" },
  { id: "creator", label: "Creator details", icon: Palette, status: "completed" },
  { id: "personas", label: "Personas", icon: Users, status: "expandable" },
  { id: "benefits", label: "Benefits", icon: Gift, status: "expandable" },
  { id: "apps", label: "Apps", icon: AppWindow, status: "expandable" },
  { id: "faqs", label: "FAQs", icon: HelpCircle, status: "optional" },
  { id: "affiliates", label: "Affiliates", icon: Handshake, status: "optional" },
];
