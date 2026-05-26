import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { RedeemCode, NewRedeemCode } from "@/db/schema";

export function useCodes() {
  return useQuery<{ data: RedeemCode[] }>({
    queryKey: ["codes"],
    queryFn: async () => {
      const res = await fetch("/api/codes");
      if (!res.ok) throw new Error("Failed to fetch codes");
      return res.json();
    },
  });
}

export function useAddCode() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (code: Partial<NewRedeemCode>) => {
      const res = await fetch("/api/codes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(code),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to add code");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["codes"] });
    },
  });
}

export function useUpdateCode() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: Partial<NewRedeemCode> & { id: number }) => {
      const res = await fetch(`/api/codes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to update code");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["codes"] });
    },
  });
}

export function useDeleteCode() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/codes/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete code");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["codes"] });
    },
  });
}
