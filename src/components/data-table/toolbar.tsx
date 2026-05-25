"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { List, Search, Trash2, Users, X } from "lucide-react";

type ViewMode = "table" | "family";

type ToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: "all" | "online" | "offline";
  onStatusFilterChange: (value: "all" | "online" | "offline") => void;
  totalItems: number;
  selectedCount?: number;
  onDeleteSelected?: () => void;
  viewMode?: ViewMode;
  onViewModeChange?: (mode: ViewMode) => void;
};

export function DataTableToolbar({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  totalItems,
  selectedCount = 0,
  onDeleteSelected,
  viewMode = "table",
  onViewModeChange,
}: ToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-meta" />
          <Input
            placeholder="Search usernames..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-80 h-9 text-[13px] bg-transparent border-border pl-9 pr-8 rounded-md placeholder:text-meta focus-visible:ring-accent/30 focus-visible:border-accent/40 transition-colors duration-150"
          />
          {search && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-meta hover:text-fg transition-colors duration-150"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
        <div className="flex items-center rounded-md overflow-hidden">
          {(["all", "online", "offline"] as const).map((s) => (
            <Button
              key={s}
              variant="ghost"
              size="sm"
              className={`h-8 px-3 text-[10.24px] font-bold uppercase tracking-[0.04em] capitalize rounded-none transition-all duration-150 ${
                statusFilter === s
                  ? "text-accent"
                  : "text-muted hover:text-fg/80"
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
              className="text-[11px] font-medium text-accent border-accent/30 rounded"
            >
              {selectedCount} selected
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-[11px] text-danger hover:text-danger hover:bg-danger/10 rounded gap-1"
              onClick={onDeleteSelected}
            >
              <Trash2 className="h-3 w-3" />
              Delete
            </Button>
          </div>
        )}
        <span className="text-[11px] font-medium text-meta tabular-nums">
          {totalItems.toLocaleString()} accounts
        </span>
        {onViewModeChange && (
          <div className="flex items-center rounded-md overflow-hidden border border-border/30">
            <button
              onClick={() => onViewModeChange("table")}
              className={`h-7 w-7 flex items-center justify-center transition-colors duration-150 ${
                viewMode === "table"
                  ? "bg-fg/10 text-fg"
                  : "text-muted hover:text-fg"
              }`}
              aria-label="Table view"
            >
              <List className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => onViewModeChange("family")}
              className={`h-7 w-7 flex items-center justify-center transition-colors duration-150 ${
                viewMode === "family"
                  ? "bg-fg/10 text-fg"
                  : "text-muted hover:text-fg"
              }`}
              aria-label="Family view"
            >
              <Users className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
