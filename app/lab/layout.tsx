import type { ReactNode } from "react";

export default function LabLayout({ children }: { children: ReactNode }) {
  return (
    <div className="theme-dark min-h-screen bg-background text-foreground">
      {children}
    </div>
  );
}
