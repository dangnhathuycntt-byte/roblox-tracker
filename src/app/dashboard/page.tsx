"use client";

import { useState, useCallback } from "react";
import { type SortingState, type RowSelectionState } from "@tanstack/react-table";
import { motion } from "framer-motion";
import { useAccounts } from "@/hooks/use-accounts";
import { StatsCards } from "@/components/stats-cards";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/toolbar";
import { DataTablePagination } from "@/components/data-table/pagination";
import { columns } from "@/components/data-table/columns";

export default function DashboardPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "online" | "offline">("all");
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const sortParam = sorting.length > 0 ? sorting[0].id : undefined;
  const orderParam = sorting.length > 0 ? (sorting[0].desc ? "desc" : "asc") : undefined;

  const { data: response, isLoading } = useAccounts({
    page,
    pageSize,
    sort: sortParam,
    order: orderParam as "asc" | "desc" | undefined,
    search: search || undefined,
    status: statusFilter === "all" ? null : statusFilter,
  });

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  const handleStatusChange = useCallback((value: "all" | "online" | "offline") => {
    setStatusFilter(value);
    setPage(1);
  }, []);

  const handlePageSizeChange = useCallback((size: number) => {
    setPageSize(size);
    setPage(1);
  }, []);

  const handleSortingChange = useCallback((newSorting: SortingState) => {
    setSorting(newSorting);
    setPage(1);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-6 p-8"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          Attack On Titan Revolution
        </h1>
      </div>

      <StatsCards stats={response?.stats} isLoading={isLoading} />

      <DataTableToolbar
        search={search}
        onSearchChange={handleSearchChange}
        statusFilter={statusFilter}
        onStatusFilterChange={handleStatusChange}
        totalItems={response?.pagination.total ?? 0}
      />

      <DataTable
        columns={columns}
        data={response?.data ?? []}
        sorting={sorting}
        onSortingChange={handleSortingChange}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
      />

      <DataTablePagination
        page={page}
        pageSize={pageSize}
        totalPages={response?.pagination.totalPages ?? 1}
        total={response?.pagination.total ?? 0}
        onPageChange={setPage}
        onPageSizeChange={handlePageSizeChange}
      />
    </motion.div>
  );
}
