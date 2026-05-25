"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUp, ArrowDown, ArrowUpDown, MoreHorizontal, Copy, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatNumber, timeAgo } from "@/lib/format";
import type { Account } from "@/db/schema";

function SortHeader({
  column,
  label,
  align = "left",
}: {
  column: { toggleSorting: (desc: boolean) => void; getIsSorted: () => false | "asc" | "desc" };
  label: string;
  align?: "left" | "right";
}) {
  const sorted = column.getIsSorted();
  const SortIcon = sorted === "asc" ? ArrowUp : sorted === "desc" ? ArrowDown : ArrowUpDown;

  return (
    <div className={align === "right" ? "flex justify-end" : ""}>
      <Button
        variant="ghost"
        size="sm"
        className={`h-8 text-[10.24px] uppercase tracking-[0.08em] font-extrabold hover:text-fg hover:bg-accent/[0.06] transition-colors duration-150 ${
          align === "right" ? "" : "-ml-3"
        } ${sorted ? "text-fg-2" : "text-meta"}`}
        onClick={() => column.toggleSorting(sorted === "asc")}
      >
        {label}
        <SortIcon className={`ml-1 h-3 w-3 ${sorted ? "opacity-80" : "opacity-30"}`} />
      </Button>
    </div>
  );
}

function NumCell({ children, bold }: { children: React.ReactNode; bold?: boolean }) {
  return (
    <span className={`font-mono text-[12.8px] tabular-nums text-right block ${bold ? "font-bold text-fg" : "text-fg-2"}`}>
      {children}
    </span>
  );
}

export const columns: ColumnDef<Account>[] = [
  {
    accessorKey: "username",
    header: ({ column }) => <SortHeader column={column} label="Account" />,
    cell: ({ row }) => {
      const account = row.original;
      return (
        <div className="flex flex-col gap-1">
          <span className="font-medium text-[14px] text-fg leading-tight">
            {account.username}
          </span>
          <div className="flex items-center gap-1.5">
            {account.isOnline ? (
              <span className="inline-flex items-center gap-1 h-[18px] px-1.5 rounded-full text-[10px] font-medium bg-success/10 text-success">
                <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                Online
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 h-[18px] px-1.5 rounded-full text-[10px] font-medium bg-danger/10 text-danger">
                <span className="h-1.5 w-1.5 rounded-full bg-danger" />
                Offline
              </span>
            )}
            <Badge variant="secondary" className="h-[18px] px-1.5 text-[10px] font-bold uppercase bg-surface-warm text-muted border border-border-soft rounded">
              {account.platform}
            </Badge>
            <span className="text-[11px] text-meta">{timeAgo(account.lastSeen)}</span>
          </div>
        </div>
      );
    },
    size: 280,
  },
  {
    accessorKey: "currentSlot",
    header: ({ column }) => <SortHeader column={column} label="Slot" />,
    cell: ({ row }) => (
      <Badge
        variant="secondary"
        className="font-mono text-[12px] font-bold bg-surface-warm text-fg-2 border border-border-soft rounded h-6 px-2.5"
      >
        {row.getValue("currentSlot")}
      </Badge>
    ),
    size: 80,
  },
  {
    accessorKey: "level",
    header: ({ column }) => <SortHeader column={column} label="Level" align="right" />,
    cell: ({ row }) => <NumCell bold>{row.getValue<number>("level")}</NumCell>,
    size: 70,
  },
  {
    accessorKey: "gold",
    header: ({ column }) => <SortHeader column={column} label="Gold" align="right" />,
    cell: ({ row }) => <NumCell bold>{formatNumber(row.getValue<number>("gold"))}</NumCell>,
    size: 90,
  },
  {
    accessorKey: "gems",
    header: ({ column }) => <SortHeader column={column} label="Gems" align="right" />,
    cell: ({ row }) => <NumCell>{formatNumber(row.getValue<number>("gems"))}</NumCell>,
    size: 90,
  },
  {
    accessorKey: "prestige",
    header: ({ column }) => <SortHeader column={column} label="Prestige" align="right" />,
    cell: ({ row }) => <NumCell>{row.getValue<number>("prestige")}</NumCell>,
    size: 80,
  },
  {
    accessorKey: "xp",
    header: ({ column }) => <SortHeader column={column} label="XP" align="right" />,
    cell: ({ row }) => <NumCell>{formatNumber(row.getValue<number>("xp"))}</NumCell>,
    size: 80,
  },
  {
    accessorKey: "spins",
    header: ({ column }) => <SortHeader column={column} label="Spins" align="right" />,
    cell: ({ row }) => <NumCell>{row.getValue<number>("spins")}</NumCell>,
    size: 70,
  },
  {
    accessorKey: "inventoryCount",
    header: ({ column }) => <SortHeader column={column} label="Inv." align="right" />,
    cell: ({ row }) => (
      <span className="font-mono text-[12.8px] tabular-nums text-right block text-muted">
        {formatNumber(row.getValue<number>("inventoryCount"))}
      </span>
    ),
    size: 80,
  },
  {
    accessorKey: "perksCount",
    header: ({ column }) => <SortHeader column={column} label="Perks" align="right" />,
    cell: ({ row }) => (
      <span className="font-mono text-[12.8px] tabular-nums text-right block text-muted">
        {formatNumber(row.getValue<number>("perksCount"))}
      </span>
    ),
    size: 70,
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => {
      const account = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            className="h-7 w-7 rounded flex items-center justify-center text-meta hover:text-fg hover:bg-black/[0.06] dark:hover:bg-white/[0.06] transition-colors"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Actions</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(account.username)}
            >
              <Copy className="h-3.5 w-3.5 mr-2" />
              Copy username
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(String(account.id))}
            >
              <Eye className="h-3.5 w-3.5 mr-2" />
              Copy ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    size: 50,
    enableSorting: false,
  },
];
