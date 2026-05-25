"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Inbox } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Account } from "@/db/schema";

const FAMILY_TIERS = [
  { tier: "Secret", color: "bg-red-600", text: "text-white" },
  { tier: "Mythical", color: "bg-yellow-500", text: "text-black" },
  { tier: "Legendary", color: "bg-green-500", text: "text-black" },
  { tier: "Epic", color: "bg-purple-500", text: "text-white" },
  { tier: "Rare", color: "bg-sky-500", text: "text-white" },
  { tier: "Common", color: "bg-gray-400", text: "text-black" },
] as const;

const FAMILIES: { name: string; tier: string; image: string }[] = [
  { name: "Shiki", tier: "Secret", image: "11-shiki.png" },
  { name: "Fritz", tier: "Mythical", image: "12-fritz.png" },
  { name: "Helos", tier: "Mythical", image: "13-helos.png" },
  { name: "Yeager", tier: "Legendary", image: "21-yeager.png" },
  { name: "Ackerman", tier: "Legendary", image: "22-ackerman.png" },
  { name: "Reiss", tier: "Legendary", image: "23-reiss.png" },
  { name: "Zoe", tier: "Epic", image: "31-zoe.png" },
  { name: "Tybur", tier: "Epic", image: "32-tybur.png" },
  { name: "Leonhart", tier: "Epic", image: "33-leonhart.png" },
  { name: "Galliard", tier: "Epic", image: "34-galliard.png" },
  { name: "Finger", tier: "Epic", image: "35-finger.png" },
  { name: "Braun", tier: "Epic", image: "36-braun.png" },
  { name: "Arlert", tier: "Epic", image: "37-arlert.png" },
  { name: "Ksaver", tier: "Epic", image: "38-ksaver.png" },
  { name: "Smith", tier: "Rare", image: "42-smith.png" },
  { name: "Springer", tier: "Rare", image: "43-springer.png" },
  { name: "Kirstein", tier: "Rare", image: "44-kirstein.png" },
  { name: "Grice", tier: "Rare", image: "45-grice.png" },
  { name: "Azumabito", tier: "Rare", image: "47-azumabito.png" },
  { name: "Braus", tier: "Rare", image: "41-braus.png" },
  { name: "Kruger", tier: "Rare", image: "48-kruger.png" },
  { name: "Reeves", tier: "Common", image: "" },
  { name: "Blouse", tier: "Common", image: "" },
  { name: "Inocencio", tier: "Common", image: "" },
  { name: "Munsell", tier: "Common", image: "" },
  { name: "Boyega", tier: "Common", image: "" },
  { name: "Ral", tier: "Common", image: "" },
  { name: "Bozado", tier: "Common", image: "" },
  { name: "Pikale", tier: "Common", image: "" },
  { name: "Hume", tier: "Common", image: "" },
  { name: "Iglehaut", tier: "Common", image: "" },
];

const IMAGE_BASE = "/families/";

type FamilyViewProps = {
  data: Account[];
};

export function DataFamilyView({ data }: FamilyViewProps) {
  const [selectedFamily, setSelectedFamily] = useState<string | null>(null);

  const familyCounts = useMemo(() => {
    const map = new Map<string, number>();
    for (const account of data) {
      const key = account.family || "";
      map.set(key, (map.get(key) ?? 0) + 1);
    }
    return map;
  }, [data]);

  const selectedAccounts = useMemo(() => {
    if (!selectedFamily) return [];
    return data.filter((a) => a.family === selectedFamily);
  }, [data, selectedFamily]);

  const selectedFamilyInfo = selectedFamily
    ? FAMILIES.find((f) => f.name === selectedFamily)
    : null;
  const selectedTierInfo = selectedFamilyInfo
    ? FAMILY_TIERS.find((t) => t.tier === selectedFamilyInfo.tier)
    : null;

  if (!data.length) {
    return (
      <div className="flex flex-col items-center justify-center h-40 gap-2 text-muted">
        <Inbox className="h-8 w-8 text-meta" />
        <p className="text-sm font-medium">No accounts found</p>
        <p className="text-xs text-meta">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <AnimatePresence mode="popLayout">
        {FAMILY_TIERS.map(({ tier, color, text }) => {
          const tierFamilies = FAMILIES.filter((f) => f.tier === tier);

          return (
            <motion.div
              key={tier}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, ease: [0.2, 0, 0, 1] }}
              className="flex flex-col gap-2"
            >
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${color} ${text}`}>
                  {tier}
                </span>
                <span className="text-[11px] text-meta font-medium tabular-nums">
                  {tierFamilies.reduce((sum, f) => sum + (familyCounts.get(f.name) ?? 0), 0)} accounts
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
                {tierFamilies.map((family) => {
                  const count = familyCounts.get(family.name) ?? 0;
                  return (
                    <motion.button
                      key={family.name}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedFamily(family.name)}
                      className={`relative flex items-center gap-2.5 rounded-lg border border-border/20 p-2.5 text-left transition-colors duration-150 hover:bg-accent/[0.06] hover:border-accent/30 ${
                        count === 0 ? "opacity-30" : ""
                      }`}
                    >
                      {family.image ? (
                        <img
                          src={`${IMAGE_BASE}${family.image}`}
                          alt={family.name}
                          className="h-9 w-9 rounded object-cover shrink-0"
                        />
                      ) : (
                        <div className="h-9 w-9 rounded bg-surface-warm flex items-center justify-center shrink-0">
                          <span className="text-[11px] font-bold text-meta">
                            {family.name[0]}
                          </span>
                        </div>
                      )}
                      <div className="flex flex-col min-w-0">
                        <span className="text-[12px] font-medium text-fg truncate">
                          {family.name}
                        </span>
                        <span className="text-[11px] font-mono tabular-nums text-accent font-bold">
                          {count > 0 ? `×${count}` : "—"}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      <Dialog
        open={selectedFamily !== null}
        onOpenChange={(open) => { if (!open) setSelectedFamily(null); }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3">
              {selectedFamilyInfo?.image && (
                <img
                  src={`${IMAGE_BASE}${selectedFamilyInfo.image}`}
                  alt={selectedFamily ?? ""}
                  className="h-10 w-10 rounded object-cover"
                />
              )}
              <div className="flex flex-col gap-1">
                <DialogTitle>{selectedFamily}</DialogTitle>
                {selectedTierInfo && (
                  <span className={`w-fit px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${selectedTierInfo.color} ${selectedTierInfo.text}`}>
                    {selectedTierInfo.tier}
                  </span>
                )}
              </div>
            </div>
          </DialogHeader>
          <ScrollArea className="max-h-64">
            <div className="flex flex-col gap-1">
              {selectedAccounts.map((account) => (
                <div
                  key={account.id}
                  className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-accent/[0.06]"
                >
                  <span className="font-medium text-fg">{account.username}</span>
                  <span className={`h-1.5 w-1.5 rounded-full ${account.isOnline ? "bg-success" : "bg-meta"}`} />
                </div>
              ))}
              {selectedAccounts.length === 0 && (
                <p className="text-sm text-meta px-3 py-2">No accounts</p>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
