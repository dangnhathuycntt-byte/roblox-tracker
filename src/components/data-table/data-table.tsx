"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type RowSelectionState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion, AnimatePresence } from "framer-motion";
import { Inbox } from "lucide-react";

type DataTableProps<TData> = {
  columns: ColumnDef<TData, unknown>[];
  data: TData[];
  sorting: SortingState;
  onSortingChange: (sorting: SortingState) => void;
  rowSelection: RowSelectionState;
  onRowSelectionChange: (selection: RowSelectionState) => void;
};

export function DataTable<TData>({
  columns,
  data,
  sorting,
  onSortingChange,
  rowSelection,
  onRowSelectionChange,
}: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    state: { sorting, rowSelection },
    onSortingChange: (updater) => {
      const next = typeof updater === "function" ? updater(sorting) : updater;
      onSortingChange(next);
    },
    onRowSelectionChange: (updater) => {
      const next =
        typeof updater === "function" ? updater(rowSelection) : updater;
      onRowSelectionChange(next);
    },
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    manualPagination: true,
    enableRowSelection: true,
  });

  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader className="sticky top-0 z-10">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="border-border hover:bg-transparent"
            >
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  style={{ width: header.getSize() }}
                  className="text-muted text-[10.24px] font-extrabold uppercase tracking-[0.08em] h-10 border-b border-border/30 leading-none"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          <AnimatePresence mode="popLayout">
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row, i) => (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15, ease: [0.2, 0, 0, 1], delay: Math.min(i * 0.01, 0.1) }}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                  onClick={() => row.toggleSelected(!row.getIsSelected())}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      row.toggleSelected(!row.getIsSelected());
                    }
                  }}
                  className="border-b border-border/20 transition-colors duration-150 cursor-pointer data-[state=selected]:bg-accent/[0.08] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/40 hover:bg-accent/[0.04]"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="py-4 px-3 text-[12.8px]"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </motion.tr>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-40 text-center"
                >
                  <div className="flex flex-col items-center gap-2 text-muted">
                    <Inbox className="h-8 w-8 text-meta" />
                    <p className="text-sm font-medium">No accounts found</p>
                    <p className="text-xs text-meta">Try adjusting your search or filters</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </AnimatePresence>
        </TableBody>
      </Table>
    </div>
  );
}
