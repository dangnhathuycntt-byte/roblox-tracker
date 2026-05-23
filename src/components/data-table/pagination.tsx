"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

type PaginationProps = {
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};

export function DataTablePagination({
  page,
  pageSize,
  totalPages,
  total,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-between rounded-md bg-surface/50 border border-border px-4 py-3">
      <div className="text-xs text-muted font-medium">
        {total > 0
          ? `Showing ${(page - 1) * pageSize + 1}-${Math.min(page * pageSize, total)} of ${total.toLocaleString()}`
          : "No results"}
      </div>

      <div className="flex items-center gap-4">
        <Select
          value={String(pageSize)}
          onValueChange={(v) => onPageSizeChange(Number(v))}
        >
          <SelectTrigger className="h-7 w-16 text-xs rounded-[4px] bg-surface border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[25, 50, 100].map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <span className="text-xs text-muted font-medium tabular-nums">
          {page} of {totalPages || 1} pages
        </span>

        <div className="flex items-center gap-1">
          {[
            { icon: ChevronsLeft, onClick: () => onPageChange(1), disabled: page <= 1 },
            { icon: ChevronLeft, onClick: () => onPageChange(page - 1), disabled: page <= 1 },
            { icon: ChevronRight, onClick: () => onPageChange(page + 1), disabled: page >= totalPages },
            { icon: ChevronsRight, onClick: () => onPageChange(totalPages), disabled: page >= totalPages },
          ].map(({ icon: Icon, onClick, disabled }, i) => (
            <Button
              key={i}
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-[4px] text-muted hover:text-fg hover:bg-white/[0.06] disabled:opacity-20 transition-all duration-150"
              onClick={onClick}
              disabled={disabled}
            >
              <Icon className="h-3.5 w-3.5" />
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
