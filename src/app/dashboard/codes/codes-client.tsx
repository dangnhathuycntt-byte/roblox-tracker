"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useCodes, useAddCode, useUpdateCode, useDeleteCode } from "@/hooks/use-codes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";

export function CodesClient() {
  const { data: codesRes, isLoading } = useCodes();
  const addCode = useAddCode();
  const updateCode = useUpdateCode();
  const deleteCode = useDeleteCode();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [editingCode, setEditingCode] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    isActive: true,
  });

  const [error, setError] = useState("");

  const handleOpenAdd = () => {
    setEditingCode(null);
    setFormData({ code: "", description: "", isActive: true });
    setError("");
    setDialogOpen(true);
  };

  const handleOpenEdit = (code: any) => {
    setEditingCode(code);
    setFormData({
      code: code.code,
      description: code.description || "",
      isActive: code.isActive,
    });
    setError("");
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!formData.code.trim()) {
      setError("Code is required");
      return;
    }

    try {
      if (editingCode) {
        await updateCode.mutateAsync({ id: editingCode.id, ...formData });
      } else {
        await addCode.mutateAsync(formData);
      }
      setDialogOpen(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteClick = (id: number) => {
    setDeletingId(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (deletingId) {
      await deleteCode.mutateAsync(deletingId);
      setDeleteDialogOpen(false);
      setDeletingId(null);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-bg text-fg">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border/40 shrink-0">
        <h1 className="text-xl font-bold font-heading">Redeem Codes</h1>
        <Button onClick={handleOpenAdd} size="sm" className="gap-1.5">
          <Plus className="w-4 h-4" />
          Add Code
        </Button>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="rounded-md border border-border/40 bg-bg-surface overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted">
                    Loading codes...
                  </TableCell>
                </TableRow>
              ) : codesRes?.data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted">
                    No codes found. Add one to get started.
                  </TableCell>
                </TableRow>
              ) : (
                codesRes?.data.map((code) => (
                  <TableRow key={code.id}>
                    <TableCell className="font-medium text-fg">{code.code}</TableCell>
                    <TableCell className="text-muted">{code.description}</TableCell>
                    <TableCell>
                      {code.isActive ? (
                        <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-500 ring-1 ring-inset ring-green-500/20">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-red-500/10 px-2 py-0.5 text-xs font-medium text-red-500 ring-1 ring-inset ring-red-500/20">
                          Inactive
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => handleOpenEdit(code)}
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => handleDeleteClick(code.id)}
                          title="Delete"
                          className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCode ? "Edit Code" : "Add Code"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-4">
            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-500/10 rounded-md border border-red-500/20">
                {error}
              </div>
            )}
            <div className="flex flex-col gap-2">
              <label htmlFor="code" className="text-sm font-medium">Code</label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="e.g. VISITS900M"
                autoFocus
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Optional description"
              />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Checkbox
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked as boolean })}
              />
              <label htmlFor="isActive" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Active
              </label>
            </div>
            <DialogFooter className="mt-4">
              <Button type="submit" disabled={addCode.isPending || updateCode.isPending}>
                {editingCode ? "Save Changes" : "Add Code"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent showCloseButton={false} className="sm:max-w-sm gap-5">
          <DialogHeader>
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-md bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </div>
              <div className="flex flex-col gap-1">
                <DialogTitle className="text-[14px]">
                  Delete code?
                </DialogTitle>
                <DialogDescription className="text-[12.5px] leading-relaxed">
                  This action cannot be undone. The code will be permanently removed.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <div className="flex justify-end gap-2 pt-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={deleteCode.isPending}
              className="h-8 text-[13px] px-3"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={confirmDelete}
              disabled={deleteCode.isPending}
              className="h-8 text-[13px] px-3 bg-red-500 hover:bg-red-500/90 text-white border-0"
            >
              {deleteCode.isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
