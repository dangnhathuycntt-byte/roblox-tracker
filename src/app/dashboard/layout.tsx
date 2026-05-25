"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Sidebar } from "@/components/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center h-11 px-4 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="h-7 w-7 flex items-center justify-center rounded-md text-muted hover:text-fg hover:bg-white/[0.04] transition-colors duration-150"
            aria-label="Open navigation"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
      <ThemeToggle />
    </div>
  );
}
