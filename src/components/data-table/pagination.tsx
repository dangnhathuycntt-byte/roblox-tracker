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
} from "lucide-react";

type PaginationProps = {
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "...")[] = [1];

  if (current > 3) pages.push("...");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push("...");

  pages.push(total);
  return pages;
}

export function DataTablePagination({
  page,
  pageSize,
  totalPages,
  total,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  const pageNumbers = getPageNumbers(page, totalPages || 1);

  return (
    <div className="flex items-center justify-between px-1 py-2.5">
      <div className="text-[11px] text-muted font-medium tabular-nums">
        {total > 0
          ? `Showing ${(page - 1) * pageSize + 1}-${Math.min(page * pageSize, total)} of ${total.toLocaleString()}`
          : "No results"}
      </div>

      <div className="flex items-center gap-3">
        <Select
          value={String(pageSize)}
          onValueChange={(v) => onPageSizeChange(Number(v))}
        >
          <SelectTrigger className="h-7 w-16 text-[11px] rounded-[4px] bg-transparent border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[25, 50, 100].map((size) => (
              <SelectItem key={size} value={String(size)} className="text-[11px]">
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-0.5">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 rounded-[4px] text-muted hover:text-fg hover:bg-white/[0.06] disabled:opacity-20 transition-all duration-150"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </Button>

          {pageNumbers.map((p, i) =>
            p === "..." ? (
              <span key={`ellipsis-${i}`} className="w-7 text-center text-[11px] text-meta">
                ...
              </span>
            ) : (
              <Button
                key={p}
                variant="ghost"
                size="icon"
                className={`h-7 w-7 rounded-[4px] text-[11px] font-medium tabular-nums transition-all duration-150 ${
                  p === page
                    ? "bg-accent/15 text-accent"
                    : "text-muted hover:text-fg hover:bg-white/[0.06]"
                }`}
                onClick={() => onPageChange(p as number)}
              >
                {p}
              </Button>
            )
          )}

          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 rounded-[4px] text-muted hover:text-fg hover:bg-white/[0.06] disabled:opacity-20 transition-all duration-150"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
