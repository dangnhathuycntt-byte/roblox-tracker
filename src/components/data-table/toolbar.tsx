"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

type ToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: "all" | "online" | "offline";
  onStatusFilterChange: (value: "all" | "online" | "offline") => void;
  totalItems: number;
};

export function DataTableToolbar({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  totalItems,
}: ToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-meta" />
          <Input
            placeholder="Search usernames..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-72 h-9 text-sm bg-surface border-border pl-9 rounded-md placeholder:text-muted focus-visible:ring-accent/30 focus-visible:border-accent/30"
          />
        </div>
        <div className="flex items-center gap-1 p-1 rounded-md bg-surface border border-border">
          {(["all", "online", "offline"] as const).map((s) => (
            <Button
              key={s}
              variant="ghost"
              size="sm"
              className={`h-7 text-xs capitalize rounded-[4px] transition-all duration-150 ${
                statusFilter === s
                  ? "bg-white/[0.06] text-fg"
                  : "text-muted hover:text-fg hover:bg-white/[0.03]"
              }`}
              onClick={() => onStatusFilterChange(s)}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full mr-1.5 ${
                  s === "offline" ? "bg-danger" : "bg-success"
                }`}
              />
              {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <Badge
        variant="outline"
        className="text-xs font-medium text-muted border-border rounded-[4px]"
      >
        {totalItems.toLocaleString()} items
      </Badge>
    </div>
  );
}
