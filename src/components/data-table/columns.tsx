"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { formatNumber, timeAgo } from "@/lib/format";
import type { Account } from "@/db/schema";

function SortHeader({
  column,
  label,
}: {
  column: { toggleSorting: (desc: boolean) => void; getIsSorted: () => false | "asc" | "desc" };
  label: string;
}) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="-ml-3 h-8 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground/60 hover:text-foreground hover:bg-white/[0.04]"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {label}
      <ArrowUpDown className="ml-1 h-3 w-3 opacity-40" />
    </Button>
  );
}

export const columns: ColumnDef<Account>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        data-indeterminate={table.getIsSomePageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="border-white/20"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="border-white/20"
      />
    ),
    enableSorting: false,
    size: 40,
  },
  {
    accessorKey: "username",
    header: ({ column }) => <SortHeader column={column} label="Account" />,
    cell: ({ row }) => {
      const account = row.original;
      return (
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full shrink-0 ${
                account.isOnline
                  ? "bg-emerald-400 shadow-[0_0_6px] shadow-emerald-400/50"
                  : "bg-red-400/70"
              }`}
            />
            <span className="font-medium text-foreground/90">
              {account.username}
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground/50 pl-4">
            <span>{account.platform}</span>
            <span className="text-muted-foreground/30">|</span>
            <span>{timeAgo(account.lastSeen)}</span>
          </div>
        </div>
      );
    },
    size: 240,
  },
  {
    accessorKey: "currentSlot",
    header: ({ column }) => <SortHeader column={column} label="Current Slot" />,
    cell: ({ row }) => (
      <Badge
        variant="secondary"
        className="font-mono text-xs bg-white/[0.06] border-white/[0.08] text-foreground/80 rounded-lg"
      >
        {row.getValue("currentSlot")}
      </Badge>
    ),
    size: 110,
  },
  {
    accessorKey: "level",
    header: ({ column }) => <SortHeader column={column} label="Level" />,
    cell: ({ row }) => (
      <span className="font-semibold text-primary tabular-nums">
        {row.getValue<number>("level")}
      </span>
    ),
    size: 80,
  },
  {
    accessorKey: "gold",
    header: ({ column }) => <SortHeader column={column} label="Gold" />,
    cell: ({ row }) => (
      <span className="text-amber-400 font-semibold tabular-nums">
        {formatNumber(row.getValue<number>("gold"))}
      </span>
    ),
    size: 100,
  },
  {
    accessorKey: "gems",
    header: ({ column }) => <SortHeader column={column} label="Gems" />,
    cell: ({ row }) => (
      <span className="text-cyan-400 font-semibold tabular-nums">
        {formatNumber(row.getValue<number>("gems"))}
      </span>
    ),
    size: 100,
  },
  {
    accessorKey: "prestige",
    header: ({ column }) => <SortHeader column={column} label="Prestige" />,
    cell: ({ row }) => (
      <span className="text-violet-400 font-medium tabular-nums">
        {row.getValue<number>("prestige")}
      </span>
    ),
    size: 90,
  },
  {
    accessorKey: "xp",
    header: ({ column }) => <SortHeader column={column} label="Xp" />,
    cell: ({ row }) => (
      <span className="font-medium text-foreground/70 tabular-nums">
        {formatNumber(row.getValue<number>("xp"))}
      </span>
    ),
    size: 100,
  },
  {
    accessorKey: "spins",
    header: ({ column }) => <SortHeader column={column} label="Spins" />,
    cell: ({ row }) => (
      <span className="text-orange-400 font-medium tabular-nums">
        {row.getValue<number>("spins")}
      </span>
    ),
    size: 80,
  },
  {
    accessorKey: "inventoryCount",
    header: ({ column }) => <SortHeader column={column} label="Inventory" />,
    cell: ({ row }) => (
      <span className="text-sky-400 font-medium tabular-nums">
        {formatNumber(row.getValue<number>("inventoryCount"))}
      </span>
    ),
    size: 100,
  },
  {
    accessorKey: "perksCount",
    header: ({ column }) => <SortHeader column={column} label="Perks" />,
    cell: ({ row }) => (
      <span className="text-teal-400 font-medium tabular-nums">
        {formatNumber(row.getValue<number>("perksCount"))}
      </span>
    ),
    size: 80,
  },
];
