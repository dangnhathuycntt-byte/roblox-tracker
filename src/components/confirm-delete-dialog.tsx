"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";

type ConfirmDeleteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  count: number;
  onConfirm: () => void;
  isPending?: boolean;
};

export function ConfirmDeleteDialog({
  open,
  onOpenChange,
  count,
  onConfirm,
  isPending,
}: ConfirmDeleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-sm gap-5">
        <DialogHeader>
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-md bg-danger/10 flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle className="h-4 w-4 text-danger" />
            </div>
            <div className="flex flex-col gap-1">
              <DialogTitle className="text-[14px]">
                Delete {count} account{count !== 1 ? "s" : ""}?
              </DialogTitle>
              <DialogDescription className="text-[12.5px] leading-relaxed">
                This action cannot be undone. The selected accounts will be permanently removed.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="flex justify-end gap-2 pt-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
            className="h-8 text-[13px] px-3"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={onConfirm}
            disabled={isPending}
            className="h-8 text-[13px] px-3 bg-danger hover:bg-danger/90 text-white border-0"
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
