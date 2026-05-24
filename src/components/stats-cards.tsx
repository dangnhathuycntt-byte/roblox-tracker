"use client";

import { motion } from "framer-motion";
import { formatNumber } from "@/lib/format";
import type { AccountsResponse } from "@/hooks/use-accounts";
import {
  Users,
  Coins,
  Award,
  Gem,
  RotateCw,
  Zap,
  Package,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type StatsCardsProps = {
  stats: AccountsResponse["stats"] | undefined;
  isLoading: boolean;
};

type StatCardData = {
  label: string;
  value: string;
  sub?: string;
  color: string;
  icon: LucideIcon;
  highlight?: boolean;
};

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export function StatsCards({ stats, isLoading }: StatsCardsProps) {
  if (isLoading || !stats) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg bg-surface border border-border p-4 animate-pulse h-[88px]"
          />
        ))}
      </div>
    );
  }

  const pct =
    stats.totalAccounts > 0
      ? ((stats.onlineCount / stats.totalAccounts) * 100).toFixed(1)
      : "0.0";

  const cards: StatCardData[] = [
    {
      label: "ONLINE / TOTAL",
      value: `${stats.onlineCount} / ${stats.totalAccounts}`,
      sub: `${pct}%`,
      color: "text-emerald-400",
      icon: Users,
      highlight: true,
    },
    {
      label: "GOLD",
      value: formatNumber(stats.totalGold),
      color: "text-amber-400",
      icon: Coins,
    },
    {
      label: "PRESTIGE",
      value: formatNumber(stats.totalPrestige),
      color: "text-violet-400",
      icon: Award,
    },
    {
      label: "GEMS",
      value: formatNumber(stats.totalGems),
      color: "text-cyan-400",
      icon: Gem,
    },
    {
      label: "SPINS",
      value: formatNumber(stats.totalSpins),
      color: "text-orange-400",
      icon: RotateCw,
    },
    {
      label: "PERKS",
      value: formatNumber(stats.totalPerks),
      color: "text-teal-400",
      icon: Zap,
    },
    {
      label: "INVENTORY",
      value: formatNumber(stats.totalInventory),
      color: "text-sky-400",
      icon: Package,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.label}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.02, y: -1 }}
            transition={{ duration: 0.35, delay: i * 0.04 }}
            className={`relative rounded-lg p-4 flex flex-col gap-2.5 cursor-default transition-colors duration-200 ${
              card.highlight
                ? "bg-emerald-500/[0.08] border border-emerald-500/20 hover:border-emerald-500/30"
                : "bg-surface border border-border hover:border-border/80"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Icon className={`h-3.5 w-3.5 ${card.color} opacity-60`} />
                <span className="text-[10px] font-semibold text-meta uppercase tracking-[0.1em]">
                  {card.label}
                </span>
              </div>
              {card.sub && (
                <span className={`text-[10px] font-medium ${card.highlight ? "text-emerald-400/70" : "text-muted"}`}>
                  {card.sub}
                </span>
              )}
            </div>
            <span className={`text-xl font-bold tracking-tight ${card.color}`}>
              {card.value}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
