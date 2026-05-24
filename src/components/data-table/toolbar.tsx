"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Trash2, X } from "lucide-react";

type ToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: "all" | "online" | "offline";
  onStatusFilterChange: (value: "all" | "online" | "offline") => void;
  totalItems: number;
  selectedCount?: number;
  onDeleteSelected?: () => void;
};

export function DataTableToolbar({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  totalItems,
  selectedCount = 0,
  onDeleteSelected,
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
            className="w-72 h-9 text-sm bg-surface border-border pl-9 pr-8 rounded-md placeholder:text-muted focus-visible:ring-accent/30 focus-visible:border-accent/30"
          />
          {search && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-meta hover:text-fg transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
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
              {s !== "all" && (
                <span
                  className={`h-1.5 w-1.5 rounded-full mr-1.5 ${
                    s === "offline" ? "bg-danger" : "bg-success"
                  }`}
                />
              )}
              {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {selectedCount > 0 && (
          <div className="flex items-center gap-2 mr-2 animate-in fade-in slide-in-from-right-2 duration-200">
            <Badge
              variant="outline"
              className="text-xs font-medium text-accent border-accent/30 rounded-[4px]"
            >
              {selectedCount} selected
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs text-danger hover:text-danger hover:bg-danger/10 rounded-[4px] gap-1"
              onClick={onDeleteSelected}
            >
              <Trash2 className="h-3 w-3" />
              Delete
            </Button>
          </div>
        )}
        <Badge
          variant="outline"
          className="text-xs font-medium text-muted border-border rounded-[4px]"
        >
          {totalItems.toLocaleString()} items
        </Badge>
      </div>
    </div>
  );
}
