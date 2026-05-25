"use client";

import { useState, useCallback, useMemo } from "react";
import { type SortingState, type RowSelectionState } from "@tanstack/react-table";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { useAccounts } from "@/hooks/use-accounts";
import { StatsCards } from "@/components/stats-cards";
import { DataTable } from "@/components/data-table/data-table";
import { DataFamilyView } from "@/components/data-table/grid-view";
import { DataTableToolbar } from "@/components/data-table/toolbar";
import { DataTablePagination } from "@/components/data-table/pagination";
import { columns } from "@/components/data-table/columns";
import { Button } from "@/components/ui/button";
import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog";
import type { Account } from "@/db/schema";

const CURRENT_GAME = "Attack On Titan Revolution";

export default function DashboardPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "online" | "offline">("all");
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [viewMode, setViewMode] = useState<"table" | "family">("table");

  const sortParam = sorting.length > 0 ? sorting[0].id : undefined;
  const orderParam = sorting.length > 0 ? (sorting[0].desc ? "desc" : "asc") : undefined;

  const { data: response, isLoading, dataUpdatedAt, refetch, isFetching } = useAccounts({
    page,
    pageSize,
    sort: sortParam,
    order: orderParam as "asc" | "desc" | undefined,
    search: search || undefined,
    status: statusFilter === "all" ? null : statusFilter,
  });

  const { data: allResponse } = useAccounts({
    page: 1,
    pageSize: 10000,
    search: search || undefined,
    status: statusFilter === "all" ? null : statusFilter,
    enabled: viewMode === "family",
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

  const selectedCount = Object.keys(rowSelection).length;
  const selectedIds = useMemo(() => {
    if (!response?.data) return [];
    return Object.keys(rowSelection)
      .map((idx) => (response.data[Number(idx)] as Account)?.id)
      .filter(Boolean);
  }, [rowSelection, response?.data]);

  const handleDeleteSelected = useCallback(() => {
    if (selectedIds.length === 0) return;
    setDeleteDialogOpen(true);
  }, [selectedIds]);

  const handleConfirmDelete = useCallback(async () => {
    if (selectedIds.length === 0) return;
    setIsDeleting(true);
    try {
      await fetch("/api/accounts", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedIds }),
      });
      setRowSelection({});
      refetch();
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
    }
  }, [selectedIds, refetch]);

  const lastUpdated = dataUpdatedAt
    ? new Date(dataUpdatedAt).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
    : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
      className="flex flex-col gap-5 p-6 lg:p-8"
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-2xl font-bold tracking-[-0.02em] text-fg">
            {CURRENT_GAME}
          </h1>
          <div className="flex items-center gap-2 text-[10.24px] font-medium text-muted">
            <span className="inline-flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
              </span>
              Live
            </span>
            {lastUpdated && (
              <>
                <span className="text-meta">·</span>
                <span className="text-meta">{lastUpdated}</span>
              </>
            )}
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => refetch()}
          disabled={isFetching}
          className="h-8 text-xs text-muted hover:text-fg hover:bg-white/[0.04] gap-1.5 rounded-md transition-colors duration-150"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isFetching ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <StatsCards stats={response?.stats} isLoading={isLoading} />

      <div className="flex flex-col gap-3">
        <DataTableToolbar
          search={search}
          onSearchChange={handleSearchChange}
          statusFilter={statusFilter}
          onStatusFilterChange={handleStatusChange}
          totalItems={response?.pagination.total ?? 0}
          selectedCount={selectedCount}
          onDeleteSelected={handleDeleteSelected}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
      </div>

      {viewMode === "table" ? (
        <DataTable
          columns={columns}
          data={response?.data ?? []}
          sorting={sorting}
          onSortingChange={handleSortingChange}
          rowSelection={rowSelection}
          onRowSelectionChange={setRowSelection}
        />
      ) : (
        <DataFamilyView
          data={allResponse?.data ?? []}
        />
      )}

      {viewMode === "table" && (
        <DataTablePagination
          page={page}
          pageSize={pageSize}
          totalPages={response?.pagination.totalPages ?? 1}
          total={response?.pagination.total ?? 0}
          onPageChange={setPage}
          onPageSizeChange={handlePageSizeChange}
        />
      )}

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        count={selectedIds.length}
        onConfirm={handleConfirmDelete}
        isPending={isDeleting}
      />
    </motion.div>
  );
}
