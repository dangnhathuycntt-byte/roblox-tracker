"use client";

import { useQuery } from "@tanstack/react-query";
import type { Account } from "@/db/schema";

export type AccountsResponse = {
  data: Account[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  stats: {
    totalAccounts: number;
    onlineCount: number;
    totalGold: number;
    totalGems: number;
    totalPrestige: number;
    totalXp: number;
    totalSpins: number;
    totalPerks: number;
    totalInventory: number;
  };
};

type UseAccountsParams = {
  page?: number;
  pageSize?: number;
  sort?: string;
  order?: "asc" | "desc";
  search?: string;
  status?: "online" | "offline" | null;
  family?: string | null;
  enabled?: boolean;
};

async function fetchAccounts(params: UseAccountsParams): Promise<AccountsResponse> {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.set("page", String(params.page));
  if (params.pageSize) searchParams.set("pageSize", String(params.pageSize));
  if (params.sort) searchParams.set("sort", params.sort);
  if (params.order) searchParams.set("order", params.order);
  if (params.search) searchParams.set("search", params.search);
  if (params.status) searchParams.set("status", params.status);
  if (params.family) searchParams.set("family", params.family);

  const res = await fetch(`/api/accounts?${searchParams.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch accounts");
  return res.json();
}

export function useAccounts(params: UseAccountsParams = {}) {
  const { enabled = true, ...fetchParams } = params;
  return useQuery({
    queryKey: ["accounts", fetchParams],
    queryFn: () => fetchAccounts(fetchParams),
    refetchInterval: 30_000,
    enabled,
  });
}
